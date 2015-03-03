
// Field class
var Field = function(){
	// Constructor code
	this.size = gSetting.size; // Optional
	this.numShips = [gSetting.numShipsL1,gSetting.numShipsL2,gSetting.numShipsL3]; // Optional
	this._field = [];
	this._ships = [];
	
	// Definition of class method
	this._initField = function() {
	 for(var i=0; i<this.size; i++) {
            this._field[i] = [];
            for(var j=0; j<this.size; j++) {
                this._field[i][j] = '0';
            }			
        }
	};
	this.drawn = function() {

		console.log("TEST:");
		for(var i=0; i<this.size; i++) {           
			console.log( i + '> ' + this._field[i].join('-'));			
        }
		/*console.log("PLAYER:");
		for(var i=0; i<this.size; i++) {           
			console.log( i + '> ' + this._field[i].join('-').replace(/1/g, '0'));
        }*/
	};
	
	this._drawShip = function(ship,j){
		 var initPos2= this.getValueRam(this.size,ship.size);
		
		for (var i = initPos2; i < (initPos2 + ship.size); i++) {
			this._field[j][i] = ship.id;	
		}
	};
	
	this.getValueRam = function(size, ship_size){
		var initPos = parseInt(Math.random() * (size - ship_size));
	  return initPos;
	};
	
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
	
	
	this.evalShot = function(pos) {
		var pos = pos.split(",");
        var x = parseInt(pos[0], 10);
        var y = parseInt(pos[1], 10);
		var val = this._field[x][y];
		if (val != '0') {
			var ship = this._ships[val];
			ship.getShot();
			this._field[x][y] = 'H';
			console.log(ship.status);
		}
		else {
			this._field[x][y] = 'F';
			console.log('FAIL');
		}
		this.drawn();
	};
	
	this.isAnyShipAlive = function() {
		for (var i = 1; i < this._ships.length; i++) {
			if (this._ships[i].status != 'KILL')
				return true;
		}
	};
	
	this._initField();
	this._initShips();
	this.drawn();
};
