( function() {
	const toggle = document.querySelector( '#show-password' );
	const pass = document.querySelector( '#password' );	
	if ( ! toggle || ! pass ) {
		return;
	}		
	function togglePass() {
		pass.type = toggle.checked ? 'text' : 'password';
	}
	toggle.addEventListener( 'change', togglePass );
} )();