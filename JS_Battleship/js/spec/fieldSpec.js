//field specs
/*
	field
	Given I have a filed
	When I type  a valid shot 0,0
	and I type  a valid shot n-1,n-1. there n is size of the field
	and I type  a valid shot n-1,0
	and I type  a valid shot 0,n-1
	Then the shots should be valid
	
*/
describe('Field scenario: valid shots',function(){
	var field;
	var n=6;
	var ships=[2,2,1];

	describe('Given I have a field', function(){
		field = new Field(n,ships);
		it('When I validation a valid shot 0,0',function(){
			validRes0=field.validationShot('0,0');
			expect(validRes0).toBe(true);
		});		
		it('and I validation a valid shot n-1,n-1',function(){
			var shotN= (n-1) + ',' + (n-1)
			validResn = field.validationShot(shotN);
			expect(validResn).toBe(true);
		});
		it('and I type  a valid shot n-1,0',function(){
			var shotN0= (n-1) + ',' + (n-1)
			validResn0 = field.validationShot(shotN0);
			expect(validResn0).toBe(true);
		});
		it('and I type  a valid shot 0,n-1',function(){
			var shot0N= (n-1) + ',' + (n-1)
			validRes0n = field.validationShot(shot0N);
			expect(validRes0n).toBe(true);
		});
		it('Then the shots should be valid',function(){
			expect(validRes0).toBe(true);
			expect(validResn).toBe(true);
			expect(validResn0).toBe(true);
			expect(validRes0n).toBe(true);
		});		
		
	});
});