//Negative
var frisby = require('frisby');
/*
* Verify that an error message is displayed when trying to add an user with empty data as parameter
*/
frisby.create('Verify that an error message is displayed when trying to add an user with empty data as parameter')
    .post('https://todo.ly/api/user.json',"",{json: true})
    .inspectJSON()
    .expectJSON({
        "ErrorMessage": "Invalid input Data",
        "ErrorCode": 302
    })
.toss();