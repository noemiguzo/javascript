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
* Set Done all items of any project
*	Given  I have at least one project created in my account 
*	Select a project randomly
*	And I create  items for that project
*	And set Dome to all Items
*	Then all Items of the project should be set done
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
/* Set dome items by id project
*/
var setDoneItems = function(pId){
	
	//create items
	return frisby.create('set Dome to all Items')
		.get('https://todo.ly/api/projects/'+ pId + '/doneitems.json')
}

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
		}
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
			}
				
			//validation  the number of items should be increased
			console.log('And set Dome to all Items');
			setDoneItems(pId) //Then all Items of the project should be set done
			.expectJSON('*', {
				Checked: true
			}).toss()
		})	
		.toss()	
	})	
.toss()