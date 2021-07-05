/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
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

let winCount = 0;
let lossCount = 0;
let app = document.getElementById('app');
let wins = document.getElementById('wins');
let losses = document.getElementById('losses');
let winlose = document.getElementById('winlose');
let title = document.querySelector('h1');
let announcements = document.getElementById('announcements');
let progressIndicator = document.getElementById('progress-indicator');
let indicators = progressIndicator.querySelectorAll('li');
let found = 0;
let monstersFound = document.getElementById('monsters-found');
let imagePath = 'https://gist.githubusercontent.com/cferdinandi/d40f6a589c60eeb7fa10de9cca212cec/raw/29eaac94f4201691cf31d76787c6f867838d63f0/';
shuffle(monsters);

function loadGame() {
	winlose.innerHTML = '';
	for ( let  indicator of indicators ) {
		indicator.classList.remove('found');
	}
	monstersFound.innerText = 0;
	found = 0;
	shuffle(monsters);
	console.log(monsters);
	if ( winCount > 0 || lossCount  > 0 ) title.focus();
	wins.innerText = winCount;
	losses.innerText = lossCount;
	app.innerHTML =
	`
	<div class="row">
		${monsters.map(function (monster, index) {		
			return `<div class="grid">
				<button class="open-door" onclick="openDoor(this, ${index})"><img alt="Door ${index}" src="${imagePath}door.svg"></button>
			</div>`;
		}).join('')}
	</div>`;
}

function openDoor(el, index) {
	let grid = el.parentNode;
	let monster = monsters[index];
	let img = document.createElement('img');
	img.src = `${imagePath}${monster.name}.svg`;
	img.alt = monster.alt;
	el.replaceWith(img);

	let buttons = document.querySelectorAll( '.open-door' );
	let button;
	let subtitle;
	if ( 'sock' === monster.name ) {
		lossCount++;
		for ( button of buttons ) {
			button.setAttribute( 'disabled', '' );
		}
		winlose.innerHTML = `<h2 tabindex="-1">Doh! You Got Socks!</h2>
		<p><button onclick="loadGame()">Play Again</button></p>`;
		subtitle = document.querySelector( 'h2' );
		if ( subtitle ) subtitle.focus();
		return;
	} 
	indicators[found].classList.add('found');
	found++;	
	monstersFound.innerText = found;
	announcements.textContent = `${monster.alt}. ${found} of ${monsters.length - 1} monsters found.`;
	
	if ( buttons.length <= 1 ) {
		winCount++;
		for ( button of buttons ) {
			button.setAttribute( 'disabled', '' );
		}
		winlose.innerHTML = `<h2 tabindex="-1">You opened all the doors! Huzzah!</h2>
	<p><button onclick="loadGame()">Play Again</button></p>`;
		subtitle = document.querySelector( 'h2' );
		if ( subtitle ) subtitle.focus();
	}
	if ( 'sock' === monster.name ) {
		lossCount++;
		for ( button of buttons ) {
			button.setAttribute( 'disabled', '' );
		}
		winlose.innerHTML = `<h2 tabindex="-1">Doh! You Got Socks!</h2>
		<p><button onclick="loadGame()">Play Again</button></p>`;
		subtitle = document.querySelector( 'h2' );
		if ( subtitle ) subtitle.focus();
	}
}

loadGame();

