// js_Battleship project
/* 
Game: Battleship/tanks
Requirements:
- Create the field (matrix N x N)
- Create X number of ships/tanks
- Request to user the “shot”
- Based user input, hit, kill or miss the shot
- User wins once he kills all the ships/tanks
*/


var boardSize;
var totalBoats;
BOATS = {"Cruiser": 2, "Submarine": 3};
var qCruiser;
var qSubmarine;
var qBoats = [];
HORIZONTAL = 0;
VERTICAL   = 1;

EMPTY_VAL = '0';
BOAT_VAL  = 'B';
HIT_VAL   = 'X';

function Boat( startCoord, orientation, length ) {

    this.startCoord = startCoord;
    this.orientation = orientation;
    this.length = length;
    this.boat = {};

    this.startX = function() {
        return startCoord[0];
    }

    this.startY = function() {
        return startCoord[1];
    }

    this.coordinates = function() {
        var coords = [];
        for(var i=0; i < length; i++) {
            if (orientation == HORIZONTAL) {
                coords.push([this.startX()+i, this.startY()]);
            } else {
                coords.push([this.startX(), this.startY()+i]);
            }
        }
        return coords;
	}

    /* Given a coordinate, return true if the coordinate overlaps the boat's position, false otherwise */
    this.isAt = function(coord) {
        var coords = this.coordinates();
        for(var i=0; i < coords.length; i++) {
            if (coord.toString() == coords[i].toString()) {
                return true;
            }
        }
        return false;
    }


    /* Initialize the status of the boat */
    var coords = this.coordinates();

    /* Use the stringed version of the coordinates to represent the boat's status at that position */
    for(var i=0; i<coords.length; i++) {
        var str = coords[i].toString();
        this.boat[str] = false;
    }

}

function Board(size) {

    this.size = size;
    this.grid = [];

    /* Given a grid size, initialize an empty grid */
    this.init = function() {
        for(var i=0; i<size; i++) {
            this.grid[i] = [];
            for(var j=0; j<size; j++) {
                this.grid[i][j] = 0;
            }
        }
    };

    /* Places a boat on the map */
    this.placeBoat = function(boat) {
        var coords = boat.coordinates();
		console.log ("> The length boat:  " + coords.length);
        for(var i=0; i<coords.length; i++) {	
			console.log ("> (x,y) : ("  + coords[i][0] + ',' + coords[i][1]  + ')');
            this.grid[coords[i][0]][coords[i][1]] = boat;
        }
		console.log("End of drawing the boat");
    }

    /* Given a coordinate, check to see if that coordinate contains a boat */
    this.hasBoat = function(coord) {
		console.log ("> Shot on (x,y) : ("  + coord[0] + ',' + coord[1]  + ')');
        if(typeof this.grid[coord[0]][coord[1]] == 'object') {
            return this.grid[coord[0]][coord[1]];
        }

        return false;
    };
	
    this.init();
}

var Player =function () {
    this.name = "Default";
	boardSize = Domsole.ask("Please enter the size matrix :")
    console.log("Creating matrix (" + boardSize + ' x ' + boardSize + ')');
    this.board = new Board(boardSize);
    this.boats = [];
	qCruiser = Domsole.ask("How many ships length 2?")
	qBoats [0]=qCruiser;
	qSubmarine = Domsole.ask("How many ships length 3?")
	qBoats [1]=qSubmarine;	
	console.log("Boats: " + qCruiser + " Cruiser , and " + qSubmarine + " Submarine." ); 
	
	 /* Function that takes a set of coordinates as an argument and returns a string with a status message */
    this.takeShotAt = function(coord) {
        var status  = "";
        var boat = this.board.hasBoat(coord);
        if(boat) {
            boat.takeHit(coord);
            if(boat.isSunk()) {
                status = "You sunk the boat!";
            } else {
                status = "Hit!";
            }
        } else {
            this.board.markAsMiss(coord);
            status = "Miss!";
        }

        return status;
    }
   

    /* Setup player - ask for name, prompt for inserting boats */
    this.setup = function() {
		var iq=0; // index to  qBoats[]
        this.name = Domsole.ask("What's your name, Player?")
        Domsole.write("Hi, " + this.name + " ,ready!.");
        for (var boat in BOATS) {
			for(var i=0; i<qBoats[iq]; i++) {
				if(BOATS.hasOwnProperty(boat)) {
					this.getBoat(boat);
				}
			}
			iq++;
        }
        Domsole.write("All done, " + this.name);
		
    }

    this.getBoat = function(boat) {
        var length = BOATS[boat];
        var text = Domsole.ask(
            "Place your " + boat + "(" + length + "): " + "(x y h/v) , For example: '2 2 v'");
		//make trim to remove spaces before and after the string
		text = text.trim(text);
        var pos = text.split(" ");
        var x = parseInt(pos[0], 10);
        var y = parseInt(pos[1], 10);
        var o;
        if (pos[2] == 'h') {
            o = HORIZONTAL;
        } else {
            o = VERTICAL;
        }
        var newBoat = new Boat([x, y], o, length);
        this.boats.push(newBoat);
        this.board.placeBoat(newBoat);
		
    }

	this.setup();
	
}


