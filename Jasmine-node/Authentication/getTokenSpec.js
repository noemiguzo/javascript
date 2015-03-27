//Frisby test
var frisby = require('frisby');
frisby.globalSetup({
	request:{
		headers:{
			'Authorization': 'Basic bm9lbWk0ajdnQGdtYWlsLmNvbToyMDQwMTU4OGou'
		},	
		
	}
});
/*Returns Token after authenticated with Basic Authentication. */
frisby.create('Get Token')
		.get('https://todo.ly/api/authentication/token.json')
		.expectStatus(200)									
		.inspectJSON()	
		.expectJSON({
			UserEmail: 'noemi4j7g@gmail.com'
		}) 
.toss();