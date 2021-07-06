/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param	{Array} array The array to shuffle
 * @return {String}			The first item in the shuffled array
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

// The monsters and socks
let monsters = [
	{
		name: 'monster1',
		alt: 'Gold colored monster with curly snout, mohawk, and tiny tail walking to the right.'
	},
	{
		name: 'monster2',
		alt: 'Gold monster with big head, skinny, long legs and arms, and one eye smiling.'
	},
	{
		name: 'monster3',
		alt: 'Green monster with mouth of teeth facing upwards with eyes at the ends of the lips waving with skinny long arms.'
	},
	{
		name: 'monster4',
		alt: 'Red monster with 4 arms and floppy ears looking nervous.'
	},
	{
		name: 'monster5',
		alt: 'Green monster with one big eye, big head, and spiky hair looking kinda sad.'
	},
	{
		name: 'monster6',
		alt: 'Green monster with triangle shaped head, one eye, and jagged teeth doing a handstand.'
	},
	{
		name: 'monster7',
		alt: 'Purple monster with one big eye and 2 tentacle arms waving hello.'
	},
	{
		name: 'monster8',
		alt: 'Purple eggplant shaped monster with one eye and straight mouth looking straight ahead.'
	},
	{
		name: 'monster9',
		alt: 'Blue monster that looks a bit like a flying ant staring straight ahead with his arms up in a kind of nervous shrug expression.'
	},
	{
		name: 'monster10',
		alt: 'Blue monster with big head, tiny feet, and eyes on stems looking startled.'
	},
	{
		name: 'monster11',
		alt: 'Gray monster that looks furry and big like a sasquatch smiling.'
	},
	{
		name: 'sock',
		alt: 'A pair of crew-length socks.'
	}
];

let app = document.getElementById( 'app' );

function renderMonsters() {
	shuffle( monsters );
	app.innerHTML = `
	<div class="row">
		${monsters.map( function( monster ) {
			return `<div class="grid"><img src="img/${monster.name}.svg" alt="${monster.alt}" /></div>`;
		}).join('')}
	</div>
	`;
}

renderMonsters();



