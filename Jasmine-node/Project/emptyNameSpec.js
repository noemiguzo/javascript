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
* Verify that it is not possible to add project with empty name
*/

var nameProject = {
            "Content": ""
};
frisby.create('Verify that it is not possible to add project with empty name')
        .post('https://todo.ly/api/projects.json', nameProject, {json: true})
        .inspectJSON()
        .expectJSON({
            "ErrorMessage": "Too Short Project Name",
            "ErrorCode": 305
        })
.toss();