let Dice = (function () {	
	let rollCount = 0;
	
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
		let {sides, message, onRoll, onDestroy} = Object.assign({
			sides: 6,
			message: `You rolled a {{roll}}.`,
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
			onRoll: {value: onRoll},
			onDestroy: {value: onDestroy},
			lastRoll: {value: false},
			rolls: {value: 0}
		});
	}

	/**
	 * Roll the dielastRoll
	 */
	Constructor.prototype.roll = function() {			
		let {sides, result, message, lastRoll, rolls} = this;

		// Create sides of the dice
		let sidesArr = Array.from(new Array(sides)).map(function(item, index) {
			return index + 1;
		});		

		// Roll the die
		shuffle(sidesArr);
		lastRoll = sidesArr[0];
		rollCount++;
		rolls = rollCount;
		result.textContent = message.replace('{{roll}}', lastRoll);
		this.onRoll(lastRoll, sides, rolls);
		return this;
	};
	
	/**
	 * Destroy this instance
	 */
	Constructor.prototype.destroy = function() {
		let {dice, result, sides, message, lastRoll} = this;
		result.textContent = '';
		dice.removeEventListener('click', this.listener);
		dice.setAttribute('disabled', '');
		lastRoll = false;
		this.roll = null;
		this.onDestroy(result, sides, dice, message);
		return this;
	}

	return Constructor;
})();

let app = document.getElementById('app');
let dice = [4,6,8,12,20];
let div, h4, table, row, th, td, n, i;
for (n of dice) {
	div = document.createElement('div');
	div.classList.add('roll-results');
	h4 = document.createElement('h4');
	h4.textContent = `D${n} rolls`;
	div.append(h4);
	table = document.createElement('table');
	table.setAttribute('data-sides', n);
	table.innerHTML = `<tr><th>Side</th><th>Count</th></tr>`;
	for (i = 1; i <= n; i++) {
		table.innerHTML += `<tr><th>${i}</th><td data-side="${i}">0</td></tr>`;
	}
	table.innerHTML += `<tr><th>Total Rolls</th><td data-roll-total>0</td></tr>`;
	div.append(table);
	app.append(div);
}

function counter(lastRoll, sides, rolls) {
	let counter = document.querySelector(`[data-sides="${sides}"`);
	if (!counter) return;
	let cell = counter.querySelector(`[data-side="${lastRoll}"`);
	if (!cell) return;
	let total = counter.querySelector('[data-roll-total]');
	total.innerHTML = rolls;
	let num = parseInt(cell.innerText, 10);
	num++;
	console.log(num);
	cell.innerText = num;		
}

function destroyMessage(result, sides) {
	result.innerText = `d${sides} destroyed`;
}

let d4 = new Dice('#d4', '#result', {
	message: 'D4 roll: {{roll}}',
	sides: 4,
	onRoll: counter,
	onDestroy: destroyMessage,
});

let d6 = new Dice('#d6', '#result', {
	message: 'D6 roll: {{roll}}',
	sides: 6,
	onRoll: counter,
	onDestroy: destroyMessage,
});

let d8 = new Dice('#d8', '#result', {
	message: 'D8 roll: {{roll}}',
	sides: 8,
	onRoll: counter,
	onDestroy: destroyMessage,
});

let d12 = new Dice('#d12', '#result', {
	message: 'D12 roll: {{roll}}',
	sides: 12,
	onRoll: counter,
	onDestroy: destroyMessage,
});

let d20 = new Dice('#d20', '#result', {
	message: 'D20 roll: {{roll}}',
	sides: 20,
	onRoll: counter,
	onDestroy: destroyMessage,
});
