$(document).ready(function(){

    // Variables
    var geralt;
    var ciri;
    var yennefer;
    var drowner;
    var leshen;
    var noon;

    var characterSelection = [];
    var character = null;
    var defenders = [];
    var defender = null;

    // Start Game

    function startGame() {

    // Charater Info

        geralt = {
            id: 0,
            name: "Geralt of Rivia",
            healthPoints: 130,
            baseAttack: 10,
            attackpower: 10,
            counterAttackPower: 10,
    
        }

        ciri = {
			id: 1,
			name: "Cirilla Fiona Elen Riannon",
			healthPoints: 120,
			baseAttack: 10,
			attackPower: 9,
            counterAttackPower: 8,
            
        }
       
        yennefer = {
            id: 2,
            name: " Yennefer of Vengerberg",
            healthPoints: 120,
            baseAttack: 9,
            attackPower: 9,
            counterAttackPower: 9,

        }

        drowner = {
			id: 3,
			name: "Drowner",
			healthPoints: 100,
			baseAttack: 7,
			attackPower: 6,
            counterAttackPower: 5,

        }

        leshen = {
            id: 4,
            name: "Leshen",
            healthPoints: 100,
            baseAttack: 10,
            attackPower: 9,
            counterAttackPower: 7,

        }

        noon = {
            id: 5,
            name: "Noonwraith",
            healthPoints: 100,
            baseAttack: 8,
            attackPower: 8,
            counterAttackPower: 5,

        }

        // reset character selected
		character = null;

		// reset enemies array
		defenders = [];

		// reset enemy selected
		defender = null;

		// reset character selections
		characterSelection = [geralt, ciri, yennefer, drowner, leshen, noon];

		// clears all character divs
		$("#character").empty();
		$("#defenderArea").empty();
		$("#defender").empty();
        $("#status").empty();
        
    })
