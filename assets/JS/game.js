
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
    damageMultipler: 1,
    

    damageCalculation: function(character) {
        this.damageMultipler += .1;
    
        if(character.isPlayer) {
            var totalDamage = character.attack * this.damageMultipler * this.randomDamage(); 
        }
        else {
            var totalDamage = character.counterAttack * this.randomDamage();
        }
        
        return totalDamage;
    },

    randomDamage() {
        return (Math.floor(Math.random() * (100 - 85)+ 85)) / 100;
    },

    damageDealer: function(defender, attacker) {
        defender.health -= this.damageCalculation(attacker);
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
        game[game.currentPlayer].isPlayer = true;
        game[game.currentPlayer].isEnemy = false;
        console.log(game[game.currentPlayer].isPlayer)
    } 
    else if(game.stage === 1) {
        game.currentEnemy = $(this).attr("value");
        console.log(game.currentEnemy);
        game.stage = 2;
        game[game.currentEnemy].isEnemy = true;
        game[game.currentEnemy].isPlayer = false;
        console.log(game[game.currentEnemy].isEnemy)
    }
    
  });

$(".attack").on("click", function() {
    if(game.stage === 2) {
        game.damageDealer(game[game.currentEnemy], game[game.currentPlayer]);
        game.damageDealer(game[game.currentPlayer], game[game.currentEnemy]);
        console.log("Player Health " + game[game.currentPlayer].health);
        console.log("Enemy Health " + game[game.currentEnemy].health);
        
    }
});
