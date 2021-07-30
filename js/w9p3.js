let Dice = (function () {
	let btn,
		btns = [],
		n,
		sides,
		el = false,
		result = false,
		defaults = {
			dice: [4,6,8,12,20],
			rotateHover: true,
		};	
	
	/**
	 * Randomly shuffle an array
	 * https://stackoverflow.com/a/2450976/1293256
	 * @param {array} array - The array to shuffle
	 * @return {String} The first item in the shuffled array
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
	 * @param {node} btn - The button to attach the listener to
	 * @param {array} sides - an array of numbers representing the sides of a dice
	 * @param {constructor} instance The current instantiation
	 */
	function createEventListener(btn, sides, result) {
		function roll() {
			shuffle(sides);
			result.textContent = `You rolled a ${sides[0]}`;
		}

		// Listen for clicks on the button
		btn.addEventListener('click', roll);
	}
	
	/**
	 * Inject the button into the DOM
	 * @param {Node} el - The element to render the button into
	 * @param {Object} settings - The settings for this instance
	 * @return {Node} An array of buttons with attached event listeners
	 */
	function createBtns(el, settings) {
		for (n of settings.dice) {
			btn = document.createElement('button');
			sides = Array.from(new Array(n)).map(function(item, index) {
				return index + 1;
			});
			btn.classList.add('die', 'img-btn');
			if (settings.rotateHover) btn.classList.add('hover-rotate');
			btn.innerHTML = `<span class"btn-img" aria-hidden="true"><img src="img/d${n}.svg" alt="" /></span><span class="btn-text">Roll a d${n}</span>`;
			el.append(btn);
			createEventListener(btn, sides, result);
			btns.push(btn);
		}	
		return btns;	
	}

	/**
	 * The constructor object
	 * @param {string} btnContainerSelector - The selector for the buttons to render into
	 * @param {string} resultSelector - The selector for the results to render into
	 * @param {object} options - An object of options to pass through, including:
	 * - dice: {array} - expects an array of numbers representing sides of dice, defaults to [4,6,8,12,20]
	 * - rotateHover: {boolean} - whether or not to apply a class to the buttons for a hover animation effect, defaults to true
	 */
	function Constructor(btnContainerSelector, resultSelector, options = {}) {
		el = typeof(btnContainerSelector) === 'string' ? document.querySelector(btnContainerSelector) : el;
		result = typeof(btnContainerSelector) === 'string' ? document.querySelector(resultSelector) : result;			
		if (!el || !result) return;
		let settings = Object.assign({}, defaults, options);
		Object.freeze(settings);		
		let btns = createBtns(el, settings);	

		// Set properties
		Object.defineProperties(this, {			
			_btns: {value: btns},
			_result: {value: result},
			_settings: {value: settings},
		});
	}
	
	return Constructor;
})();

let dice = new Dice('#dice-container', '#result');

