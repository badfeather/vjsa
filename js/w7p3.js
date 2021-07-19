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
function getFutureOrPastDate(n, units, timestamp = new Date().getTime(), options = {}) {
	let times = {
		hours: 1000 * 60 * 60,
		days: 1000 * 60 * 60 * 24,
		weeks: 1000 * 60 * 60 * 24 * 7,
		months: 1000 * 60 * 60 * 24 * 30,
		years: 1000 * 60 * 60 * 24 * 365,
	};
	if (!times[units]) {
		throw `"${units}" is not a valid unit of time.`;
		return;
	}
	if (!n || !timestamp) return;
	let defaults = {
		locale: navigator.language,
		format: {
			dateStyle: 'long',
			timeStyle: 'short',
			hour12: true			
		},
	};
	let {locale, format} = Object.assign(defaults, options);	
	return new Date(timestamp + (n * times[units])).toLocaleString(locale, format);
}

// Time Traveler testing form
let form = document.getElementById('form');
let formNum = document.getElementById('number');
let formUnits = document.getElementById('units');
let results = document.getElementById('results');

form.addEventListener('submit', function(event) {
	event.preventDefault();
	results.innerText = `The date and time ${formNum.value} ${formUnits.value} from now will be ${getFutureOrPastDate(formNum.value, formUnits.value)}`;
});
