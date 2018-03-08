$('#search-field').on('submit', function(e){
	e.preventDefault();
	$('.notify').remove();
});

// Removes notification box on click

const notification = function () {
	$('.okay').click(function(){
			$('.notify').css('opacity', '0').css('transition', '1.5s').css('z-index', '-1');
	})
	$('body').click(function(){
		$('.notify').css('opacity', '0').css('transition', '1.5s').css('z-index', '-1');
	})
}

// Return initial search results

function handleSearch(data){
	let output = data.results;
	if (output.length === 0) {
		$('.results-container').html('');
		$('body').append(`<div class="notify"><h2>Sorry. We didn't find that show. Please try another.</h2>
			<p class="okay"><strong>OK</strong></p></div>`);
		notification();
	} else {
		$('.results-container').html('');
	$('.main-head').css('margin-top', '0%').css('opacity', '0').css('z-index', '-3').css('transition', '1500ms');
	$('#search-field').css('margin-top', '-4%').css('transition', '1500ms');
	$('body').append(`<div class="notify"><h2>Please select which show you were looking for</h2><p class="okay"><strong>OK</strong></p></div>`);
	notification();
	for (let i = 0; i < output.length; i++) {
		let resultName = output[i].name;
		if (output[i].name.length > 15) {
				resultName = output[i].name.substring(0, 15) + '...';
		}
		$('.results-container').append(`<div class="result-item" name="${output[i].name}"> 
			 <p class="result-title">${resultName}</p><br>  
			<img id="${output[i].id}" alt="${resultName} image" src="https://image.tmdb.org/t/p/w200_and_h300_bestv2/${output[i].poster_path}"></div>`);
	}

	// Removes initial search results that don't have recommendations
	for (let k = 0; k < output.length; k++) {
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
		}
		emptyRecs();
	}
	$('.result-item img').click(recommendations);
}
	}
	
// Return recommendation results
function handleRec(data){
	let rec_output = data.results;
	$('.results-container').html('');
	$('body').append(`<div class="notify suggest"><h2>Here are some show suggestions</h2>
		<h3>Click an image for more info</h3>
		<p class="okay"><strong>OK</strong></p></div>`);
	notification();
	for (let j = 0; j < rec_output.length; j++) {
		let recName = rec_output[j].name;
		if (rec_output[j].name.length > 15) {
			recName = rec_output[j].name.substring(0,15) + '...';
		}
		$('.results-container').append(`<div id="${j}" class="rec-item">
			<p class="result-title">${recName}</p><br>
			<img alt="${recName} image" src="https://image.tmdb.org/t/p/w200_and_h300_bestv2/${rec_output[j].poster_path}"></div>`); 
	}	
	$('.rec-item').click(function(){
		let recItemID = $(this).attr('id');
		
		// Trailer videos

		function trailer(){
		  trailerQuery = rec_output[recItemID].name + ' trailer';
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
		    $('.trailer').append(`<a target="_blank" href="https://www.youtube.com/watch?v=${YTObject[0].id.videoId}">
		    	<img alt="${rec_output[recItemID].name} trailer video link" src="${YTObject[0].snippet.thumbnails.medium.url}"></a>`);
		    }

		    // Review videos

		    function review(){
		  reviewQuery = rec_output[recItemID].name + ' reviews';
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
		    $('.review').append(`<a target="_blank" href="https://www.youtube.com/watch?v=${YTReviewObject[0].id.videoId}">
		    	<img alt="${rec_output[recItemID].name} review video link" src="${YTReviewObject[0].snippet.thumbnails.medium.url}"></a>`);
		    }
		    let description = rec_output[recItemID].overview;
		    if (description.length > 815) {
		    		description = rec_output[recItemID].overview.substring(0,815) + '...';
		    }
		$('.results-container').append(`<div class="rec-details">
			<span class="close">&times;</span>
			<h1 class="rec-head">${rec_output[recItemID].name}</h1>
				<div class="rec-content">
					<div class="rec-intro">
					<h2 class="rating"><span>Rating:</span> <span class="rating-num">${rec_output[recItemID].vote_average * 10}%</span></h2>
					<img src="https://image.tmdb.org/t/p/w200_and_h300_bestv2/${rec_output[recItemID].poster_path}">
					</div>
					<div class="overview">
						<h2>Overview</h2> <p>${description}</p>
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
		}
		
		)
}