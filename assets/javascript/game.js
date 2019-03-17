$(document).ready(function() {

        // Charater Info
    var characters = {
        "geralt" : {
            name: "Geralt of Rivia",
            health: 130,
            Attack: 10,
            counterAttack: 9,
            imgUrl:"assets/images/geralt.jfjf"
        },

        "ciri" : {
			name: "Cirilla Fiona Elen Riannon",
			health: 120,
			attack: 9,
            counterAttack: 8,
            imgUrl:"assets/images/ciri.jfif"
        },
       
        "yennefer" : {
            name: " Yennefer of Vengerberg",
            health: 120,
            attack: 9,
            counterAttack: 8,
            imgUrl:"assets/images/yennefer.jfif"
        },

        "drowner" : {
			name: "Drowner",
			health: 100,
			attack: 7,
            counterAttack: 6,
            imgUrl:"assets/images/drowner.jfif"
        },

        "leshen" : {
            name: "Leshen",
            health: 130,
            attack: 10,
            counterAttack: 8,
            imgUrl:"assets/images/leshen.jfif"
        }, 

        "noon" : {
            name: "Noonwraith",
            health: 120,
            attack: 8,
            counterAttack: 8,
            imgUrl:"assets/images/noon.jfif"
        }
    };
    console.log(characters);

    // This function will render the character to the page and the appropriate areas.
    var renderOne = function(character, renderArea){
        var charDiv = $("<div class=`character` data-name=`" + character.name +"`>");
        var charName = $("<div class= `character-name`>").text(character.name);
        var charImage = $("<img alt=`image` class=`character-images`>").attr("src", character.imageUrl);
        var charHealth = $("div class=`character-health`>").text(character.health);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);
    }

    var renderCharacters = function(charObj, areaRender) {
        if (areaRender === "#character-selection") {
         $(areaRender).empty();
            for (var key in charObj) {
                if (charObj.hasOwnProperty(key)) {
                    CanvasRenderingContext2D(charObj[key], areaRender);
                    }
                }
            }
        }
     renderCharacters(characters, "#characters-selection");
});

     