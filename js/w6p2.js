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

/*!
 * Serialize all form data into an object
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {FormData} data The FormData object to serialize
 * @return {String}        The serialized form data
 */
function serialize (data) {
	let obj = {};
	for (let [key, value] of data) {
		if (obj[key] !== undefined) {
			if (!Array.isArray(obj[key])) {
				obj[key] = [obj[key]];
			}
			obj[key].push(value);
		} else {
			obj[key] = value;
		}
	}
	return obj;
}

let data,
noteId,
noteTitle,
noteText,
storedNotes,
li,
note,
time,
date,
form = document.getElementById( 'notebook' ),
timestamp = document.getElementById( 'timestamp' ),
notesList = document.getElementById( 'notes-list' ),
notifications = document.getElementById( 'notifications' ),
notes = [];
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
	storedNotes = localStorage.getItem( 'notes2' );
	// this needs work - not sure why '{}' was getting returned when noting had been set yet.
	if ( storedNotes === null || storedNotes && Object.keys(storedNotes).length === 0 || '{}' === storedNotes ) return;
	console.log( 'Stored notes: ' + storedNotes );
	notes = JSON.parse( storedNotes );
	if ( ! Array.isArray( notes ) ) return;
	for( note of notes ) {
		createNoteListing( note );
	}
}

function createNoteListing( note ) {
	li = document.createElement( 'li' );
	li.id = note.timestamp;
	let date = new Date();
	Date.parse( note.timestamp );
	time = date.toUTCString();
	li.classList.add( 'note' );	
	li.innerHTML = `
	<h3 class="note-title">${note.title}</h3>
	<p class="note-time"><small>${time}</small></p>
	<p class="note-text">${note.text}</p>
	<div class="delete-note"><button onclick="deleteNote(this)">Delete note</button></div>`;
	notesList.appendChild( li );
}

function addNote( event ) {
	event.preventDefault();
	timestamp.value = Date.now();
	data = new FormData( form );
	note = serialize( data );
	console.log( 'Adding note: ' + note );
	notes.push( note );
	createNoteListing( note );
	localStorage.setItem( 'notes2', JSON.stringify( notes ) );
	showStatus( 'New note added.' );
	form.reset();
}

function deleteNote( el ) {
	let parentLi = el.closest( 'li' );
	console.log( parentLi );
	let parentId = parentLi.id;
	console.log( 'deleting note with id: ' + parentId );
	// delete note with matching parent id from notes array
	// https://stackoverflow.com/a/37428681/1582771
	notes = notes.filter(function( obj ) {
	  return obj.timestamp !== parentId;
	});
	parentLi.remove();
	showStatus( 'Note deleted.' );
	localStorage.setItem( 'notes2', JSON.stringify( notes ) );
}

function deleteAllNotes() {
	localStorage.removeItem('notes2');
	notesList.innerHTML = '';
	showStatus( 'All notes deleted.' );
}

loadNotes();
form.addEventListener( 'submit', addNote );
