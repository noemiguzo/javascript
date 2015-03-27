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
All items form a project has same projectId value
	Given I don't have any project created in my account 
	When I create a project
	And I create 2 items for that project
	Then those items belong to the created project
	
*/
var newId;
var createItem = function(pId,n){
	var item={  
		"Content": "new item nº " + n,
		"ProjectId": pId
	};	
	//create items
	return frisby.create('Create items')
		.post('https://todo.ly/api/items.json',item, {json: true})
		.expectStatus(200)
}
var createProject = function(){
	var project={  
		Content: "New firsby project "
	};					
	return frisby.create('Create project')
		.post('https://todo.ly/api/projects.json',project,{json: true})
		.expectStatus(200)										
		.afterJSON(function(json){
			newId=(json.Id);
			console.log ('new Id Project:'+ newId);
			for (var i=1; i<=2; i++){
				createItem(newId,i).expectStatus(200).toss();		
			}
		console.log('Geting the items');
		valication().toss();
	})
						
};
var valication = function(){
	return frisby.create('Create project')
		.get('https://todo.ly/api/items.json')
		.expectStatus(200)									
		.inspectJSON()	
		.expectJSON('*',{
			ProjectId: newId
		})
		
}

frisby.create('Given I don\t have any project created in my account ')
	.get('https://todo.ly/api/projects.json')
	.expectStatus(200)
	.afterJSON(function(json){
		var size=json.length;
		var deleteCount=0;
		console.log ('nº of projects ' + size);
		for ( var i= 0 ; i<size; i++){
			var pId=(json[i].Id);
			console.log ('deleted project Id::: ' + pId);			
			frisby.create('deleting the project')
				.delete('https://todo.ly/api/projects/'+ pId+'.json', {json: true})
				.expectStatus(200)	
				.expectJSON({
					Deleted: true
				})
				.afterJSON(function(data){
					deleteCount++;
					if (deleteCount == size){
						createProject().expectStatus(200).toss();					
					}
				})
			.toss();			
		};
		//in the case zero project	
		if (size==0){
			createProject().expectStatus(200).toss();
		}		
	})	
.toss()