//Frisby test
var frisby = require('frisby');
frisby.globalSetup({
	request:{
		headers:{
			'Authorization': 'Basic bm9lbWk0ajdnQGdtYWlsLmNvbToyMDQwMTU4OGou'
		},	
		
	}
});
/*

Get any project by Id
*/
var createProject = function(){
	var project={  
		Content: "new project "
	};					
	return frisby.create('Create project')
		.post('https://todo.ly/api/projects.json',project,{json: true})
		.expectStatus(200)										
						
};

/* create items*/
var createItem = function(pId,n){
	var item={  
		"Content": "new item to project " + n ,
		"ProjectId": pId
	};	
	//create items
	return frisby.create('Create items')
		.post('https://todo.ly/api/items.json',item, {json: true})
}
/* Get the any project by id project 
* Given  I have at least one project created in my account
* Select a project randomly	
* And I create  items for that project
* Get project by Id
* Then the first project should be displayed
*/
frisby.create('Given  I have at least one project created in my account  ')
	.get('https://todo.ly/api/projects.json')
	.expectStatus(200)
	.afterJSON(function(json){
		var size=json.length;
		//verify that exits more that one project
		if (size<2) {
			for (i=0 ; i<2 ; i++){
				createProject().toss();	
			}
		};
		//get the fist project
		frisby.create('Select a project randomly')
		.get('https://todo.ly/api/projects.json')
		.expectStatus(200) 
		.afterJSON(function(json){
			var randomProject=Math.floor(Math.random() * json.length);
			//get the id and  of any project			
			var pId=(json[randomProject].Id);
			
			console.log('And I create  items for that project');
			
			//adding new items in the first project
			for (i=0 ; i<3 ; i++){
				createItem(pId,i).expectStatus(200).toss();
			};				
				frisby.create('Get project by Id')
				.get('https://todo.ly/api/projects/' + pId + '.json')
				.expectStatus(200)	
				.inspectJSON()
				.toss();
			})	
		
		.toss()	
	})	
.toss()