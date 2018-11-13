// Object that holds all game objects and functions
var game = {
    //Eventually all characters will be in this character object for scaleiability, haven't done it yet though
    character: {

    },
    //Mickey Object
    mickey: {
        name: "Mickey",
        health: 200,
        attack: 5,
        counterAttack: 7,
        isPlayer: true,
        isEnemy: false,
        isDefeated: false,
    },
    //Donald Object
    donald: {
        name: "Donald",
        health: 150,
        attack: 9,
        counterAttack: 9,
        isPlayer: true,
        isEnemy: false,
        isDefeated: false
    },
    //Goofy Object
    goofy: {
        name: "Goofy",
        health: 250,
        attack: 3.5,
        counterAttack: 6,
        isPlayer: true,
        isEnemy: false,
        isDefeated: false
    },
    //Pooh Object
    pooh: {
        name: "Pooh",
        health: 175,
        attack: Math.floor((Math.random() * 7) + 4),
        counterAttack: 8,
        isPlayer: true,
        isEnemy: false,
        isDefeated: false
    },
    //Empty string that holds which character is the current player
    currentPlayer: "",
    //Empty string that holds which character is the current enemy
    currentEnemy: "",
    //This is the staging variable on which the game runs, very important
    stage: 0,
    //Used for the damage calculation
    damageMultipler: 1,
    //Used to for the winning condition
    enemiesDefeated: 0,

    //h is how damage is calculated, runs depending on if character is the player or not
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
    //Function that generates a random number between 100 - 85 and divides it by 100 to get a decimal value
    randomDamage() {
        return (Math.floor(Math.random() * (100 - 85) + 85)) / 100;
    },

    //This function deals the damage, takes a argument of defender and attacker
    damageDealer: function (defender, attacker) {
        let damage = this.damageCalculation(attacker)
        defender.health -= damage;

        //These assign healths to each character so their health dynamically changes
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
            $("#enemyDamage").html(`${attacker.name} Dealt ${damage} damage To ${defender.name}!`)

        }
        if (attacker.isEnemy) {
            $("#playerDamage").html(`${attacker.name} Dealt ${damage} damage To ${defender.name}!`)

        }
    },
    //Function that checks if the player is defeated
    loseCondition: function () {
        if (game[game.currentPlayer].isPlayer === true && game[game.currentPlayer].health <= 0) {
            game[game.currentPlayer].isDefeated = true;
            console.log(game[game.currentPlayer].isDefeated)
            alert("You Have Been Slain! Try Again!")
            location.reload();
        }
    },
    //Function that checks if the player has defeated the correct amount of enemies 
    winCondition: function () {
        if (this.enemiesDefeated === 3) {
            setTimeout(function() {
                alert("The Final Foe Is Defeated, You Win!")
                location.reload();
            }, 300)
        }
    },

}

//On click function to choose a character and then a enemy
//If the stage is 0, you choose a character and the stage goes to 1
//When in stage one you can select a enemy, the stage will then go up to 2
//This function also appends the enemies and the chosen player to their appopriate positions
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
        //These move the characters to the active enemy spot depending on the character
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

//This is the attack function that is ran once the attack button is pressed
//It only runs if the the game stage is on stage 2
//Once a enemy is defeated the game stage will switch back to 1 so a new enemy can be selected
//The win and loss conditions are also ran here to see whether on attack click if the player has won or either loss
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

