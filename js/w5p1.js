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
	'monster1',
	'monster2',
	'monster3',
	'monster4',
	'monster5',
	'monster6',
	'monster7',
	'monster8',
	'monster9',
	'monster10',
	'monster11',
	'sock'
];

let app = document.getElementById( 'app' );

function getMonsterImgAlt(monster) {
	let alt = '';
	switch (monster) {
		case 'monster1':
			alt = 'Gold colored monster with curly snout, mohawk, and tiny tail walking to the right.';
			break;
		case 'monster10':
			alt = 'Blue monster with big head, tiny feet, and eyes on stems looking startled.';
			break;
		case 'monster11':
			alt = 'Gray monster that looks furry and big like a sasquatch smiling.';
			break;
		case 'monster2':
			alt = 'Gold monster with big head, skinny, long legs and arms, and one eye smiling.';
			break;
		case 'monster3':
			alt = 'Green monster with mouth of teeth facing upwards with eyes at the ends of the lips waving with skinny long arms.';
			break;
		case 'monster4':
			alt = 'Red monster with 4 arms and floppy ears looking nervous.';
			break;
		case 'monster5':
			alt = 'Green monster with one big eye, big head, and spiky hair looking kinda sad.';
			break;
		case 'monster6':
			alt = 'Green monster with triangle shaped head, one eye, and jagged teeth doing a handstand.';
			break;
		case 'monster7':
			alt = 'Purple monster with one big eye and 2 tentacle arms waving hello.';
			break;	
		case 'monster8':
			alt = 'Purple eggplant shaped monster with one eye and straight mouth looking straight ahead.';
			break;
		case 'monster9':
			alt = 'Blue monster that looks a bit like a flying ant staring straight ahead with his arms up in a kind of nervous shrug expression.';
			break;
		case 'sock':
			alt = 'A pair of crew-length socks.';
			break;		
	}
	return alt;
}

function renderMonsters() {
	shuffle( monsters );
	let html = '<div class="row">';
	for ( let monster of monsters ) {
		let src = 'https://gist.githubusercontent.com/cferdinandi/14e80a8e5383d962d4ac65386406993b/raw/9f34ac3b4676e4ce62d51fe7c9b06845e4657f10/' + monster + '.svg';
		let alt = getMonsterImgAlt(monster);
		html += '<div class="grid">';
		html += '<img src="' + src + '" alt="' + alt + '" />';
		html += '</div>';
	}
	html += '</div>';
	app.innerHTML = html;
}

renderMonsters();



