$('#search-field').on('submit', function(e){
	e.preventDefault();
});

function handleSearch(data){
	let output = data.results;
	// console.log(output);
	$('.results-container').html('');
	for (let i = 0; i < output.length; i++) {
		$('.results-container').append('<div class="result-item">' + output[i].name + "<br>" + 
			'<a ' + 'class="result-link' + i + '"' + 'href="https://api.themoviedb.org/3/tv/' + output[i].id + '/recommendations?api_key=08eba60ea81f9e9cf342c7fa3df07bb6&language=en-US">' + 
			'<img src="https://image.tmdb.org/t/p/w200_and_h300_bestv2/' + output[i].poster_path + '"></a></div>');
	// if the image equals null, do not display it. 
	// if the title does not have the search query in the name of the result, do not display it.
	// if title exceeds a certain number of characters, cut the title off. It messes with styling.
	// if total results of recommendations for a title is zero, do not display it. OR
		// Display an error message saying that recommendations could not be found.
		// Need to have a way to access total results before adding a link in order to not display image 
		// that don't have recommendations
	}
}

function getRec(data){
	let rec_output = data.results;
	console.log(rec_output);
	console.log(output);
	// for (let j = 0; j ) {

	// }
}

function recommendations(){
	$.get(
		'https://api.themoviedb.org/3/tv/4303/recommendations',
		{
			api_key: '08eba60ea81f9e9cf342c7fa3df07bb6',
		},
		getRec
		)
}

function initialSearch(){
	let queryStr = $('#query').val();

	$.get(
		'https://api.themoviedb.org/3/search/tv', 
		{
			api_key: '08eba60ea81f9e9cf342c7fa3df07bb6',
			query: queryStr
		},
		function getRequests(data){
			handleSearch(data);
			recommendations(data);	
		}
		
		)
}