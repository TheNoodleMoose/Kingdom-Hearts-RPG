
var game = {
    character: {

    },
    mickey: {
        health: 200,
        attack: 5,
        counterAttack: 7,
        isPlayer: true,
        isEnemy: false,
        isDefeated: false,
    },
    donald: {
        health: 150,
        attack: 8,
        counterAttack: 9,
        isPlayer: true,
        isEnemy: false,
        isDefeated: false
    },
    goofy: {
        health: 250,
        attack: 4,
        counterAttack: 6,
        isPlayer: true,
        isEnemy: false,
        isDefeated: false
    },

    pooh: {
        health: 175,
        attack: Math.floor((Math.random() * 10) + 1),
        counterAttack: 6,
        isPlayer: true,
        isEnemy: false,
        isDefeated: false
    },
    currentPlayer: "",
    currentEnemy: "",
    stage: 0,
    damageMultipler: 1,
    enemiesDefeated: 0,


    damageCalculation: function (character) {
        this.damageMultipler += .1;

        if (character.isPlayer) {
            var totalDamage = character.attack * this.damageMultipler * this.randomDamage();
        }
        else {
            var totalDamage = character.counterAttack * this.randomDamage();
        }

        return totalDamage;
    },

    randomDamage() {
        return (Math.floor(Math.random() * (100 - 85) + 85)) / 100;
    },

    damageDealer: function (defender, attacker) {
        defender.health -= this.damageCalculation(attacker);     
    },

    loseCondition: function () {
        if (game[game.currentPlayer].isPlayer === true && game[game.currentPlayer].health <= 0) {
            game[game.currentPlayer].isDefeated = true;
            console.log(game[game.currentPlayer].isDefeated)
            alert("You Lose")
            location.reload();
        }
    },

    winCondition: function () {
        if(this.enemiesDefeated === 3) {
            alert("You Win")
            location.reload();
        }
    },

}

$(".character").on("click", function () {
    if (game.stage === 0) {
        game.currentPlayer = $(this).attr("value");
        console.log(game.currentPlayer);
        game.stage = 1;
        game[game.currentPlayer].isPlayer = true;
        game[game.currentPlayer].isEnemy = false;
        console.log("Is Player: " + game[game.currentPlayer].isPlayer)
        if(game.currentPlayer === "mickey") {
            $("#mickey").appendTo("#selectedCharacter")
            $("mickeyHealth").html(game.currentPlayer.health)
            $("#donald").appendTo("#enemiesToFight")
            $("#goofy").appendTo("#enemiesToFight")
            $("#pooh").appendTo("#enemiesToFight")
        }
        else if(game.currentPlayer === "donald") {
            $("#donald").appendTo("#selectedCharacter")
            $("#mickey").appendTo("#enemiesToFight")
            $("#goofy").appendTo("#enemiesToFight")
            $("#pooh").appendTo("#enemiesToFight")
        }
        else if(game.currentPlayer === "goofy") {
            $("#goofy").appendTo("#selectedCharacter")
            $("#donald").appendTo("#enemiesToFight")
            $("#mickey").appendTo("#enemiesToFight")
            $("#pooh").appendTo("#enemiesToFight")
        }
        else if(game.currentPlayer === "pooh") {
            $("#pooh").appendTo("#selectedCharacter")
            $("#donald").appendTo("#enemiesToFight")
            $("#mickey").appendTo("#enemiesToFight")
            $("#goofy").appendTo("#enemiesToFight")
        }
    }
    else if (game.stage === 1) {
        game.currentEnemy = $(this).attr("value");
        if(game[game.currentEnemy].isDefeated === false) {
            console.log(game.currentEnemy);
        game.stage = 2;
        game[game.currentEnemy].isEnemy = true;
        game[game.currentEnemy].isPlayer = false;
        }
        if(game[game.currentEnemy].isDefeated === true) {
            // game[game.currentEnemy].isEnemy = false;
            alert("They Are Already Defeated")
        }

        if(game.currentEnemy === "mickey") {
            $("#mickey").appendTo("#chosenEnemy")
        }
        else if(game.currentEnemy === "donald") {
            $("#donald").appendTo("#chosenEnemy")
        }
        else if(game.currentEnemy === "goofy") {
            $("#goofy").appendTo("#chosenEnemy")
        }
        else if(game.currentEnemy === "pooh") {
            $("#pooh").appendTo("#chosenEnemy")
        }
        
        console.log("Is Enemy: " + game[game.currentEnemy].isEnemy)
    }

});

$(".attack").on("click", function () {
    if (game.stage === 2) {
        if (game[game.currentEnemy].health > 0 && game[game.currentEnemy].isDefeated === false) {
            game.damageDealer(game[game.currentEnemy], game[game.currentPlayer]);
            game.damageDealer(game[game.currentPlayer], game[game.currentEnemy]);
            game.loseCondition();
            console.log("Player Health " + game[game.currentPlayer].health);
            console.log("Enemy Health " + game[game.currentEnemy].health);
        }

        if (game[game.currentEnemy].health <= 0) {
            game[game.currentEnemy].isDefeated = true;
            game.enemiesDefeated++;
            console.log("Is Defeated: " + game[game.currentEnemy].isDefeated);
            console.log("Enemies Defeated:" + game.enemiesDefeated);
            game.stage = 1;
        }

        game.winCondition();
    }
});
