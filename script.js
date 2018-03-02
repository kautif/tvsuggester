$('#search-field').on('submit', function(e){
	e.preventDefault();
});

function handleSearch(data){
	let output = data.results;
	console.log(output);
	$('.results-container').html('');
	for (let i = 0; i < output.length; i++) {
		$('.results-container').append('<div class="result-item">' + output[i].name + "<br>" + 
			'<a ' + 'id="result-link' + i + '"' + 'href="https://api.themoviedb.org/3/tv/' + output[i].id + '/recommendations?api_key=08eba60ea81f9e9cf342c7fa3df07bb6&language=en-US">' + 
			'<img src="https://image.tmdb.org/t/p/w200_and_h300_bestv2/' + output[i].poster_path + '"></a></div>');
	// build into functionality that if the image equals null, do not display it. 
	// build into functionality that if title exceeds a certain number of characters, cut the title off. It messes with styling.
	}


}

// function recommendations(){
// 	$.get(
// 		'https://api.themoviedb.org/3/tv',
// 		{
// 			api_key: '08eba60ea81f9e9cf342c7fa3df07bb6',
// 		}
// 		)
// }

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