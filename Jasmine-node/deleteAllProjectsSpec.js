var frisby = require('frisby');
var baseURL= 'https://todo.ly/api';
frisby.globalSetup({
	request:{
		headers:{
			'Authorization': 'Basic bm9lbWk0ajdnQGdtYWlsLmNvbToyMDQwMTU4OGou'
		}
	}
});
frisby.create('Get all non-deleted projects')
	.get('https://todo.ly/api/projects.json')
	.inspectJSON()
	.expectStatus(200)
	.expectJSON('*', {
		Deleted: false
	})
	.afterJSON(function(responseData){
		// LOOP to delete all project
		for(var i = 0; i < responseData.length; i++) {
			frisby.create('Delete proect with ID:' + responseData[i].Id)
				.delete('https://todo.ly/api/projects/' + responseData[i].Id + '.json')
				.expectStatus(200)
				.expectJSON({
					Deleted: true
				})
			.toss();
		}
	})
.toss();