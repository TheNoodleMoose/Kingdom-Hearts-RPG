
var game = {
    character: {

    },
    mickey: {
        name: "Mickey",
        health: 200,
        attack: 5,
        counterAttack: 7,
        isPlayer: true,
        isEnemy: false,
        isDefeated: false,
    },
    donald: {
        name: "Donald",
        health: 150,
        attack: 9,
        counterAttack: 9,
        isPlayer: true,
        isEnemy: false,
        isDefeated: false
    },
    goofy: {
        name: "Goofy",
        health: 250,
        attack: 4,
        counterAttack: 6,
        isPlayer: true,
        isEnemy: false,
        isDefeated: false
    },

    pooh: {
        name: "Pooh",
        health: 175,
        attack: Math.floor((Math.random() * 7) + 4),
        counterAttack: 8,
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
            var totalDamage = Math.round(character.attack * this.damageMultipler * this.randomDamage());
        }
        else {
            var totalDamage = Math.round(character.counterAttack * this.randomDamage());
        }

        return totalDamage;
    },

    randomDamage() {
        return (Math.floor(Math.random() * (100 - 85) + 85)) / 100;
    },


    damageDealer: function (defender, attacker) {
        let damage = this.damageCalculation(attacker)
        defender.health -= damage;
        if (defender === game.mickey) {
            $(".mickeyHealth").html(" " + defender.health)
        }

        if (defender === game.donald) {
            $(".donaldHealth").html(" " + defender.health)

        }

        if (defender === game.goofy) {
            $(".goofyHealth").html(" " + defender.health)
        }

        if (defender === game.pooh) {
            $(".poohHealth").html(" " + defender.health)
        }

        // Assigning Damage Text
        if (attacker.isPlayer) {
            $("#enemyDamage").html(`${attacker.name} Dealt ${damage} damage To ${defender.name}`)

        }
        if (attacker.isEnemy) {
            $("#playerDamage").html(`${attacker.name} Dealt ${damage} damage To ${defender.name}`)

        }
    },

    loseCondition: function () {
        if (game[game.currentPlayer].isPlayer === true && game[game.currentPlayer].health <= 0) {
            game[game.currentPlayer].isDefeated = true;
            console.log(game[game.currentPlayer].isDefeated)
            alert("You Have Been Slain! Try Again!")
            location.reload();
        }
    },

    winCondition: function () {
        if (this.enemiesDefeated === 3) {
            alert("The Final Foe Is Defeated, You Win!")
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
        if (game.currentPlayer === "mickey") {
            $("#mickey").appendTo("#heroGoesHere")
            $("mickeyHealth").html(game.currentPlayer.health)
            $("#donald").appendTo("#enemiesToFight")
            $("#goofy").appendTo("#enemiesToFight")
            $("#pooh").appendTo("#enemiesToFight")
        }
        else if (game.currentPlayer === "donald") {
            $("#donald").appendTo("#heroGoesHere")
            $("#mickey").appendTo("#enemiesToFight")
            $("#goofy").appendTo("#enemiesToFight")
            $("#pooh").appendTo("#enemiesToFight")
        }
        else if (game.currentPlayer === "goofy") {
            $("#goofy").appendTo("#heroGoesHere")
            $("#donald").appendTo("#enemiesToFight")
            $("#mickey").appendTo("#enemiesToFight")
            $("#pooh").appendTo("#enemiesToFight")
        }
        else if (game.currentPlayer === "pooh") {
            $("#pooh").appendTo("#heroGoesHere")
            $("#donald").appendTo("#enemiesToFight")
            $("#mickey").appendTo("#enemiesToFight")
            $("#goofy").appendTo("#enemiesToFight")
        }
    }
    else if (game.stage === 1) {
        game.currentEnemy = $(this).attr("value");
        if (game[game.currentEnemy].isDefeated === false) {
            console.log(game.currentEnemy);
            game.stage = 2;
            game[game.currentEnemy].isEnemy = true;
            game[game.currentEnemy].isPlayer = false;
        }
        if (game[game.currentEnemy].isDefeated === true) {
            // game[game.currentEnemy].isEnemy = false;
            alert("They Are Already Defeated")
        }

        if (game.currentEnemy === "mickey") {
            $("#mickey").appendTo("#enemyGoesHere")
        }
        else if (game.currentEnemy === "donald") {
            $("#donald").appendTo("#enemyGoesHere")
        }
        else if (game.currentEnemy === "goofy") {
            $("#goofy").appendTo("#enemyGoesHere")
        }
        else if (game.currentEnemy === "pooh") {
            $("#pooh").appendTo("#enemyGoesHere")
        }

        console.log("Is Enemy: " + game[game.currentEnemy].isEnemy)
    }

});

$(".attack").on("click", function () {
    if (game.stage === 2) {
        game.damageDealer(game[game.currentEnemy], game[game.currentPlayer]);
        if (game[game.currentEnemy].health <= 0 && game[game.currentPlayer].health > 0) {
            game[game.currentEnemy].isDefeated = true;
            game.enemiesDefeated++;
            console.log("Is Defeated: " + game[game.currentEnemy].isDefeated);
            console.log("Enemies Defeated:" + game.enemiesDefeated);
            game.stage = 1;

            if (game.mickey.isDefeated === true) {
                $("#mickey").appendTo("#defeatedEnemies")
            }
            if (game.donald.isDefeated === true) {
                $("#donald").appendTo("#defeatedEnemies")
            }
            if (game.goofy.isDefeated === true) {
                $("#goofy").appendTo("#defeatedEnemies")
            }
            if (game.pooh.isDefeated === true) {
                $("#pooh").appendTo("#defeatedEnemies")
            }

        }
        if (game[game.currentEnemy].health >= 0) {
            game.damageDealer(game[game.currentPlayer], game[game.currentEnemy]);
        }

        console.log("Player Health " + game[game.currentPlayer].health);
        console.log("Enemy Health " + game[game.currentEnemy].health);



        game.winCondition();
        game.loseCondition();
    }
});

if (game.mickey.isDefeated === true) {
    $("#mickey").appendTo("#defeatedEnemies")
}
