// main js file

var bsg = new Game();

//Get the number of players set on config.js file
var numPlayers = getSetting.numPlayers;

//Open Console log according to number of players 
console.log('Number of players: ' + numPlayers);

//Star the game according to number of players 
bsg.start(parseInt(numPlayers, 10));
	  
