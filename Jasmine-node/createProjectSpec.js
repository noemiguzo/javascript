//Frisby test
var frisby = require('frisby');
frisby.globalSetup({
	request:{
		headers:{
			'Authorization': 'Basic bm9lbWk0ajdnQGdtYWlsLmNvbToyMDQwMTU4OGou'
			
		},			
		inspectOnFailure: true
	}
});
/*
	create new projects
*/
var now = new Date();		
for (var i=0; i<2; i++){		
	
	var project={  
			Content: "New project "  + now.getTime() + i
	};
	frisby.create('Create project')
		.post('https://todo.ly/api/projects.json',project, {json: true})
		.expectStatus(200)	
		.inspectJSON()	
		.expectJSON(project)
	.toss();
}