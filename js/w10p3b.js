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
	 * Emit a custom event
	 * @param  {String} type   The event type
	 * @param  {Object} detail Any details to pass along with the event
	 * @param  {Node}   elem   The element to attach the event to
	 */
	function emitEvent(type, detail = {}, elem = document) {	
		// Make sure there's an event type
		if (!type) return;
	
		// Create a new event
		let event = new CustomEvent(type, {
			bubbles: true,
			cancelable: true,
			detail: detail
		});
	
		// Dispatch the event
		return elem.dispatchEvent(event);	
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
		let {sides, message} = Object.assign({
			sides: 6,
			message: `You rolled a {{roll}}.`,
		}, options);
		
		// Listen for clicks
		let listener = createListener(dice, this);
		let rolls = 0;

		// Create properties
		Object.defineProperties(this, {
			dice: {value: dice},
			result: {value: result},
			sides: {value: sides},
			message: {value: message},
			listener: {value: listener},
			rolls: {value: rolls, writable: true}
		});
		
		// Emit event when the instance is ready
		emitEvent('dice:ready', {dice, result, sides, message});
	}

	/**
	 * Roll the die
	 */
	Constructor.prototype.roll = function() {
		let {dice, sides, result, message, rolls} = this;
		
		let canceled = !emitEvent('dice:before-roll', {dice, sides, result, message});
		if (canceled) return;	

		// Create sides of the dice
		let sidesArr = Array.from(new Array(sides)).map(function(item, index) {
			return index + 1;
		});		

		// Roll the die
		shuffle(sidesArr);
		let roll = sidesArr[0];
		rolls += 1;
		result.textContent = message.replace('{{roll}}', roll);
		this.rolls = rolls;
		emitEvent('dice:roll', {dice, sides, result, roll, rolls});
		return this;
	};
	
	/**
	 * Destroy this instance
	 */
	Constructor.prototype.destroy = function() {
		let {dice, result, sides, message, listener} = this;
		let canceled = !emitEvent('dice:before-destroy', {dice, sides, result});
		if (canceled) return;	
		result.textContent = '';
		dice.removeEventListener('click', listener);
		dice.setAttribute('disabled', '');
		this.rolls = 0;
		emitEvent('dice:destroy', {dice, sides, result});
		return this;
	}

	return Constructor;
})();

function createCounterTable(event) {
	let counters = document.getElementById('counters');
	if (!counters) return;
	let {dice, sides, result} = event.detail;
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
	for (let i = 1; i <= sides; i++) {
		table.innerHTML = rows;
	}
	
	div.append(table);
	counters.append(div);
}

function counter(event) {
	let {dice, sides, result, roll, rolls} = event.detail;
	let id = dice.id;
	let counter = document.querySelector(`[data-roll-results-for="${id}"`);
	if (!counter) return;
	let cell = counter.querySelector(`[data-side="${roll}"`);
	let total = counter.querySelector(`[data-roll-totals-for="${id}"]`);
	if (!cell || !total) return;
	total.innerText = rolls;
	let num = parseInt(cell.innerText, 10);
	num++;
	cell.innerText = num;	
}

function destroyMessage(event) {
	let {sides, result} = event.detail;
	result.innerText = `d${sides} destroyed`;
}

document.addEventListener('dice:ready', createCounterTable);
document.addEventListener('dice:roll', counter);
document.addEventListener('dice:destroy', destroyMessage);

let d4 = new Dice('#d4', '#result', {
	message: 'D4 roll: {{roll}}',
	sides: 4,
});

let d6 = new Dice('#d6', '#result', {
	message: 'D6 roll: {{roll}}',
	sides: 6,
});

let d8 = new Dice('#d8', '#result', {
	message: 'D8 roll: {{roll}}',
	sides: 8,
});

let d12 = new Dice('#d12', '#result', {
	message: 'D12 roll: {{roll}}',
	sides: 12,
});

let d20 = new Dice('#d20', '#result', {
	message: 'D20 roll: {{roll}}',
	sides: 20,
});


