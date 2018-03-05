$('#search-field').on('submit', function(e){
	e.preventDefault();
});

function handleSearch(data){
	let output = data.results;
	// console.log(output);
	$('.results-container').html('');
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

	// Remove results that don't have any recommendations
	// let showIDArr = [];
	for (let k = 0; k < output.length; k++) {
		// showIDArr.push(output[k].id);
		function emptyRecs(){
		$.get(
			'https://api.themoviedb.org/3/tv/'+ output[k].id + '/recommendations',
			{
				api_key: '08eba60ea81f9e9cf342c7fa3df07bb6',
			},
			handleNullRecs
			)
		}

		

		function handleNullRecs(e){
			let imgID = "#" + output[k].id;
			if (e.results.length === 0) {
				$(imgID).parent().remove();
			}
			// console.log(imgID);
		}
		emptyRecs();
	}
	// console.log(showIDArr);

	$('.result-item img').click(recommendations);
}



function handleRec(data){
	let rec_output = data.results;
	console.log(data);
		$('.results-container').html('');
// PLAN: When a user clicks on a link, return the recommendations of what they clicked on.
		for (let j = 0; j < rec_output.length; j++) {
			$('.results-container').append('<div id="' + j + '"' +  'class="rec-item">' + rec_output[j].name + "<br>" + 
				'<img src="https://image.tmdb.org/t/p/w200_and_h300_bestv2/' + rec_output[j].poster_path + '"></div>'); 
		}	

		$('.rec-item').click(function(){
			let recItemID = $(this).attr('id');
			function trailer(){
			  // Get form user input
			  trailerQuery = rec_output[recItemID].name + ' trailer';
			  // Run GET request
			  $.get(
			      "https://www.googleapis.com/youtube/v3/search", {
			        part: 'snippet',
			        q: trailerQuery,
			        type: 'video',
			        key: 'AIzaSyDemNg8jB3WCPzum-5Da7D5wrA7jgaNGAs'},
			      handleTrailer  
			    );
			}

			 function handleTrailer (vid) {
			    let YTObject = vid.items;
			    $('.trailer').append(`<a target="_blank" href="https://www.youtube.com/watch?v=${YTObject[0].id.videoId}"><img src="${YTObject[0].snippet.thumbnails.medium.url}"></a>`);
			    // console.log(YTObject);
			    }

			    function review(){
			  // Get form user input
			  reviewQuery = rec_output[recItemID].name + ' reviews';
			  // Run GET request
			  $.get(
			      "https://www.googleapis.com/youtube/v3/search", {
			        part: 'snippet',
			        q: reviewQuery,
			        type: 'video',
			        key: 'AIzaSyDemNg8jB3WCPzum-5Da7D5wrA7jgaNGAs'},
			      reviewTrailer  
			    );
			}

			 function reviewTrailer (vid) {
			    let YTReviewObject = vid.items;
			    $('.review').append(`<a target="_blank" href="https://www.youtube.com/watch?v=${YTReviewObject[0].id.videoId}"><img src="${YTReviewObject[0].snippet.thumbnails.medium.url}"></a>`);
			    console.log(YTReviewObject);
			    }
			$('.results-container').append(`<div class="rec-details">
				<span class="close">X</span>
				<h1 class="rec-head">${rec_output[recItemID].name}</h1>
					<div class="rec-content">
						<div class="rec-intro">
						<h2 class="rating">Rating: ${rec_output[recItemID].vote_average * 10}%</h2>
						<img src="https://image.tmdb.org/t/p/w200_and_h300_bestv2/${rec_output[recItemID].poster_path}">
						</div>
						<div class="overview">
							<h2>Overview:</h2> <p>${rec_output[recItemID].overview}</p>
							<div class="preview">
								<div class="trailer">
									<h2>Trailer</h2>
								</div>
								<div class="review">
									<h2>Reviews</h2>
								</div>
							</div>
						</div>
					</div>
				</div>`);
			trailer();
			review();
			// alert('rec-item');
			console.log($('.rec-head').val());
			$('.close').click(function(){
			$('.rec-details').remove();
			})
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