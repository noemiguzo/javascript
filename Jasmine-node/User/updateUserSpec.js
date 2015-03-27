var frisby = require('frisby');
var baseURL= 'https://todo.ly/api';

frisby.globalSetup({
	request:{
		headers:{
			'Authorization': 'Basic bm9lbWk0ajdnQGdtYWlsLmNvbToyMDQwMTU4OGou'
		}
	}
});

var now = new Date();
var newName = "update name " +  now.getTime();	
var updateUser = {  
		"FullName": newName
	};	
/*
	Update full name user of the current user
*/
frisby.create('Update full name user')
	.put('https://todo.ly/api/user/0.json',updateUser,{json: true})
	.expectStatus(200)
	.inspectJSON()	
	.expectJSON({
		FullName: newName
	})	
.toss()