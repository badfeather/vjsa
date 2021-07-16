/**
 * Get a date in the future (or past) from a timestamp
 * @param {number} num - a positive or negative number
 * @param {units} units - the time unit to use - options: 'hours', 'days', 'weeks', 'months', 'years'
 * @param {number} timestamp - the timestamp - defaults to current timestamp
 * @param {object} options - an object of toLocaleString options, defaults to:
 *	{
 *		locale: navigator.language,
 *		format: {
 *			dateStyle: 'long',
 *			timeStyle: 'short',
 *			hour12: true			
 *	}
 * @return {String} A formatted date string
 */
function getFutureOrPastDate(num, units, timestamp = new Date().getTime(), options = {}) {
	if (!num || !['hours', 'days', 'weeks', 'months', 'years'].includes(units) || !timestamp) return;
	let defaults = {
		locale: navigator.language,
		format: {
			dateStyle: 'long',
			timeStyle: 'short',
			hour12: true			
		},
	};
	let {locale, format} = Object.assign(defaults, options);
	console.log(locale);
	console.log(format);
	let multiplier;
	switch(units) {
		case 'hours':
			multiplier = 1000 * 60 * 60;
			break;
		case 'days':
			multiplier = 1000 * 60 * 60 * 24;
			break;
		case 'weeks':
			multiplier = 1000 * 60 * 60 * 24 * 7;
			break;
		case 'months':
			multiplier = 1000 * 60 * 60 * 24 * 30;
			break;
		case 'years':
			multiplier = 1000 * 60 * 60 * 24 * 365;
			break;
	}
	return new Date(timestamp + (num * multiplier)).toLocaleString(locale, format);
}

// Time Traveler testing form
let form = document.getElementById('form');
let date = document.getElementById('date');
let formNum = document.getElementById('number');
let formUnits = document.getElementById('units');

form.addEventListener('submit', function(event) {
	event.preventDefault();
	console.log(formNum.value);
	console.log(formUnits.value);
	date.innerText = getFutureOrPastDate(formNum.value, formUnits.value);
});
