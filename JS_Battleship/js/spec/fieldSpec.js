//field specs
/*
	Given I have a filed
	When I type  the shot 0,0  then the shots should be valid  
	When I type  the shot n-1,n-1. there n is size of the field
	When I type  the shot n-1,0 then the shots should be valid 
	When I type  the shot 0,n-1 then the shots should be valid	
	
*/
	var n;
	var field;
	var size;
	var ships;
	size=6;
	ships=[1,2,1];
	
describe('Field - valid shots scenario: ',function(){
			
	describe('Given I have a field', function(){
		field = new Field(size,ships);
		n=field.size;
		it('When I type  the shot 0,0  then the shots should be valid',function(){
			var validRes0=field.validationShot('0,0');
			expect(validRes0).toBe(true);
		});
		
		it('When I type  the shot n-1,n-1 then the shots should be valid',function(){
			var shotN= (n-1) + ',' + (n-1)
			var validResn = field.validationShot(shotN);
			expect(validResn).toBe(true);
		});
		it('When I type  the shot n-1,0 then the shots should be valid',function(){
			var shotN0= (n-1) + ',0' 
			var validResn0 = field.validationShot(shotN0);
			expect(validResn0).toBe(true);
		});
		it('When I type  the shot 0,n-1 then the shots should be valid',function(){
			var shot0N= '0,' + (n-1)
			var validRes0n = field.validationShot(shot0N);
			expect(validRes0n).toBe(true);
		});	
		
	});
});
/*
	Given I have a filed
	When I left empty field  then the shots should be invalid  
	When I type  the shot with letters then the shots should be invalid
	When I type  the shot n,n then the shots should be invalid 
	When I type  the shot n,0 then the shots should be invalid 
	When I type  the shot 0,n then the shots should be invalid	
	When I type  the shot -1,0 then the shots should be invalid
	When I type  the shot n then the shots should be invalid
*/
describe('Field - invalid shots scenario: ',function(){
	
	describe('Given I have a field', function(){
		field = new Field(size,ships);
		n=field.size;
		it('When I left empty field  then the shots should be invalid ',function(){
			var invalidRes=field.validationShot('');
			expect(invalidRes).toBe(false);
		});	
		it('When I type  the shot with letters then the shots should be invalid',function(){
					var validRes0=field.validationShot('shotwrong');
					expect(validRes0).toBe(false);
				});	
		it('When I type  the shot 0256  then the shots should be invalid',function(){
					var validRes0=field.validationShot('0256');
					expect(validRes0).toBe(false);
				});				
		it('When I type  the shot n,n then the shots should be invalid',function(){
			var shotN= n + ',' + n
			var invalidRes=field.validationShot(shotN);
			expect(invalidRes).toBe(false);
		});	
		it('When I type  the shot n,0 then the shots should be invalid ',function(){
			var shotN= n + ',0' ;
			var invalidRes=field.validationShot(shotN);
			expect(invalidRes).toBe(false);
		});	
		it('When I type  the shot 0,n then the shots should be invalid',function(){
			var shotN= '0,' + n ;
			var invalidRes=field.validationShot(shotN);
			expect(invalidRes).toBe(false);
		});	
		it('When I type  the shot -1,0 then the shots should be invalid',function(){
			var shot=  '-1,0' ;
			var invalidRes=field.validationShot(shot);
			expect(invalidRes).toBe(false);
		});	
		it('When I type  the shot n then the shots should be invalid',function(){
			var shotN=  n ;
			var invalidRes=field.validationShot(shotN);
			expect(invalidRes).toBe(false);
		});
	});
});
/*
	get random integer between
	when I give [0,2] range then I should get an integer between 0 and 1
	when I give [0,2] range  should get an integer between 0 and 2 but is invalid with greater that 2
*/
describe('Field - get random integers scenario: ',function(){
			
	describe('Given I have a field', function(){
		field = new Field(size,ships);
		n=field.size;
		it('when I give [0,2] range then should get an integer between 0 and 2',function(){
			var ramRes=field.getValueRam(0,2);
			expect(ramRes).toBeLessThan(2);
			expect(ramRes).toBeGreaterThan(0-2);
		});	
		/*it('when I give [0,2] range  should get an integer between 0 and 2 but is invalid with greater that 2',function(){
			var ramRes=field.getValueRam(2,10);
			expect(ramRes).toBeLessThan(2);
			expect(ramRes).toBeGreaterThan(0-2);
		});*/
	});
});
