//Negative
var frisby = require('frisby');
/*
*Verify that an error message is displayed when trying to add an user with invalid email 
*/
frisby.create('Verify that an error message is displayed when trying to add an user with invalid email ')
    .post('https://todo.ly/api/user.json',{
            "Emai": "testItem"},
            {json: true})
    .inspectJSON()
    .expectJSON({
        "ErrorMessage": "Invalid Email Address",
        "ErrorCode": 307
    })
.toss();