var frisby = require('frisby');
var baseURL= 'https://todo.ly/api';
frisby.globalSetup({
	request:{
		headers:{
			'Authorization': 'Basic bm9lbWk0ajdnQGdtYWlsLmNvbToyMDQwMTU4OGou'
		}
	}
});
//create a user
var user={
    Email: 'myqa201406w@email.com',
    FullName: 'Joe Blow qa',
	"Password": "pASswoRd"
};
var verifyUser={
    Email: 'myqa201405w@email.com',
    FullName: 'Joe Blow qa'
};
frisby.create('Create a new user')
	.post(baseURL + '/user.json',user, {json: true})
	.expectStatus(200)
	.expectJSON(verifyUser)
	.inspectJSON()
	.afterJSON(function(json){
		var newUserId = json.Id;
		console.log('NEW USER ID:', newUserId);		
		var updateUserInfo = {
			Email: "updateBy201405@email.com"
		};
		frisby.create('Update project')			
			.put('https://todo.ly/api/user/547994.json', updateUserInfo, {json: true})
			.put(baseURL + '/user/' + newUserId + '.json', updateUserInfo, {json: true})
			.expectStatus(200)
			.inspectJSON()					
		.toss();		
	})
.toss();
