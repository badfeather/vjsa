function viewJS(filepath) {
	let code = document.getElementById('view-js');
	if (!filepath || !code) return;

	/**
	 * Sanitize and encode all HTML in a user-submitted string
	 * https://portswigger.net/web-security/cross-site-scripting/preventing
	 * @param  {String} str  The user-submitted string
	 * @return {String} str  The sanitized string
	 */
	function sanitizeHTML(str) {
		return str.toString().replace(/javascript:/gi, '').replace(/[^\w-_. ]/gi, function (c) {
			return `&#${c.charCodeAt(0)};`;
		});
	}
		
	function renderJS(str) {
		code.innerHTML = sanitizeHTML(str);
	}
	
	/**
	 * Get weather for the user's current location
	 * @param  {Object} position The location data
	 */
	fetch(filepath).then(function(response) {
		if (response.ok) {
			return response.text();
		}
		throw response.status;
		
	}).then(function(data) {
		renderJS(data);

	}).catch(function(error) {
		console.log('aint workin');
		console.warn(error);
	});
	
	//hljs.highlightElement(code);
	Prism.highlightElement(code);
}
//hljs.highlightAll();
//hljs.initHighlightingOnLoad();

//document.addEventListener('DOMContentLoaded', (event) => {
//  document.querySelectorAll('pre code').forEach((el) => {
//    hljs.highlightElement(el);
//  });
//});
