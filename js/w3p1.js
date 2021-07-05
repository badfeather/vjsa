let quote = document.getElementById( 'quote' );
let button = document.getElementById('get-quote')
function randomRon() {
	fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes').then(function (response) {

		// If the response is successful, get the JSON
		if (response.ok) {
			return response.json();
		}

		// Otherwise, throw an error
		throw response.status;

	}).then(function (data) {
		// This is the JSON from our response
		//console.log(data);
		quote.innerText = data[0];
	}).catch(function (error) {
		// There was an error
		console.warn(error);
	});
}

randomRon();
button.addEventListener('click', randomRon);


