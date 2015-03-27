var frisby = require('frisby');
var baseURL= 'https://todo.ly/api';
frisby.globalSetup({
	request:{
		headers:{
			'Authorization': 'Basic bm9lbWk0ajdnQGdtYWlsLmNvbToyMDQwMTU4OGou'
		}
	}
});
//proxy: 'http://172.20.240.5:8080',
frisby.create('Test todo main page')
	.get('https://todo.ly')
	.expectStatus(200)
.toss();
/*
CRUD to project
	Create a new project
	Read all projects
	Update the project
	Delete the project by Id
	
*/
//Create project
var project={
    "Content": "My New Project- frisby"
};
frisby.create('Create new project')
	.post(baseURL +'/projects.json', project, {json: true})
	.expectJSON(project)
	.expectJSONTypes({
		Id: Number
	})
	.inspectJSON()		
	.afterJSON(function(json){
		//get the new project Id
		var newProjectId = json.Id;
		console.log('NEW PROJECT ID:', newProjectId);
		//list all project 
		frisby.create('Validation  when getting all projects')
			.get(baseURL + '/projects.json')
			.expectStatus(200)
			.afterJSON(function(json){
				expect(json.length).toBeGreaterThan(0);
			})
			.inspectJSON()
		.toss();
		//end read project
		//update project
		var updateProjectInfo = {
			"Content": "update by frisby"
		};
		console.log('Updating project');
		frisby.create('Update project')
			.put(baseURL + '/projects/' + newProjectId + '.json', updateProjectInfo, {json: true})
			.expectJSON(updateProjectInfo)
			.inspectJSON()	
			//delete project by Id
			.afterJSON(function(json){	
				console.log('Deleting the project')
				frisby.create('Delete project')
					.delete(baseURL + '/projects/' + newProjectId + '.json', {}, {json: true})
					.expectJSON({
						Deleted: true
					})
				.toss();
			})
		.toss();		
	})
.toss();




