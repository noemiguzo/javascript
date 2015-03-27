//Frisby test
var frisby = require('frisby');
var baseURL= 'https://todo.ly/api';
frisby.globalSetup({
	request:{
		headers:{
			'Authorization': 'Basic bm9lbWk0ajdnQGdtYWlsLmNvbToyMDQwMTU4OGou'
		}
	}
});
frisby.create('Get the currentUserSpec')
	.get( 'https://todo.ly/api/user.json')
	.inspectJSON()
	.expectStatus(200)
	.expectJSON({
			Email: 'noemi4j7g@gmail.com'
	})
	
.toss();