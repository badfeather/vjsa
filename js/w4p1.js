let endpoint = 'https://vanillajsacademy.com/api/dragons.json';
let app = document.getElementById( 'app' );
let title = document.getElementById( 'app-title' );

async function getData() {
	try {
		let response = await fetch( endpoint );
		if ( ! response.ok ) {
			throw response.status;
		}
		let data = await response.json();
		console.log(data.publication);
		let entries = data.articles;
		if ( ! entries.length ) {
			return;
		}
		let html = '<div class="articles-menu">';
		let menu = '<nav><h2 class="menu-title">Table of Contents</h2><ul class="articles">';
		for ( let entry of entries ) {
			let url = entry.url;
			let id = url.replace('#', '');
			html += 
`<article class="article" id="${id}">
	<h2>${entry.title}</h2>
	<p class="author">By ${entry.author}</p>
	<div class="article-content">${entry.article}</div>
</article>`;
	
			menu += `<li><a href="${url}">${entry.title}</a></li>`;
		}
		menu += '</ul></nav>';
		html += '</div>';		
		app.innerHTML = menu + html;

	} catch(error) {
		app.innerHTML = '<p>Dragons are sleeping right now.</p>';
	}
}

getData();
