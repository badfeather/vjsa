class Dice {
	/**
	 * The Constructor object
	 * @param {string} dice - Selector for the button to roll the dice
	 * @param {string} result - Selector for the element to render the results into
	 * @param {object} options - Options and settings for the library
	 */
	constructor(dice, result, options = {}) {
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
		
		this.dice = diceEl;
		this.result = resultEl;
		this.sides = sides;
		this.message = message;
		
		// Add click event listener
		// See https://stackoverflow.com/a/30448329/1582771
		this.dice.addEventListener('click', this.roll.bind(this));
	}

	/**
	 * Roll the die
	 */
	roll() {
		let {sides, result, message} = this;

		// Create sides of the dice
		let sidesArr = Array.from(new Array(sides)).map(function(item, index) {
			return index + 1;
		});
		
		// moved shuffle method here - is there a better way?
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

		// Roll the die
		shuffle(sidesArr);
		result.textContent = message.replace('{{roll}}', sidesArr[0]);
	};
}
			
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
