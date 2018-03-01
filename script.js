$('#search-field').on('submit', function(e){
	e.preventDefault();
});

function handleSearch(data){
	let output = data.results;
	console.log(output);
}

function initialSearch(){
	let queryStr = $('#query').val();

	$.get(
		'https://api.themoviedb.org/3/search/tv', 
		{
			api_key: '08eba60ea81f9e9cf342c7fa3df07bb6',
			query: queryStr
		},
		handleSearch
		)
}