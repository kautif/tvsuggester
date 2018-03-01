$('#search-field').on('submit', function(e){
	e.preventDefault();
});

function handleSearch(data){
	let output = data.results;
	console.log(output);
	for (let i = 0; i < output.length; i++) {
		$('.results-container').append('<img src="https://image.tmdb.org/t/p/w200_and_h300_bestv2/' + output[i].poster_path + '">');
		$('.results-container').append(output[i].name + "<br>");
	}


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