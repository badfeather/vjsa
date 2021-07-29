let Dice = (function () {
	let sides = [1, 2, 3, 4, 5, 6];
	
	/**
	 * Randomly shuffle an array
	 * https://stackoverflow.com/a/2450976/1293256
	 * @param  {Array} array The array to shuffle
	 * @return {String}      The first item in the shuffled array
	 */
	function shuffle(array) {
		let currentIndex = array.length;
		let temporaryValue, randomIndex;
	
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
	
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}

	/**
	 * Create an event listener
	 * @param  {Node}        btn      The button to attach the listener to
	 * @param  {Constructor} instance The current instantiation
	 */
	function createEventListener(btn, result) {
		function roll() {
			shuffle(sides);
			result.textContent = `You rolled a ${sides[0]}`;
		}

		// Listen for clicks on the button
		btn.addEventListener('click', roll);
	}

	/**
	 * The constructor object
	 * @param {String} selector The selector for the element to render into
	 */
	function Constructor(btnSelector, resultSelector) {
		let btn = document.querySelector(btnSelector);
		let result = document.querySelector(resultSelector);
		if ( !btn || !result ) return;	

		// Create the event listener
		createEventListener(btn, result);

		// Set properties
		Object.defineProperties(this, {			
			_btn: {value: btn},
			_result: {value: result},
		});
	}

	return Constructor;
})();

let dice = new Dice('#dice', '#result');

