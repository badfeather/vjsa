let Stamp = (function() {
	const now = new Date().getTime(),
		seconds = 1000,
		minutes = seconds * 60,
		hours = minutes * 60,
		days = hours * 24,
		weeks = days * 7,
		months = days * 30,
		years = days * 365,
		times = {seconds, minutes, hours, days, weeks, months, years},
		defaultFormat = {
			dateStyle: 'long',
			timeStyle: 'long',
			hour12: true			
		};	
	
	/**
	 * The Constructor object
	 * @param {number} timestamp - the timestamp to use, defaults to now
	 */
	function Constructor(timestamp) {
		this.timestamp = timestamp ? timestamp : now;
	}
	
	/*
	 * @return {number} the Stamp object timestamp
	 */
	Constructor.prototype.getTimestamp = function() {
		return this.timestamp;
	}	

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n units added/subtracted	 	 
	 */		
	Constructor.prototype.addSubtractTime = function(n, units) {
		if (isNaN(n)) {
			console.log('n is empty, returning current timestamp');
			return this.timestamp;
		}
		if (!times[units]) {
			console.log('units is not a valid time unit string, returning current timestamp');
			return this.timestamp;
		}
		return this.timestamp + (n * times[units]);
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n seconds added/subtracted	 	 
	 */	
	Constructor.prototype.addSubtractSeconds = function(n) {
		//return this.timestamp + n * times['seconds'];
		return this.addSubtractTime(n, 'seconds');
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n minutes added/subtracted	 	 
	 */		
	Constructor.prototype.addSubtractMinutes = function(n) {
		//return this.timestamp + n * times['minutes'];
		return this.addSubtractTime(n, 'minutes');
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n hours added/subtracted	 	 
	 */		
	Constructor.prototype.addSubtractHours = function(n) {
		//return this.timestamp + n * times['hours'];
		return this.addSubtractTime(n, 'hours');
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n days added/subtracted	 	 
	 */		
	Constructor.prototype.addSubtractDays = function(n) {
		//return this.timestamp + n * times['days'];
		return this.addSubtractTime(n, 'days');
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n weeks added/subtracted	 	 
	 */		
	Constructor.prototype.addSubtractWeeks = function(n) {
		//return this.timestamp + n * times['weeks'];
		return this.addSubtractTime(n, 'weeks');
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n months added/subtracted	 	 
	 */		
	Constructor.prototype.addSubtractMonths = function(n) {
		//return this.timestamp + n * times['months'];
		return this.addSubtractTime(n, 'months');
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n years added/subtracted	 	 
	 */		
	Constructor.prototype.addSubtractYears = function(n) {
		//return this.timestamp + n * times['years'];
		return this.addSubtractTime(n, 'years');
	}
	
	/**
	 * @param {string} locale - the locale language code - defaults to navigator.language
	 * @param {object} format - an object of toLocaleString options, defaults to:
	 *	{
	 *		locale: navigator.language,
	 *		format: {
	 *			dateStyle: 'long',
	 *			timeStyle: 'long',
	 *			hour12: true			
	 *	}
	 * @return {string} A formatted date string	 	 
	 */
	Constructor.prototype.getDate = function(timestamp, locale = navigator.language, format = {}) {
		timestamp = timestamp ? timestamp : this.timestamp;
		format = format ? Object.assign(defaultFormat, format) : defaultFormat;
		return new Date(timestamp).toLocaleString(locale, format);
	}
	
	/**
	 * @param {number} n - a positive/negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @param {string} locale - the locale language code - defaults to navigator.language
	 * @param {object} format - an object of toLocaleString options, defaults to:
	 *	{
	 *		dateStyle: 'long',
	 *		timeStyle: 'long',
	 *		hour12: true			
	 *	}
	 * @uses this.addSubtractTime(), this.getDate()
	 * @return {string} formatted future/past date
	 */	 
	Constructor.prototype.getFuturePastDate = function(n, units, locale, format) {
		let newTime = this.addSubtractTime(n, units);
		return this.getDate(newTime, locale, format);
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} locale - the locale language code - defaults to navigator.language
	 * @param {object} format - an object of toLocaleString options	 
	 * @return {string} A formatted date string		 
	 */		
	Constructor.prototype.getFuturePastSecondDate = function(n, locale, format) {
		return this.getFuturePastDate(n, 'seconds', locale, format);
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} locale - the locale language code - defaults to navigator.language
	 * @param {object} format - an object of toLocaleString options	 
	 * @return {string} A formatted date string		 
	 */	
	Constructor.prototype.getFuturePastMinuteDate = function(n, locale, format) {
		return this.getFuturePastDate(n, 'minutes', locale, format);
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} locale - the locale language code - defaults to navigator.language
	 * @param {object} format - an object of toLocaleString options	 
	 * @return {string} A formatted date string		 
	 */	
	Constructor.prototype.getFuturePastHourDate = function(n, locale, format) {
		return this.getFuturePastDate(n, 'hours', locale, format);
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} locale - the locale language code - defaults to navigator.language
	 * @param {object} format - an object of toLocaleString options	 
	 * @return {string} A formatted date string		 
	 */
	Constructor.prototype.getFuturePastDayDate = function(n, locale, format) {
		return this.getFuturePastDate(n, 'days', locale, format);
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} locale - the locale language code - defaults to navigator.language
	 * @param {object} format - an object of toLocaleString options	 
	 * @return {string} A formatted date string		 
	 */	
	Constructor.prototype.getFuturePastWeekDate = function(n, locale, format) {
		return this.getFuturePastDate(n, 'weeks', locale, format);
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} locale - the locale language code - defaults to navigator.language
	 * @param {object} format - an object of toLocaleString options	 
	 * @return {string} A formatted date string		 
	 */	
	Constructor.prototype.getFuturePastMonthDate = function(n, locale, format) {
		return this.getFuturePastDate(n, 'months', locale, format);
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} locale - the locale language code - defaults to navigator.language
	 * @param {object} format - an object of toLocaleString options	 
	 * @return {string} A formatted date string		 
	 */	
	Constructor.prototype.getFuturePastYearDate = function(n, locale, format) {
		return this.getFuturePastDate(n, 'years', locale, format);
	}

	// Export the constructor object
	return Constructor;
})();

let now = new Stamp();
console.log(`Object timestamp: ${now.getTimestamp()}`);
console.log(`The timestamp in 5 minutes using the addSubtractTime method will be ${now.addSubtractTime(5, 'seconds')}`);
console.log(`The time 20 seconds from now will be  ${now.getFuturePastSecondDate(20)}`);
console.log(`The time 20 minutes from now will be  ${now.getFuturePastMinuteDate(20)}`);
console.log(`The time 3 hours from now will be  ${now.getFuturePastHourDate(3)}`);
console.log(`The time 3 days from now will be  ${now.getFuturePastDayDate(3)}`);
console.log(`The time 3 weeks from now will be  ${now.getFuturePastWeekDate(3)}`);
console.log(`The time 3 months from now will be  ${now.getFuturePastMonthDate(3)}`);
console.log(`The time 3 years from now will be  ${now.getFuturePastYearDate(3)}`);

// Time Traveler testing form
let form = document.getElementById('form');
let formNum = document.getElementById('number');
let formUnits = document.getElementById('units');
let results = document.getElementById('results');

form.addEventListener('submit', function(event) {
	event.preventDefault();
	let formNow = new Stamp();
	results.innerText = `The date and time ${Number(formNum.value)} ${formUnits.value} from now will be ${formNow.getFuturePastDate(formNum.value, formUnits.value)}`;
});
