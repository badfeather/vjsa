let Dice = (function () {
	/**
	 * Randomly shuffle an array
	 * https://stackoverflow.com/a/2450976/1293256
	 * @param {array} array - The array to shuffle
	 * @return {string} - The first item in the shuffled array
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
	 * Create the event listener
	 * @param {Object} instance The current instantiation
	 * @return {function) roll function call
	 */
	function createListener(dice, instance) {
		/**
		 * Shuffles the dice array and use the first value
		 */
		function roll () {
			instance.roll();
		}

		dice.addEventListener('click', roll);
		return roll;
	}
	

	/**
	 * The Constructor object
	 * @param {String} dice    Selector for the button to roll the dice
	 * @param {String} result  Selector for the element to render the results into
	 * @param {Object} options Options and settings for the library
	 */
	function Constructor(diceSelector, resultSelector, options = {}) {
		// DOM elements
		let dice = document.querySelector(diceSelector);
		let result = document.querySelector(resultSelector);

		// Make sure elements exist
		if (!dice || !result) throw 'Dice and result elements must be provided.';

		// Merge user options into defaults
		let {sides, message} = Object.assign({
			sides: 6,
			message: `You rolled a {{roll}}.`
		}, options);
		
		// Listen for clicks
		let listener = createListener(dice, this);

		// Create properties
		Object.defineProperties(this, {
			dice: {value: dice},
			result: {value: result},
			sides: {value: sides},
			message: {value: message},
			listener: {value: listener},
			destroyed: {value: false, writable: true}
		});
	}

	/**
	 * Roll the die
	 */
	Constructor.prototype.roll = function() {
		let {sides, result, message, destroyed} = this;
		if (destroyed) return;

		// Create sides of the dice
		let sidesArr = Array.from(new Array(sides)).map(function(item, index) {
			return index + 1;
		});

		// Roll the die
		shuffle(sidesArr);
		result.textContent = message.replace('{{roll}}', sidesArr[0]);
	};
	
	/**
	 * Destroy this instance
	 */
	Constructor.prototype.destroy = function() {
		this.destroyed = true;
		this.dice.removeEventListener('click', this.listener);
	}

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
d20.destroy();
