function diceFactory(diceSelector, resultSelector, options = {}) {
	let dice = document.querySelector(diceSelector);
	let result = document.querySelector(resultSelector);

	// Make sure elements exist
	if (!dice || !result) throw 'Dice and result elements must be provided.';
	
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
	
	let {sides, message} = Object.assign({
		sides: 6,
		message: `You rolled a {{roll}}.`
	}, options);
	let Obj = {
		dice: dice,
		result: result,
		sides: sides,
		message: message,
	};
	
	let roll = function() {
		let sidesArr = Array.from(new Array(Obj.sides)).map(function (item, index) {
			return index + 1;
		});		
		shuffle(sidesArr);
		Obj.result.textContent = Obj.message.replace('{{roll}}', sidesArr[0]);
	}
	
	Obj.dice.addEventListener('click', roll);
	return {
		roll
	}
}

let d4 = diceFactory('#d4', '#result', {
	message: '{{roll}}',
	sides: 4
});

let d6 = diceFactory('#d6', '#result', {
	message: '{{roll}}'
});

let d8 = diceFactory('#d8', '#result', {
	message: '{{roll}}',
	sides: 8
});

let d12 = diceFactory('#d12', '#result', {
	message: '{{roll}}',
	sides: 12
});

let d20 = diceFactory('#d20', '#result', {
	message: '{{roll}}',
	sides: 20
});

let d20test = diceFactory('#d20', '#result', {
	message: 'test roll: {{roll}}',
	sides: 20
});

//test roll
d20test.roll();
