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

The number of items should be increased when a new item is added to the first project 
	Given I have more that one project 
	Select the first project
	And I create 1 items for that project
	Then the number of items should be increased
*/
var createProject = function(){
	var project={  
		Content: "new project "
	};					
	return frisby.create('Create project')
		.post('https://todo.ly/api/projects.json',project,{json: true})
		.expectStatus(200)										
						
};
var createItem = function(pId,n){
	var item={  
		"Content": "new item to first project" ,
		"ProjectId": pId
	};	
	//create items
	return frisby.create('Create items')
		.post('https://todo.ly/api/items.json',item, {json: true})
}
/* get a project by ID
*/
var getProjectbyId = function(Id){
		return frisby.create('Get project by Id')
		.get('https://todo.ly/api/projects/' + Id + '.json')
		.expectStatus(200)	
		.inspectJSON()
	
}

frisby.create('Given I have more that one project ')
	.get('https://todo.ly/api/projects.json')
	.expectStatus(200)
	.afterJSON(function(json){
		var size=json.length;
		//verify that exits more that one project
		if (size<2) {
			for (i=0 ; i<2 ; i++){
				createProject().toss();	
			}
		}
		//get the fist project
		frisby.create('Select the first project')
		.get('https://todo.ly/api/projects.json')
		.expectStatus(200) 
		.afterJSON(function(json){
			//get the id and the itemscount of the first project
			var pId=(json[0].Id);
			var currentItemsCount=(json[0].ItemsCount);
			//adding an item in the first project
			createItem(pId).expectStatus(200).toss();	
			//validation  the number of items should be increased
			console.log('validation  the number of items should be increased');
			getProjectbyId(pId).afterJSON(function(json){
				expect(json.ItemsCount).toBe(currentItemsCount +1);
			}).toss()
		})	
		.toss()	
	})	
.toss()