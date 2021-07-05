function countChars( e, countEl ) {
	let chars = document.querySelector( countEl );
	if ( ! chars ) return;
	chars.innerText = e.target.value.length;
}

function countWords( e, wordEl ) {
	let words = document.querySelector( wordEl );
	if ( ! words ) return;
	let split = e.target.value.split(/[\n\r\s]+/g);
	let filtered = split.filter( function( word ) {
		return word.length;
	});
	words.innerText = filtered.length;
}

let text = document.getElementById( 'text' ); 
if ( text ) {
	text.addEventListener( 'input', function( e ) {
		countChars( e, '#character-count' );
		countWords( e, '#word-count' );
	} );
}
	