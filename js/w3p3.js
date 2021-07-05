let quote = document.querySelector('#quote');
let btn = document.querySelector('#get-quote');

let quotes = [];

async function getQuote() {
	try {
		let response = await fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
		if ( ! response.ok ) {
			throw response.status;
		}
		let data = await response.json();
		if ( quotes.length > 49 ) {
			quotes.shift();
		}
		if ( quotes.includes(data[0]) ) {
			getQuote();
			return;
		}
		quote.textContent = data[0];
		quotes.push(data[0]);

	} catch(error) {
		quote.innerText = 'Who broke Ron?';
		btn.disabled = true;
	}
}

getQuote();
btn.addEventListener( 'click', getQuote );