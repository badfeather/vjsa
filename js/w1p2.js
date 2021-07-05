( function() {
	let toggle = document.querySelector( '#show-passwords' );
	let passwords = document.querySelectorAll( '[type="password"]' );	
	if ( ! toggle || ! passwords.length ) {
		return;
	}		

	toggle.addEventListener('change', function () {
		for ( let password of passwords ) {
			password.type = toggle.checked ? 'text' : 'password';
		}
	});
} )();