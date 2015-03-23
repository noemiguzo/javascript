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

After delete a items of a project the number of items is decreased
	Given I have more that one project 
	Select the a project with more than one items
	And I delete a item
	Then the number of items should be decreased
*/
var createProject = function(){
	var project={  
		Content: "new project "
	};					
	return frisby.create('Create project')
		.post('https://todo.ly/api/projects.json',project,{json: true})
		.expectStatus(200)	
		.afterJSON(function(json){
			var pId=(json.Id);
			for (i=1 ;i< 3 ; i++){				
				createItem(pId,i).toss();	
			}
		})
						
};
var createItem = function(pId,n){
	var item={  
		"Content": "new item ..." ,
		"ProjectId": pId
	};	
	//create items
	return frisby.create('Create items')
		.post('https://todo.ly/api/items.json',item, {json: true})
		.expectStatus(200)
}
/* delete an item by ID project
*/
var deleteItemByIdproject = function(Id){
		return frisby.create('Get project by Id') 
		//get items of project
		.get('https://todo.ly/api/projects/' + Id + '/items.json')
		.expectStatus(200)	
		.afterJSON(function(json){
			var nitems=json.length;
			//delete item
			frisby.create('Delete proect with ID:' + json[0].Id)
				.delete('https://todo.ly/api/items/' + json[0].Id + '.json')
				.expectStatus(200)
				.inspectJSON()
				.expectJSON({
					ProjectId: Id
				})
			.toss();
		})	
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
		for (i=0 ; i<2 ; i++){
			//create new projects with items
			createProject().toss();	
		}		
		//get the fist project
		frisby.create('Select the a project')
		.get('https://todo.ly/api/projects.json')
		.expectStatus(200) 
		.afterJSON(function(json){
			console.log('select a project with more that one item')
			var nProjects=json.length;
			for (i=0 ; i<nProjects; i ++){
				//ask if it has more than one item
				if (json[i].ItemsCount>1){
					//get the id and the itemscount of the  project
					var pId=(json[i].Id);
					var currentItemsCount=(json[i].ItemsCount);
					break;
				}				
			}
			//delete an item of the selected project
			deleteItemByIdproject(pId)
				.afterJSON(function(json){
					getProjectbyId(pId).afterJSON(function(json){
						//verify that the number of items should be decreased
						expect(json.ItemsCount).toBe(currentItemsCount -1);
					}).toss()
				})
			.toss();
		})	
		.toss()	
	})	
.toss()