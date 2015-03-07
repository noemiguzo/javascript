// Game class
var Game = function(){
	this.numsPlayers = null;
	this.players = [];
	

	//setting 
	 if (gSetting.enabled) {
    for (var i = 0; i < gSetting.count; i++) {
      console.log(gSetting.color);
		}
	  }
	this.play = function() {
	
		var player = this.players[0];
		do {
			var limit = player.field.size - 1;
			// var shot = new Shot(window.prompt('Shot?  'x,y' coordinates,[0 - ' + limit + ']', for example: 2,1));
			var shot = window.prompt("Enter 2 values for example: '2,1' into of range 'x,y':[0 - " + limit + "], ");
			if (shot=="") { window.alert("Invalid shot!!!"); break;}
			if (player.field.validationShot(shot)){
				player.field.evalShot(shot);
			}
			else { window.alert("Invalid shot!!!");}
			
		} while(player.isLooser());
	};
	
	this.start = function(numsPlayers){
		this.numsPlayers = numsPlayers;
		for (var i = 0 ; i < numsPlayers; i++) {
			this.players.push(new Player());
		}
		this.play();
	}

};
