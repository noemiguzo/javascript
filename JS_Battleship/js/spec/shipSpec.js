//ship spec

 var n;
	var field;
	var size;
	var ships;
	size="wrong-size";
	ships=[1,2,1];
	
describe('Field - valid shots scenario: ',function(){
			
	describe('Given I have a field', function(){
		ship = new Ship(size,ships);
		n=field.size;
		it('When size value are letters should be invalid',function(){
		  
			var validRes0=ship._initShips();
			expect(validRes0).toBe(false);
		});
		
		it('When size value are letters should be invalid',function(){
		    ships=[1,2,"Wrong-value"];
		    ship = new Ship(size,ships);
		  	var validRes0=ship._initShips();
			expect(validRes0).toBe(false);
		});
	});
});
