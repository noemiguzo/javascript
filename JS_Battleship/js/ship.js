/**
 * Class with attributes and methods for Ship
 * @param id ship
 * @param size of ship
 * @constructor
 */
var Ship = function(id,size){
	this.id = id;
	this.size =size;
	this.status = 'ALIVE';
	this.numShots = 0;
	this.attemptsDrawn=0;
    
    /**
     * Method that change the status according to num of shots
      */	
	this.getShot = function(){
		this.numShots++;
		this.status = 'HIT';
		if (this.numShots == this.size)
			this.status = 'KILL';
	};
};
