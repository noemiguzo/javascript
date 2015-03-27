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
 the default id project of the current user is least to the new id project
	Given a user is authentication
	And I get the default id project
	And I create a new project
	Then the default id project is less to new  id project
	

*/
/* get a project by ID
*/
var getProjectbyId = function(Id){
		return frisby.create('Get project by Id')
		.get('https://todo.ly/api/projects/' + Id + '.json')		
	
	
}
var createProject = function(){
	var project={  
		Content: "New project to current user"
	};					
	return frisby.create('Create project')
		.post('https://todo.ly/api/projects.json',project,{json: true})
		.expectStatus(200)	
		.inspectJSON()		

						
};
frisby.create('Given a user is authentication')
	.get( 'https://todo.ly/api/user.json')
	.inspectJSON()
	.expectStatus(200)
	.expectJSON({
		Email: 'noemi4j7g@gmail.com'
	})
	.afterJSON(function(data){
		console.log('And I get the default id project');
		var defaultId = data.DefaultProjectId;
		console.log ('And I get the default id project');	
		console.log (' the default project is:' + defaultId);
		createProject()
		.afterJSON(function(json){
			var newId = json.Id
			console.log (' the new id project is:' + newId);
			expect(newId).toBeGreaterThan(defaultId);
		})
		.toss();	
					
	})
.toss();