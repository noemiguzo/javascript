/**
* Class with attributes and methods for Game
* @constructor
*/
var Game = function(){
	this.numsPlayers = null;
	this.players = [];

	 /**
	 *Play the battleShip Game
	 *
	 */
	this.play = function() {
	
		var player = this.players[0];
		do {
			var limit = player.field.size - 1;
			var shot = window.prompt("Shot 'x,y'?[0 - " + limit + "], for example: '2,1'");

			if (shot == "") {
				break;
			}

			if (player.field.validationShot(shot)){
				player.field.evalShot(shot);
			} else { 
				console.log ("Invalid shot.");
			}
		} while(player.isLooser());
	};
	
	/**
	*Start the battleShip Game
	*
	*@param numsPlayers
	*/
	this.start = function(numsPlayers){
		this.numsPlayers = numsPlayers;
		for (var i = 0 ; i < numsPlayers; i++) {
			this.players.push(new Player());
		}
		this.play();
	}
};