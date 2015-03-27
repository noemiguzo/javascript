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
/*
 the id project is increased by one 
	Given the list of the projects
	Get the last id project
	And I create a new project
	Then the new id project should be increased by one	

*/
/* create a new project
*/

var createProject = function(){
	var project={  
		Content: "New project to JS"
	};					
	return frisby.create('Create project')
		.post('https://todo.ly/api/projects.json',project,{json: true})
		.expectStatus(200)	
		.inspectJSON()		

						
};
//make sure that I get the last idproject ,creating it.
createProject().toss();
frisby.create('Given I don\t have any project created in my account ')
	.get('https://todo.ly/api/projects.json')
	.expectStatus(200)
	.inspectJSON()	
	.afterJSON(function(json){
		
		var size=json.length;
		console.log ('nº of projects ' + size);	
		var lastId=(json[size - 1].Id);
		console.log (' get the last id project' + lastId );
		createProject().afterJSON(function(json){
				expect(json.Id).toBe(lastId +1);
			}).toss()	

				
	})	
.toss()
