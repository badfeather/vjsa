function countText( textEl, counterEl ) {
	const text = document.querySelector(textEl);
	const count = document.querySelector(counterEl);
	if ( ! text || ! count ) return;
	text.addEventListener( 'input', countMe );
	function countMe(e) {
		count.innerText = text.value.length;
	}
}
countText( '#text', '#character-count' );

