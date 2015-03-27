//Frisby test
var frisby = require('frisby');
frisby.globalSetup({
	request:{
		headers:{
			'Authorization': 'Basic bm9lbWk0ajdnQGdtYWlsLmNvbToyMDQwMTU4OGou'
		},	
		
	}
});
/*
* Set Done Items the filter that list more one item	
* 	Given I have the filter list
*   Set Done Items the filter that list 	
*   Then I should get all items done
*/
var filterById= function(id){
	console.log ('filter with the given Id: ' + id)
	return frisby.create('Given I have the filter list')
	.get('https://todo.ly/api/filters/' + id +'/items.json')
	.expectStatus(200)	
	.afterJSON(function(json){
		// Set Done Items the filter that list 
			frisby.create('Set Done Items the filter that list more one item')
			.get('https://todo.ly/api/filters/' + id +'/doneitems.json')
			.expectStatus(200)
			.inspectJSON()
				
		.toss()
		
	})		

};
frisby.create('Given I have the filter list')
	.get('https://todo.ly/api/filters.json')
	.expectStatus(200)
	.inspectJSON()	
	.afterJSON(function(json){
		var size=json.length;
		expect(size).toBeGreaterThan(0);
		for (i=0 ; i <size ; i ++){
			filterById(json[i].Id).toss();
		};
		//validation
		/*frisby.create('Then I should get all items don')
			.get('https://todo.ly/api/items.json')
			.expectStatus(200)
			.inspectJSON()	
			.expectJSON('*',{
				Checked: true
			})	
		.toss()*/
	})	
.toss()