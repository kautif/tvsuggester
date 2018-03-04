$('#search-field').on('submit', function(e){
	e.preventDefault();
});

function handleSearch(data){
	let output = data.results;
	// console.log(output);
	$('.results-container').html('');
	let getURLs = [];
	for (let i = 0; i < output.length; i++) {
		$('.results-container').append('<div class="result-item"' + 'name="' + output[i].name + '"' + '>' + output[i].name + "<br>" + 
			// '<a ' + 'href="https://api.themoviedb.org/3/tv/' + output[i].id + '/recommendations?api_key=08eba60ea81f9e9cf342c7fa3df07bb6&language=en-US">' + 
			'<img id="' + output[i].id + '" src="https://image.tmdb.org/t/p/w200_and_h300_bestv2/' + output[i].poster_path + '">' + '</div>');
		
	// if the image equals null, do not display it. 
	// if the title does not have the search query in the name of the result, do not display it.
	// if title exceeds a certain number of characters, cut the title off. It messes with styling.
	// if total results of recommendations for a title is zero, do not display it. OR
		// Display an error message saying that recommendations could not be found.
		// Need to have a way to access total results before adding a link in order to not display image 
		// that don't have recommendations
	}
	$('.result-item img').click(recommendations);
	// console.log(getURLs);
}

function handleRec(data){
	let rec_output = data.results;
	console.log(rec_output);
		$('.results-container').html('');
// PLAN: When a user clicks on a link, return the recommendations of what they clicked on.
		for (let j = 0; j < rec_output.length; j++) {
			$('.results-container').append('<div class="rec-item">' + rec_output[j].name + "<br>" + 
				'<img src="https://image.tmdb.org/t/p/w200_and_h300_bestv2/' + rec_output[j].poster_path + '"></div>'); 
		}	

		$('.rec-item').click(function(){
			$('.results-container').append('<div class="rec-details">f</div>');
			alert('rec-item');
		})

		$('.container').click(function(e){
			// $('.rec-details').remove();
			// alert('container');
		})
}

function recommendations(e){
	$.get(
		'https://api.themoviedb.org/3/tv/'+ parseInt(e.currentTarget.id) + '/recommendations',
		{
			api_key: '08eba60ea81f9e9cf342c7fa3df07bb6',
		},
		handleRec
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
			// recommendations(data);
		}
		
		)
}