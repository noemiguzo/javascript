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
* Returns the list of all Filters of the Authenticated user
*/
frisby.create('list of all Filters')
	.get('https://todo.ly/api/filters.json')
	.expectStatus(200)
	.inspectJSON()	
	.afterJSON(function(json){
		var size=json.length;
		expect(size).toBeGreaterThan(0);
	})	
.toss()