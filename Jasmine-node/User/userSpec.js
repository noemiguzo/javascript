var frisby = require('frisby');
var baseURL= 'https://todo.ly/api';

//create a user
var now = new Date();	

var user={
    Email: 'myqa' + now.getTime() +'@email.com',
    FullName: 'Joe qa',
	"Password": "pASswoRd"
};
var verifyUser={
    Email: 'myqa' + now.getTime() + '@email.com',
    FullName: 'Joe qa'
};
frisby.create('Create a new user')
	.post(baseURL + '/user.json',user, {json: true})
	.expectStatus(200)
	.expectJSON(verifyUser)
	.inspectJSON()
.toss();
