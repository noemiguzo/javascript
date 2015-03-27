//Frisby test
var frisby = require('frisby');
frisby.globalSetup({
	request:{
		headers:{
			'Authorization': 'Basic bm9lbWk0ajdnQGdtYWlsLmNvbToyMDQwMTU4OGou'
		},	
		
	}
});
/*Deletes the Token that is sent in the HTTP Header. */
frisby.create('Delete Token')
		.delete('https://todo.ly/api/authentication/token.json')
		.expectStatus(200)									
		.inspectJSON()			
.toss();