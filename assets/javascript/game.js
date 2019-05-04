$(document).ready(function() {

    // Charater Info
var characters = {
    "geralt" : {
        name: "geralt",
        health: 140,
        attack: 9,
        imageUrl: "assets/images/geralt.jpeg",
        counterAttack: 10
        
    },

    "ciri" : {
        name: "ciri",
        health: 130,
        attack: 9,
        imageUrl: "assets/images/ciri.jpg",
        counterAttack: 10
        
    },
   
    "yennefer" : {
        name: "yennefer",
        health: 140,
        attack: 9,
        imageUrl: "assets/images/yennefer.jpeg",
        counterAttack: 10
        
    },

    "drowner" : {
        name: "drowner",
        health: 120,
        attack: 7,
        imageUrl: "assets/images/drowner.jpg",
        counterAttack: 10
        
    },

    "leshen" : {
        name: "leshen",
        health: 150,
        attack: 9,
        imageUrl: "assets/images/leshen.jpeg",
        counterAttack: 10
        
    }, 

    "noon" : {
        name: "noon",
        health: 130,
        attack: 8,
        imageUrl: "assets/images/noon.jpeg",
        counterAttack: 10
        
    }
};
console.log(characters);

var currSelectedCharacter;
var combatants = [];
var defender;
var turnCounter = 1;
var killCount = 0;


// This function will render the character to the page and the appropriate areas.
var renderCharacter = function(character, renderArea) {
    var charDiv = $("<div class='character' data-name='" + character.name + "'>");
    var charName = $("<div class='character-name'>").text(character.name);
    var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
    var charHealth = $("<div class='character-health'>").text(character.health);
    charDiv.append(charName).append(charImage).append(charHealth);
    $(renderArea).append(charDiv);
};

// This function will load all characters
var initializeGame = function() {
    // Loop through the characters object and call the renderCharacter function on each character to render their card.
    for (var key in characters) {
      renderCharacter(characters[key], "#characters-section");
    }
  };

  initializeGame();

  var updateCharacter = function(charObj, areaRender) {

    $(areaRender).empty();
    renderCharacter(charObj, areaRender);
  };

  // This function will render the available-to-attack enemies. This should be run once after a character has been selected
  var renderEnemies = function(enemyArr) {
    for (var i = 0; i < enemyArr.length; i++) {
      renderCharacter(enemyArr[i], "#available-to-attack-section");
    }
  };


//  render game message
var renderMessage = function(message) {

var gameMessageSet = $("#game-message");
var newMessage = $("<div>").text(message);
gameMessageSet.append(newMessage);

if (message === "clearMessage") {
    gameMessageSet.text("");
}
};

var restartGame = function(resultMessage) {
    // Restart button to reset game
    var restart = $("<button>Restart</button>").click(function(){
        location.reload();
    });
    
    // Displat win/lose message
    var gameState = $("<div>").text(resultMessage);

    $("body").append(gameState);
    $("body").append(restart);
};

 // Function to clear the game message section
 var clearMessage = function() {
    var gameMessage = $("#game-message");

    gameMessage.text("");
  };


// click event selected character
$("#characters-section").on("click", ".character", function() {
    var name = $(this).attr("data-name");

    if (!currSelectedCharacter) {
        currSelectedCharacter = characters[name];
        for (var key in characters) {
            if (key !== name) {
              combatants.push(characters[key]);
            }
     }

     $("#characters-section").hide();

     updateCharacter(currSelectedCharacter, "#selected-character");
     renderEnemies(combatants);
   }
 });

 // Creates an on click event for each enemy.
 $("#available-to-attack-section").on("click", ".character", function() {
    // Saving the opponent's name.
    var name = $(this).attr("data-name");

    if ($("#defender").children().length === 0) {
        defender = characters[name];
        updateCharacter(defender, "#defender");
  
        $(this).remove();
        clearMessage();
      }
    });


 $("#attack-button").on("click", function(){

    if ($("#defender").children().length !== 0) {

        var attackMessage = "You attacked " + defender.name + " for " + currSelectedCharacter.attack * turnCounter + " damage.";
      var counterAttackMessage = defender.name + " attacked you back for " + defender.counterAttack + " damage.";
      clearMessage();


        // reduce your enemy's health by your attack
        defender.health -= currSelectedCharacter.attack * turnCounter;

        // if enemy isn't dead
        if (defender.health > 0) {
            updateCharacter(defender, "#defender");

            renderMessage(attackMessage);
            renderMessage(counterAttackMessage);

            // reduce life points when attacked back
            currSelectedCharacter.health -= defender.counterAttack;

            updateCharacter(currSelectedCharacter, "#selected-character");

            if (currSelectedCharacter.health <= 0) {
                    clearMessage();
                restartGame("You have been Defeated...");
                $("#attack-button").off("click");
            }
        }
    // if enemy has less than health
    else {
        $("#defender").empty();

        var gameStateMessage = "You have defeated " + defender.name + ", you can choose to fight another enemy.";
        renderMessage(gameStateMessage);


        // increase kill count
        killCount++;

        // if killed all enemy you win
        if (killCount >= combatants.length) {
            clearMessage();
          $("#attack-button").off("click");
          restartGame("You Win!");

        }
    }
    turnCounter++;
}
    else {
        // If there is no defender, render an error message.
        clearMessage();
        renderMessage("No enemy here.");
    }
 });
});