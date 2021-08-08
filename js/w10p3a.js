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
		function roll() {
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
		dice.removeAttribute('disabled');

		// Merge user options into defaults
		let {sides, message, onReady, onRoll, onDestroy} = Object.assign({
			sides: 6,
			message: `You rolled a {{roll}}.`,
			onReady: function() {},
			onRoll: function() {},
			onDestroy: function() {},
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
			onReady: {value: onReady},
			onRoll: {value: onRoll},
			onDestroy: {value: onDestroy},
			rolls: {value: 0, writable: true}
		});
		
	    if (onReady && typeof onReady === 'function') {
	        onReady(dice, sides, result);
	    }		
	}

	/**
	 * Roll the dielastRoll
	 */
	Constructor.prototype.roll = function() {			
		let {dice, sides, result, message, rolls} = this;

		// Create sides of the dice
		let sidesArr = Array.from(new Array(sides)).map(function(item, index) {
			return index + 1;
		});		

		// Roll the die
		shuffle(sidesArr);
		let roll = sidesArr[0];
		rolls = rolls + 1;
		this.rolls = rolls;
		result.textContent = message.replace('{{roll}}', roll);
		this.onRoll(roll, rolls, sides, dice, result, message);
		return this;
	};
	
	/**
	 * Destroy this instance
	 */
	Constructor.prototype.destroy = function() {
		let {dice, result, sides, message, listener} = this;
		result.textContent = '';
		dice.removeEventListener('click', listener);
		dice.setAttribute('disabled', '');
		this.rolls = 0;
		this.onDestroy(dice, sides, result);
		return this;
	}

	return Constructor;
})();

function createCounterTable(dice, sides) {
	let counters = document.getElementById('counters');
	if (!counters) return;
	let id = dice.id;
	let div = document.createElement('div');
	div.setAttribute('data-roll-results-for', id);
	let table = document.createElement('table');
	table.setAttribute('data-sides', sides);
	let rows = `<tr><th>Side</th><th>Count</th></tr>`;
	for (let i = 1; i <= sides; i++) {
		rows += `<tr><th>${i}</th><td data-side="${i}">0</td></tr>`;
	}	
	rows += `<tr><th>Total Rolls</th><td data-roll-totals-for="${id}">0</td></tr>`;
	table.innerHTML = rows;	
	div.append(table);
	counters.append(div);
}

function counter(roll, rolls, sides, dice) {
	let id = dice.id;
	console.log(roll);
	let counter = document.querySelector(`[data-roll-results-for="${id}"`);
	if (!counter) return;
	let cell = counter.querySelector(`[data-side="${roll}"`);
	let total = counter.querySelector(`[data-roll-totals-for="${id}"]`);
	if (!cell || !total) { console.log('huh?'); return;	}
	let num = parseInt(cell.innerText, 10);
	num++;
	cell.innerText = num;	
	total.innerText = rolls;	
}

function destroyMessage(dice, sides, result) {
	result.innerText = `d${sides} destroyed`;
}

let d4 = new Dice('#d4', '#result', {
	message: 'D4 roll: {{roll}}',
	sides: 4,
	onReady: createCounterTable,
	onRoll: counter,
	onDestroy: destroyMessage,
});

let d6 = new Dice('#d6', '#result', {
	message: 'D6 roll: {{roll}}',
	sides: 6,
	onReady: createCounterTable,
	onRoll: counter,
	onDestroy: destroyMessage,
});

let d8 = new Dice('#d8', '#result', {
	message: 'D8 roll: {{roll}}',
	sides: 8,
	onReady: createCounterTable,
	onRoll: counter,
	onDestroy: destroyMessage,
});

let d12 = new Dice('#d12', '#result', {
	message: 'D12 roll: {{roll}}',
	sides: 12,
	onReady: createCounterTable,
	onRoll: counter,
	onDestroy: destroyMessage,
});

let d20 = new Dice('#d20', '#result', {
	message: 'D20 roll: {{roll}}',
	sides: 20,
	onReady: createCounterTable,
	onRoll: counter,
	onDestroy: destroyMessage,
});
