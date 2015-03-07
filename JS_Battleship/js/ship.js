// Ship class
var Ship = function(id,size){
	this.id = id;
	this.size =size;
	this.status = 'ALIVE';
	this.numShots = 0;
	this.attemptsDrawn=0;
	
	this.getShot = function(){
		this.numShots++;
		this.status = 'HIT';
		if (this.numShots == this.size)
			this.status = 'KILL';
	};
};