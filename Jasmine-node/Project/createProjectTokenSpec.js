
/*
* create a project  with Token Authentication
*
*/

var frisby = require('frisby');

frisby.create('Verify that the user is authenticated')
    .get('https://todo.ly/api/authentication/isauthenticated.json')
    .inspectJSON()
    .addHeaders({'Authorization': 'Basic bm9lbWk0ajdnQGdtYWlsLmNvbToyMDQwMTU4OGou'}) //Basic Auth
    .expectJSONTypes(true)
    .expectStatus(200)
    .afterJSON(function(json){
        frisby.create('Verify get Token')
            .get('https://todo.ly/api/authentication/token.json')
            .inspectJSON()
            .addHeaders({'Authorization': 'Basic bm9lbWk0ajdnQGdtYWlsLmNvbToyMDQwMTU4OGou'})
            .expectJSON({
                TokenString: String})
            .expectStatus(200)
            .afterJSON(function(token){
                var Token=token.TokenString;
                console.log(Token,"--Token is gotten");
                var Proyect = {
                    "Content": "ProyectToken "
                };
                frisby.create('Create Proyect with token')
                    .post('https://todo.ly/api/projects.json', Proyect, {json: true})
                    .inspectJSON()
                    .addHeaders({'Token': Token})//Token for create Project
                    .expectJSON(Proyect)
                    .expectStatus(200)
                    .afterJSON(function(resProyect){
                        console.log( "Project Created with Token: " , resProyect.Content);
                    })
                    .toss();
            })
            .toss();
    })
    .toss();
