
var game = {

        mickey: {
            health: 200,
            attack: 5,
            counterAttack: 6,
            isPlayer: true,
            isEnemy: false,
            isDefeated: false,
        },
        donald: {
            health: 150,
            attack: 8,
            counterAttack: 7,
            isPlayer: true,
            isEnemy: false,
            isDefeated: false
        },
        goofy: {
            health: 250,
            attack: 4,
            counterAttack: 4,
            isPlayer: true,
            isEnemy: false,
            isDefeated: false
    },
    currentPlayer: "",
    currentEnemy: "",
    stage: 0,
    damageMultipler: .02,

    damageCalculation: function(character) {
        this.damageMultipler *= 2;
        if(game.character.isPlayer) {
            var totalDamage = game.character.attack * this.damageMultipler * this.randomDamage(); 
        }
        else {
            var totalDamage = game.character.counterAttack * this.damageMultipler
        }
        
        return totalDamage;
        console.log(totalDamage)
    },

    randomDamage() {
        return (Math.floor(Math.random() * (100 - 85)+ 85)) / 100;
    },

    damageDealer: function(defender, attacker) {
        defender.health =- this.damageCalculation(attacker);
    },

    loseCondition: function() {

    },

    winCondition: function() {

    },

}

$(".character").on("click", function() {
    if(game.stage === 0) {
        game.currentPlayer = $(this).attr("value");
        console.log(game.currentPlayer);
        game.stage = 1;
        game[game.currentPlayer].isPlayer = false
        console.log(game[game.currentPlayer].isPlayer)
    } 
    else if(game.stage === 1) {
        game.currentEnemy = $(this).attr("value");
        game.stage = 2;
        console.log(game.currentEnemy)
    }
    
  });

$(".attack").on("click", function() {
    if(game.stage === 2) {
        damageDealer
    }
});
