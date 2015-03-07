/**
 * Class with attributes and methods for Player
 * @constructor
 */
var Player = function(){
	this.field = new Field();
	this.name = window.prompt('Enter Your name:');
    /**
     * Method that return if the ship is alive for the ¨field¨
     * that method is evaluate in class field
     * @returns {the evaluation of function isAnyShipAlive(); }
     */
	this.isLooser = function() {
		return this.field.isAnyShipAlive();
	};
};
