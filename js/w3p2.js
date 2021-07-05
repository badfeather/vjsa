(function () {
	let endpoint = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';
	let quote = document.getElementById( 'quote' );
	let button = document.getElementById('get-quote');
	if ( ! quote || ! button ) {
		return;
	}
	let quotes = [];
	let fails = 0;
	let failsLimit = 10;
	let quotesLimit = 50;
	
	function uniqueRon(data) {
		if ( quotes.includes( data[0] ) ) {
			console.log('Already said this.');
			fails++;
			if ( fails < failsLimit ) {
				fetchQuote();
			} else {
				console.log( 'Attempts limit reached' );
				quote.innerText = 'I have nothing more to say.';
				button.disabled = true;
				button.innerText = 'No More Ron';
			}
		} else {
			// reset fails counter
			fails = 0;
			// limit quotes length to 50
			if ( quotes.length > quotesLimit ) {
				console.log( 'Quotes array length is over the limit. Removing First.' );
				quotes.shift();
			}
			quotes.push( data[0] );
			quote.innerText = data[0];
		}
	}
		
	function fetchQuote() {
		fetch( endpoint )
			.then( function( response ) {
				if ( response.ok ) {
					return response.json();
				}
				throw response.status;
			})
			.then( uniqueRon )
			.catch( function( error ) {
				//console.warn( error );
				quote.innerText = 'Who broke Ron?';	 
				button.disabled = true;
				button.innerText = 'Shh';
			});
	}
	
	fetchQuote();
	button.addEventListener( 'click', fetchQuote );
})();


