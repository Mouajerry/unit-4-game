$(document).ready(function() {

        // Charater Info
    var characters = {
        "geralt" : {
            name: "Geralt of Rivia",
            health: 130,
            Attack: 10,
            imageUrl: "assets/images/geralt.jpeg",
            counterAttack: 9,
            
        },

        "ciri" : {
			name: "Cirilla Fiona Elen Riannon",
			health: 120,
            attack: 9,
            imageUrl: "assets/images/ciri.jpeg",
            counterAttack: 8
            
        },
       
        "yennefer" : {
            name: " Yennefer of Vengerberg",
            health: 120,
            attack: 9,
            imageUrl: "assets/images/yennefer.jpeg",
            counterAttack: 8
            
        },

        "drowner" : {
			name: "Drowner",
			health: 100,
            attack: 7,
            imageUrl: "assets/images/drowner.jpeg",
            counterAttack: 6
            
        },

        "leshen" : {
            name: "Leshen",
            health: 130,
            attack: 10,
            imageUrl: "assets/images/leshen.jpeg",
            counterAttack: 8
            
        }, 

        "noon" : {
            name: "Noonwraith",
            health: 120,
            attack: 8,
            imageUrl: "assets/images/noon.jpeg",
            counterAttack: 8
            
        }
    };
    console.log(characters);

    var currSelectedCharacter;
    var defender = [];
    var currDefender;
    var turnCounter = 1;
    var killCount = 0;


    // This function will render the character to the page and the appropriate areas.
    var renderOne = function(character, renderArea, charStatus) {
        var charDiv = $("<div class='character' data-name='" + character.name + "'>");
        var charName = $("<div class='character-name'>").text(character.name);
        var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
        var charHealth = $("<div class='character-health'>").text(character.health);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);

            // if the character is the enemy
        if (charStatus === "enemy") {
            $(charDiv).addClass("enemy");
        }
        else if (charStatus === "defender") {
            currDefender = character;
            $(charDiv).addClass("target-enemy");
        }
};

var renderMessage = function(message) {

    var gameMessageSet = $("#game-message");
    var newMessage = $("<div>").text(message);
    gameMessageSet.append(newMessage);

    if (message === "clearMessage") {
        gameMessageSet.text("");
    }
}
    // selected character
    var renderCharacters = function(charObj, areaRender) {
        
        if (areaRender === "#characters-section") {
         $(areaRender).empty();
            for (var key in charObj) {
                if (charObj.hasOwnProperty(key)) {
                    renderOne(charObj[key], areaRender, "");
                    }
                }
            }
        
        if(areaRender === "#selected-character"){
            renderOne(charObj, areaRender, "");
        }
        // enemy's still availiable
        if (areaRender === "#available-to-attack-section") {
            
            for(var i = 0; i < charObj.length; i++) {
                renderOne(charObj[i], areaRender, "enemy");
            }
       
                // on click for enemy
            $(document).on("click", ".enemy", function() {
                var name = ($(this).attr("data-name"));

                if ($("#defender").children().length === 0) {
                    renderCharacters(name, "#defender");
                    $(this).hide();
                    renderMessage("clearMessage");
                }
            });
        }
            // enemy 
        if (areaRender === "#defender") {
            $(areaRender).empty();
            for (var i = 0; i < defender.lenght; i++) {
                if (defender[i].name === charObj) {
                    renderOne(defender, areaRender, "defender");
                }
            }
        }

        // rerender when defender is attacked
        if (areaRender === "playerDamage") {
            $("#defender").empty();
            renderOne(charObj, "#defender", "defender");
        }
        // rerender when character is attacked
        if (areaRender --- "enemyDamage") {
            $("#selected-character").empty();
            renderOne(charObj, "#selected-character", "");
        }

        if (areaRender === "enemyDefeated") {
            $("#defender").empty();
            var gameStateMessage = ("You have Defeated " + charObj.name + ", you can fight again.");
            renderMessage(gameStateMessage);
        }
    };

    var restartGame = function(inputEndGame) {
        // Restart button to reset game
        var restart = $("<button>Restart</button>").click(function(){
            location.reload();
        });
        
        // Displat win/lose message
        var gameState = $("<div>").text(inputEndGame);

        $("body").append(gameState);
        $("body").append(restart);
    };

        //render all characters
     renderCharacters(characters, "#characters-section");

        // On click event for the pictures
     $(document).on("click", ".character", function () {

        var name = $(this).attr("data-name");

        if (!currSelectedCharacter) {

            currSelectedCharacter = characters[name];

           for (var key in characters) {
               if (key !== name){
               defender.push(characters[key]); 
               }
           } 
           $("#characters-selection").hide();

           renderCharacters(currSelectedCharacter, "#selected-charater");
           renderCharacters(defender, "#available-to-attack-section");
        }
     });

     $("#attack-button").on("click", function(){

        if ($("#defender").children().lenght !== 0) {

            var attackedMessage = "You attacked " + currDefender.name + " for " + (currSelectedCharacter.attack * turnCounter) + "damage.";
            var counterAttackMessage = currDefender.name + " Attacked you back for " + (currDefender.counterAttack * turnCounter) + "damage.";
            renderMessage("clearMessage");

            // reduce your enemy's health by your attack
            currDefender.health -= (currSelectedCharacter.attack * turnCounter);

            // if enemy isn't dead
            if (currDefender.health > 0) {
                renderCharacters(currDefender, "playerDamage");

                renderMessage(attackedMessage);
                renderMessage(counterAttackMessage);

                // reduce life points when attacked back
                currSelectedCharacter.health -= currDefender.counterAttack;

                renderCharacters(currSelectedCharacter, "enemyDamage");

                if (currSelectedCharacter.health <= 0) {
                    renderMessage("clearMessage");
                    restartGame("You have been Defeated...");
                    $("#attack-button").unbind("click");
                }


            }
        }
        // if enemy has less than health
        else {
            renderCharacters(currDefender, "enemyDefeated");

            // increase kill count
            killCount++;

            // if killed all enemy you win
            if (killCount >= 5) {
                renderMessage("clearMessage");
                restartGame("You Win!");
            }
        }
        turnCounter++;
     });
});

     