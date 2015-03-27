//Frisby test
var frisby = require('frisby');

/*
Returns whether the current request is Authenticated.
*/
frisby.create('IsAuthenticated')
		.get('https://todo.ly/api/authentication/isauthenticated.json')
		.expectStatus(200)									
		.inspectJSON()	
		
.toss();