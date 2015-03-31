//Negative
var frisby = require('frisby');

frisby.globalSetup({
    request: {
        headers: {
            'Authorization': 'Basic bm9lbWk0ajdnQGdtYWlsLmNvbToyMDQwMTU4OGou'
        },
        inspectOnFailure: true 
    }
});
/*
* Verify that is not possible add a item with invalid project id
*/

frisby.create('Verify that is not possible add a item with invalid project id')
    .post('https://todo.ly/api/items.json', {
            "Content": "testItem",
            "ProjectId": 100100},
            {json: true})
    .inspectJSON()
    .expectJSON({
        "ErrorMessage": "Invalid Project Id",
        "ErrorCode": 304
    })
.toss();