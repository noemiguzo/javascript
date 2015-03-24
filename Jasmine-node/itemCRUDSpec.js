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

CRUD to item
	Given a new project  with item
	Select the a project
	And I create 3 items for that project
	Update a item to done
	Delete a item
	Then the project should have 2 project , one of them done
*/

var createItem = function(pId,n){
	var item={  
		"Content": "new item for new project" ,
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
/* update , delete item by ID project
*/
var ItemCRUDByIdproject = function(Id){
		return frisby.create('Get project by Id') 
		//get items of project
		.get('https://todo.ly/api/projects/' + Id + '/items.json')
		.expectStatus(200)	
		.afterJSON(function(json){
			//update the first item
			var updateitem={  
				Content: "update by frisby ",
				Priority: 1,
				Checked: true
			}; 
			frisby.create('Update item with ID:' + json[0].Id)
				.put('https://todo.ly/api/items/' + json[0].Id + '.json',updateitem,{json: true})
				.expectStatus(200)			
				.expectJSON(updateitem)
			.toss();
			//delete the second item item
			frisby.create('Delete project with ID:' + json[1].Id)
				.delete('https://todo.ly/api/items/' + json[1].Id + '.json')
				.expectStatus(200)				
				.expectJSON({
					ProjectId: Id
				})
			.toss();
		})	
}
var project={  
		Content: "new project to item  by frisby  "
	};	
frisby.create('Given a new peoject ')		
	.post('https://todo.ly/api/projects.json',project,{json: true})
	.expectStatus(200)	
	.afterJSON(function(json){
		//get the id and the itemscount of the  project
		var pId=(json.Id);
		var currentItemsCount=(json.ItemsCount);
		//adding 3 item in the first project
		for (i=0; i<3; i++){
			createItem(pId).expectStatus(200).toss();
		}
		console.log('validation  the number of items should be increased');
		getProjectbyId(pId).afterJSON(function(json){
			expect(json.ItemsCount).toBe(currentItemsCount +3);
		}).toss()
		//Set dome a item , and delete
		ItemCRUDByIdproject(pId).toss();
		//read the items by id project
		frisby.create('Get project by Id') 
			//get items of the project
			.get('https://todo.ly/api/projects/' + pId + '/items.json')
			.expectStatus(200)	
			.expectJSON({
					ProjectId: pId
			}) //verify that one is done
			.expectJSON('?', {
				Checked: true
			})
			//verify that now the project have 2 items
			.afterJSON(function(json){ 
				expect(json.length).toBe(2);
			})
	})	
.toss()

