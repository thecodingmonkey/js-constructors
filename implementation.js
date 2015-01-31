var wizards = new Array(6);

wizards[0] = elsa = new Spellcaster('Elsa', 9999, 100);
wizards[1] = tahlkora = new Spellcaster('Tahlkora', 9999, 100);
wizards[2] = aeris = new Spellcaster('Aeris', 9999, 100);
wizards[3] = vivi = new FireSpellcaster('Vivi', 9999, 100);
wizards[4] = terra = new FireSpellcaster('Terra', 9999, 100);
wizards[5] = vekk = new FireSpellcaster('Vekk', 9999, 100);

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
}


//debugger;
//breakpoint;

while (wizards.length > 1) {
  var i;
  for (i in wizards) {
    if (wizards[i].health > 0) {
      console.log('It is now', wizards[i].name + "'s", ' turn.');

      var j = 0;
      while (spellbook[j].cost > (wizards[i].mana * 2)) {
        j = Math.floor( Math.random() * spellbook.length);
      }
      console.log('Spell selected:', spellbook[j].name);

      var target = i;
      while (target == i) {
        target = Math.floor( Math.random() * wizards.length);
      }
      console.log('Target selected:', target);

      wizards[i].invoke(spellbook[j], wizards[target]);
      console.log(wizards[i].name, "deals", spellbook[j].damage, "damage to", wizards[target].name, wizards[target].health);

      combatLog.push(
          new logEntry(wizards[i], spellbook[j], wizards[target])
        );

//      setTimeout()
      wizards.filter(function(x) {return x.isAlive;});

    }
  }
  wizards = wizards.filter(function(x) {return x.isAlive;});
}

console.log(combatLog);