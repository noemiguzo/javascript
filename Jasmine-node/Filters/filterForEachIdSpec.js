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
* Get item list filtering for each id filter
* 	Given I have the filter list
*   then I should get item list  of each  id filter
*/
var filterById= function(id){
	console.log ('filter with the given Id: ' + id)
	return frisby.create('Given I have the filter list')
	.get('https://todo.ly/api/filters/' + id +'/items.json')
	.expectStatus(200)
	.inspectJSON()		

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
	})	
.toss()