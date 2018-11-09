
var game = {

    characters: {

        Mickey: {
            health: 200,
            attack: 5,
            counterAttack: 6,
            isPlayer: true,
            isEnemy: false,
            isDefeated: false,
        },
        Donald: {
            health: 150,
            attack: 8,
            counterAttack: 7,
            isPlayer: true,
            isEnemy: false,
            isDefeated: false
        },
        Goofy: {
            health: 250,
            attack: 4,
            counterAttack: 4,
            isPlayer: true,
            isEnemy: false,
            isDefeated: false
        },
    },

    damageMultipler: .02,

    addAttack: function() {
        for(i = 0; i < this.characters.length; i++) {
            this.characters.attack + 5
        } 
    },

    damageCalculation: function() {
        this.damageMultipler += .1;
    },

    damageDealer: function() {

    },

    loseCondition: function() {

    },

    winCondition: function() {

    }

}

$("#attack").on("click", function() {
    alert("I've been clicked!");
    game.damageCalculation();
    console.log(game.damageMultipler)
  });
