( function() {
	let text = document.getElementById( 'text' ); 
	let counter = document.getElementById( 'text-count' );
	if ( ! text || ! counter ) return;
	text.addEventListener( 'input', function() {
		let charCount = text.value.length;
		let wordCount = text.value.split(/[\n\r\s]+/g).filter( function( word ) {
			return word.length;
		} ).length; 
		counter.innerText = "You've written " + charCount + " words and " + wordCount + " characters.";		
	} );
} )();