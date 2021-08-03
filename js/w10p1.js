let Dice = (function () {
	/**
	 * Randomly shuffle an array
	 * https://stackoverflow.com/a/2450976/1293256
	 * @param {array} array - the array to shuffle
	 * @return {string} the first item in the shuffled array
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
	
	function rollDie(instance) {
		let sidesArrCpy = Array.from(instance.sidesArr);
		shuffle(sidesArrCpy);
		instance.result.textContent = instance.message.replace('{{roll}}', sidesArrCpy[0]);
	}

	/**
	 * Create the event listener
	 * @param {object} instance - The current instantiation
	 */
	function createEventListener(instance) {
		function roll() {
			rollDie(instance);
		}

		// Listen for clicks on the button
		instance.dice.addEventListener('click', roll);
	}

	/**
	 * The Constructor object
	 * @param {String} dice    Selector for the button to roll the dice
	 * @param {String} result  Selector for the element to render the results into
	 * @param {Object} options Options and settings for the library
	 */
	function Constructor(dice, result, options = {}) {

		// DOM elements
		let diceEl = document.querySelector(dice);
		let resultEl = document.querySelector(result);

		// Make sure elements exist
		if (!diceEl || !resultEl) throw 'Dice and result elements must be provided.';

		// Merge user options into defaults
		let {sides, message} = Object.assign({
			sides: 6,
			message: `You rolled a {{roll}}.`
		}, options);
		
		// Create sides of the dice
		let sidesArr = Array.from(new Array(sides)).map(function (item, index) {
			return index + 1;
		});

		// Create properties
		Object.defineProperties(this, {
			dice: {value: diceEl},
			result: {value: resultEl},
			sides: {value: sides},
			message: {value: message},
			sidesArr: {value: sidesArr}			
		});

		// Listen for clicks
		createEventListener(this);
	}
	
	Constructor.prototype.roll = function() {
		rollDie(this);
	};
	
	return Constructor;
})();

let d4 = new Dice('#d4', '#result', {
	message: 'D4 roll: {{roll}}',
	sides: 4
});

let d6 = new Dice('#d6', '#result', {
	message: 'D6 roll: {{roll}}'
});

let d8 = new Dice('#d8', '#result', {
	message: 'D8 roll: {{roll}}',
	sides: 8
});

let d12 = new Dice('#d12', '#result', {
	message: 'D12 roll: {{roll}}',
	sides: 12
});

let d20 = new Dice('#d20', '#result', {
	message: 'D20 roll: {{roll}}',
	sides: 20
});

//test roll
d20.roll();
