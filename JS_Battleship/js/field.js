
/**
* Class with attributes and methods for Field game
* @constructor
*/
var Field = function(){

	this.size = getSetting.size;
	this.numShips = [getSetting.numShipsL1,getSetting.numShipsL2,getSetting.numShipsL3];
	this._field = [];
	this._ships = [];
	this.regExp = new RegExp(/^[0-9]+$/); //only numbres
	this.regExpShot = new RegExp(/^[0-9]+[,][0-9]+/);

	/**
     	* Method that generate the matrix 
     	* @private
     	*/
	this._initField = function() {
	 for(var i=0; i<this.size; i++) {
            this._field[i] = [];
            for(var j=0; j<this.size; j++) {
                this._field[i][j] = '0';
            }			
         }
	};

	/**
     	* Method to drawn the field matrix 
     	*/
	this.drawn = function() {

		console.log("TEST:");
		for(var i=0; i < this.size; i++) {      		
			console.log( i + '> ' + this._field[i].join('-'));			
        	}
	};
	
	/**
	*Method to draw given a ship , the filed , in (x,y) random coordinates 
	*
	* @private
	* @param {number}ship 	
	*/
	this._drawShip = function(ship){
		var initPosx= this.getValueRam(this.size,ship.size);	
		var initPosy= this.getValueRam(this.size,ship.size);
		var orientation= this.getValueRam(2,0); //[0,1] 0- Horizontal, 1 -Vertical	
		console.log("Try to draw ship:" + ship.id + " Pos X:"+ initPosx + ", Pos Y:" + initPosy +"---" + orientation );
		if (orientation==0) {
			for (var i = initPosy; i < (initPosy + ship.size); i++) {
				//first ask if there not any ship
				if (this._field[initPosx][i]==0) {
					this._field[initPosx][i] = ship.id;
				} else {  //if a crash then remove the ship an try again
					this._removeShip(initPosx,initPosy,orientation,ship);
					break;
				}
			}
		} else {
			for (var i = initPosx; i < (initPosx + ship.size); i++) {
				//first ask if there not any ship
				if (this._field[i][initPosy]==0) {
					this._field[i][initPosy] = ship.id;	
				} else { //if a crash then remove the ship an try again
					this._removeShip(initPosx,initPosy,orientation,ship);
					break;
				}
			}
		}
		
	};

	/** 
	* Method to remove a ship when this can be drawn fully
	* @param {number} initPosx
	* @param {number} initPosy
	* @param {number} orientation
	*/
	this._removeShip=function(initPosx,initPosy,orientation,ship){
		if (orientation==0) {
			for (var i = initPosy; i <(initPosy + ship.size); i++) {

				//first ask if ship has been drawn
				if (this._field[initPosx][i]==ship.id) {
					this._field[initPosx][i] = 0;	
				}					
			}
		} else {
			for (var i = initPosx; i < (initPosx + ship.size); i++) {

				//first ask if ship has been drawn
				if (this._field[i][initPosy] == ship.id) {
					this._field[i][initPosy] =0 ;	
				}					
			}
		}
		ship.attemptsDrawn++; //try again 

		// controlling the number of attempts to prevent overflows,maximum 4 times
		if (ship.attemptsDrawn<5) {
			this._drawShip(ship)
		}
	};
	
	/**
	* Method to get random integer
	*/
	this.getValueRam = function(size, ship_size){
		var initPos = parseInt(Math.random() * (size - ship_size));
	  return initPos;
	};
	
	/**
	* Method to create the ships
	*/
	this._initShips = function() {
	var j=1;
	var qs=this.numShips.length;
		for (var i = 0; i < qs; i++) {
			for (var k = 1; k <= this.numShips[i]; k++) {
			  
				var ship = new Ship(j,i+1);
				this._ships[ship.id] = ship;
				this._drawShip(ship,j-1);
				j++;
			}
		}
	};
	
	/**
	* Method to evaluate shot
	*@param pos
	*/
	this.evalShot = function(pos) {
		var pos = pos.split(",");
        var y = parseInt(pos[0], 10);
        var x = parseInt(pos[1], 10);
		var val = this._field[x][y];
		if(this.regExp.test(val)){	
			if (val != '0') {
				var ship = this._ships[val];
				ship.getShot();
				this._field[x][y] = 'H';
				console.log(ship.status + ' the ship with ID: ' + ship.id);
			} else {
				this._field[x][y] = 'F';
				console.log('FAIL');
			}
		} else {console.log('FAIL, shot already exists');}
			this.drawn();
	};

	/**
	* Method to verify if there is any ship alive
	*/
	this.isAnyShipAlive = function() {
		for (var i = 1; i < this._ships.length; i++) {
			if (this._ships[i].status != 'KILL')
				return true;
		}
	};

	/**
	* Method to  validate the entered shot
	*@param coorShot, i.e. 2,1
	*/
	this.validationShot=function(coorShot){
		// if the string is empty
		if (coorShot == ""){return false;}

		//if the string follow the ^[0-9]+[,][0-9]+, for example:0,2			
		if(this.regExpShot.test(coorShot)) {	
			var coorShot = coorShot.split(",");
			var x = parseInt(coorShot[0], 10);
			var y = parseInt(coorShot[1], 10);
			if (x >= this.size || y>= this.size) {return false; }
			return true;
		} else {return false;}
		
	}
	
	this._initField();
	this._initShips();
	this.drawn();
};
