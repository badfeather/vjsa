/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param {Array} array The array to shuffle
 * @return {String} The first item in the shuffled array
 */
function shuffle (array) {
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

let monsters = [
	{
		name: 'monster1',
		alt: 'A yellow monster with a curly nose'
	},
	{
		name: 'monster2',
		alt: 'A yellow monster with a wide head, one eye, and an underbite'
	},
	{
		name: 'monster3',
		alt: 'A green monster with eyes on stalks and a mouth at the top of its head'
	},
	{
		name: 'monster4',
		alt: 'A red monster with horns, four eyes, and no legs'
	},
	{
		name: 'monster5',
		alt: 'A green monster with three horns on each side of its head, one eye, and a sad look on its face'
	},
	{
		name: 'monster6',
		alt: 'A green, triangle-shaped monster with sharp teeth, walking upside-down on its hands'
	},
	{
		name: 'monster7',
		alt: 'A purple monster with a single, sad looking eye and tentacles for arms'
	},
	{
		name: 'monster8',
		alt: 'A purple, oval-shaped monster with one eye and no arms or legs'
	},
	{
		name: 'monster9',
		alt: 'A blue, insect-like monster, with bug eyes, three body sections, and a pair of wings'
	},
	{
		name: 'monster10',
		alt: 'A blue monster with lopsided eyes on stalks and long, sharp teeth'
	},
	{
		name: 'monster11',
		alt: 'A furry gray monster with long arms and a happy face'
	},
	{
		name: 'sock',
		alt: 'A pair of athletic socks'
	}
];

let app = document.querySelector('#app');
shuffle(monsters);

function loadGame() {
	shuffle(monsters);
	console.log(monsters);
	app.innerHTML =
	`<p>Open doors to reveal monsters or socks. If you make it to the end without hitting socks, you win. If you hit socks before then, you lose!</p>
	<div class="row">
		${monsters.map(function (monster, index) {		
			return `<div class="grid" aria-live="polite">
				<button class="open-door" onclick="openDoor(this, ${index})"><span class="visually-hidden">Open door</span><img alt="Closed door" src="img/door.svg"></button>
			</div>`;
		}).join('')}
	</div>`;
}

function openDoor(el, index) {
	let grid = el.parentNode;
	let monster = monsters[index];
	let img = document.createElement('img');
	img.src = `img/${monster.name}.svg`;
	img.alt = monster.alt;
	el.replaceWith(img);

	let buttons = document.querySelectorAll( '.open-door' );
	if ( ! buttons.length ) {
		app.innerHTML += `<div style="text-align: center"><h2>You opened all the doors! Huzzah!</h2>
	<p><button onclick="loadGame()">Play Again</button></p></div>`;
		return;
	}
	if ( 'sock' === monster.name ) {
		for ( let button of buttons ) {
			button.setAttribute( 'disabled', '' );
		}
		app.innerHTML += `<div style="text-align: center"><h2>Doh! You Got Socks!</h2>
		<p><button onclick="loadGame()">Try Again</button></p></div>`;
	}
}

loadGame();

