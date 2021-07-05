/**
 * Toggle visiblity of all password fields in form on checkbox input click
 */
function togglePasswords( event ) {
	if ( ! event.target.matches('[data-type="password-toggle"]' ) ) {
		return;
	}
	let toggle = event.target;
	let form = toggle.closest('form');
	let passwords = form.querySelectorAll('[data-type="password"]');
	for ( let password of passwords ) {
		password.type = toggle.checked ? 'text' : 'password';
	} 
}

document.addEventListener('click', togglePasswords );