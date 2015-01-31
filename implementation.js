var wizards = new Array(6);

wizards[0] = elsa = new Spellcaster('Elsa', 9999, 400);
wizards[1] = tahlkora = new Spellcaster('Tahlkora', 9999, 400);
wizards[2] = aeris = new Spellcaster('Aeris', 9999, 400);
wizards[3] = vivi = new FireSpellcaster('Vivi', 9999, 400);
wizards[4] = terra = new FireSpellcaster('Terra', 9999, 400);
wizards[5] = vekk = new FireSpellcaster('Vekk', 9999, 400);

var spellbook = [];
spellbook.push( new DamageSpell('INVALID SPELL', 99999, 0, 'Select a new spell, plox.'));
spellbook.push( new DamageSpell('Scorch', 5, 500, 'Deals a light amount of fire damage.')  );
spellbook.push( new DamageSpell('Fireball', 27, 1500, 'Deals moderate fire damage.')  );
spellbook.push( new DamageSpell('Pyroblast', 52, 3000, 'Deals heavy fire damage.')  );
spellbook.push( new DamageSpell('Creamatorium', 104, 5500, 'Deals heavy fire damage.')  );
spellbook.push( new DamageSpell('Frostbolt', 25, 1400, 'Deals moderate ice damage.')  );
spellbook.push( new DamageSpell('Lightning Blast', 40, 2212, 'Deals moderate-heavy lightning damage.')  );
spellbook.push( new DamageSpell('Decree of Annihilation', 99, 6000, 'Deals massive non-elemental damage.')  );
spellbook.push( new DamageSpell('staff whack', 0, 77, 'Whack an enemy with a staff.')  );
spellbook.push( new DamageSpell('Blizzard', 48, 2500, 'Deals massive ice damage.')  );
spellbook.push( new DamageSpell('Catastrophe', 80, 4416, 'Deals mega non-elemental damage.')  );

var combatLog = [];

function logEntry(owner, action, target) {
  this.owner = owner;
  this.action = action;
  this.target = target;

  this.message = owner.name + " casts " + action.name + " on " + target.name +
   " for " + action.damage + " damage.";

  console.log(this.message);
}

timerLoop();

function timerLoop() {
  // pick a spell.  its possible the wizard might choose a spell they don't
  // have enough mana for; however, FireSpellcasters should be allowed to
  // pick a spell if they can cast it.
  var j = 0;
  while (spellbook[j].cost > (wizards[0].mana)) {
    j = Math.floor( Math.random() * spellbook.length);
  }

  // pick a target at random, but should not pick self
  var target = 1 + Math.floor( Math.random() * wizards.length);

  // cast the spell, and push into combat log
  if (wizards[0].invoke(spellbook[j], wizards[target]) ) {
    combatLog.push(
        new logEntry(wizards[0], spellbook[j], wizards[target])
    );

    // move current wizard to end of list
    wizards.push(wizards[0]);
    wizards = wizards.slice(1);

    // remove dead wizards
    wizards = wizards.filter(function(x) {return x.isAlive;});
  }
  else {
    console.log ('FAIL')
        console.log (new logEntry(wizards[0], spellbook[j], wizards[target]).message);
  }

  console.log('end');
  setTimeout(function(){ timerLoop(); } , 2000);
}

