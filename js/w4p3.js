let articlesEndpoint = 'https://vanillajsacademy.com/api/dragons.json';
let authorsEndpoint = 'https://vanillajsacademy.com/api/dragons-authors.json';
let app = document.getElementById( 'app' );
let title = document.getElementById( 'app-title' );

function renderFail() {
	app.innerHTML = '<p>Shhh. Dragons are sleeping.</p>';
}

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

function render( data ) {
	let entries = data[0].articles;
	let authors = data[1].authors;
	//console.log(authors);
	let html = '<div class="articles-menu">';
	for ( let entry of entries ) {
		let author = entry.author;
		let authorObject = authors.find(function (object) {
			return object.author === author;
		});
		let bio = authorObject.bio;
		
		html += 
`<article class="article">
	<h2><a href="${sanitizeHTML(entry.url)}">${sanitizeHTML(entry.title)}</a></h2>
	<p class="author">By ${sanitizeHTML(author)}</p>
	<div class="article-content"><p>${sanitizeHTML(entry.article)}</p></div>
	${bio ? `<h3>About ${sanitizeHTML(author)}</h3><p class="author-bio">${sanitizeHTML(bio)}` : ''}
</article>`;
	}
	html += '</div>';		 
	app.innerHTML = html;
}

Promise.all([
	fetch(articlesEndpoint),
	fetch(authorsEndpoint)
]).then(function (responses) {
	// Get a JSON object from each of the responses
	return Promise.all(responses.map(function (response) {
		return response.json();
	}));
}).then(render).catch(function (error) {
	console.log(error);
	renderFail();
});

