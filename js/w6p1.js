/**
 * Sanitize and encode all HTML in a user-submitted string
 * https://portswigger.net/web-security/cross-site-scripting/preventing
 * @param {String} str The user-submitted string
 * @return {String} str The sanitized string
 */
function sanitizeHTML( str ) {
	return str.replace( /javascript:/gi, '' ).replace( /[^\w-_. ]/gi, function ( c ) {
		return `&#${c.charCodeAt( 0 )};`;
	});
}

let form = document.getElementById( 'notebook' );
let noteInput = document.getElementById( 'note' );
let notesList = document.getElementById( 'notes-list' );
let notifications = document.getElementById( 'notifications' );
let noteId;
let noteText;
let storedNotes;
let li;
let notes = {};
//localStorage.clear();

function showStatus( message ) {	
	if ( 'string' !== typeof( message ) ) return;
	let notification = document.createElement( 'div' );
	notification.setAttribute( 'aria-live', 'polite' );
	notifications.append( notification );
	setTimeout( function () {
		notification.textContent = message;
	}, 1 );
	setTimeout( function () {
		notification.remove();
	}, 4000 );
}

function loadNotes() {
	storedNotes = localStorage.getItem( 'notes' );
	if ( storedNotes === null ) return;
	//notes = JSON.parse( storedNotes );
	notes = storedNotes.length ? JSON.parse( storedNotes ) : {};
	console.log( 'stored notes: ' + notes );
	if ( ! notes || Object.keys( notes ).length === 0 ) return;
	for( let key in notes ) {
		console.log( key );
		console.log( notes[key] );
		if ( notes.hasOwnProperty( key ) ) {
			createNoteListing( key, notes[key] );
		}
	}
}

function createNoteListing( id, text ) {
	li = document.createElement( 'li' );
	li.id = id;
	li.classList.add( 'note' );
	li.innerHTML = `
	<p class="note-text">${text}</p>
	<div class="delete-note"><button onclick="deleteNote(this)">Delete note</button></div>`;
	notesList.appendChild( li );
}

function addNote( event ) {
	event.preventDefault();
	noteId = Date.now();
	console.log( 'adding note ' + noteId );
	noteText = sanitizeHTML( noteInput.value );
	console.log( noteText );
	createNoteListing( noteId, noteText );
	notes[noteId] = note.value;
	console.log( notes );
	localStorage.setItem( 'notes', JSON.stringify( notes ) );
	showStatus( 'New note added.' );
	noteInput.value = '';
}

function deleteNote( el ) {
	let parentLi = el.closest( 'li' );
	console.log(parentLi);
	let parentId = parentLi.id;
	console.log( 'deleting note ' + parentId );
	delete notes[parentId];
	parentLi.remove();
	console.log( notes );
	showStatus( 'Note deleted.' );
	localStorage.setItem( 'notes', JSON.stringify( notes ) );
}

function deleteAllNotes() {
	localStorage.removeItem( 'notes' );
	notesList.innerHTML = '';
	showStatus( 'All notes deleted.' );
}

loadNotes();
form.addEventListener( 'submit', addNote );
