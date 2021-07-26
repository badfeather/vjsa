let Stamp = (function() {
	const seconds = 1000,
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
		let date, newTime;
	
	/**
	 * The Constructor object
	 * @param {number} timestamp - the timestamp to use, defaults to now
	 */
	function Constructor(timestamp, dateLocale, dateFormat = {}) {
		timestamp = !isNaN(timestamp) ? timestamp : new Date().getTime();
		dateLocale = dateLocale ? dateLocale : navigator.language;
		dateFormat = typeof dateFormat === 'object' ? Object.assign(defaultFormat, dateFormat) : defaultFormat;
		Object.freeze(dateFormat);
		date = new Date(timestamp).toLocaleString(dateLocale, dateFormat);
		
		Object.defineProperties(this, {
			_timestamp: {value: timestamp},
			_locale: {value: dateLocale},
			_format: {value: dateFormat},
			_date: {value: date}
		});
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n units added/subtracted	 	 
	 */		
	Constructor.prototype.fromNow = function(n, units) {
		return !isNaN(n) && times[units] ? new Constructor(this._timestamp + (n * times[units])) : this;					
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n seconds added/subtracted	 	 
	 */	
	Constructor.prototype.secondsFromNow = function(n) {
		return !isNaN(n) ? new Constructor(this._timestamp + (n * times.seconds)) : this;
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n minutes added/subtracted	 	 
	 */		
	Constructor.prototype.minutesFromNow = function(n) {
		return !isNaN(n) ? new Constructor(this._timestamp + (n * times.minutes)) : this;
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n hours added/subtracted	 	 
	 */		
	Constructor.prototype.hoursFromNow = function(n) {
		return !isNaN(n) ? new Constructor(this._timestamp + (n * times.hours)) : this;
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n days added/subtracted	 	 
	 */		
	Constructor.prototype.daysFromNow = function(n) {
		return !isNaN(n) ? new Constructor(this._timestamp + (n * times.days)) : this;
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n weeks added/subtracted	 	 
	 */		
	Constructor.prototype.weeksFromNow = function(n) {
		return !isNaN(n) ? new Constructor(this._timestamp + (n * times.weeks)) : this;
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n months added/subtracted	 	 
	 */		
	Constructor.prototype.monthsFromNow = function(n) {
		return !isNaN(n) ? new Constructor(this._timestamp + (n * times.months)) : this;
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n years added/subtracted	 	 
	 */		
	Constructor.prototype.yearsFromNow = function(n) {
		return !isNaN(n) ? new Constructor(this._timestamp + (n * times.years)) : this;
	}
	
	Constructor.prototype.getTimestamp = function() {
		return this._timestamp;
	}
	
	Constructor.prototype.getDate = function() {
		return this._date;
	}
	
	// Export the constructor object
	return Constructor;
})();

let now = new Stamp(),
	addSubtractInFiveMin = now.fromNow(5, 'minutes'),
	twentySecondsFromNow = now.secondsFromNow(20),
	twentyMinutesFromNow = now.minutesFromNow(20),
	threeHoursFromNow = now.hoursFromNow(3),
	threeDaysFromNow = now.daysFromNow(3),
	threeWeeksFromNow = now.weeksFromNow(3),
	threeMonthsFromNow = now.monthsFromNow(3),
	threeYearsFromNow = now.yearsFromNow(3);
	testThemAll = now.yearsFromNow(3).monthsFromNow(3).weeksFromNow(3).daysFromNow(3).minutesFromNow(3).secondsFromNow(3);

console.log(`Current Stamp: ${JSON.stringify(now)}`); // should be empty object, since properties are private
console.log(`In 5 minutes using fromNow, timestamp: ${addSubtractInFiveMin.getTimestamp()}, date: ${addSubtractInFiveMin.getDate()}`);
console.log(`In 20 seconds using secondsFromNow, timestamp: ${twentySecondsFromNow.getTimestamp()}, date: ${twentySecondsFromNow.getDate()}`);
console.log(`In 20 minutes using minutesFromNow, timestamp: ${twentyMinutesFromNow.getTimestamp()}, date: ${twentyMinutesFromNow.getDate()}`);
console.log(`In 3 hours using hoursFromNow, timestamp: ${threeHoursFromNow.getTimestamp()}, date: ${threeHoursFromNow.getDate()}`);
console.log(`In 3 days using daysFromNow, timestamp: ${threeDaysFromNow.getTimestamp()}, date: ${threeDaysFromNow.getDate()}`);
console.log(`In 3 weeks using weeksFromNow, timestamp: ${threeWeeksFromNow.getTimestamp()}, date: ${threeWeeksFromNow.getDate()}`);
console.log(`In 3 months using monthsFromNow, timestamp: ${threeMonthsFromNow.getTimestamp()}, date: ${threeMonthsFromNow.getDate()}`);
console.log(`In 3 years using yearsFromNow, timestamp: ${threeYearsFromNow.getTimestamp()}, date: ${threeYearsFromNow.getDate()}`);
console.log(`3 years, 3 months, 3 weeks, 3 hours, 3 minutes, and 3 seconds from now timestamp: ${testThemAll.getTimestamp()}, date: ${testThemAll.getDate()}`);


// Time Traveler testing form
let form = document.getElementById('form');
let formNum = document.getElementById('number');
let formUnits = document.getElementById('units');
let results = document.getElementById('results');

form.addEventListener('submit', function(event) {
	event.preventDefault();
	let formDate = new Stamp().fromNow(formNum.value, formUnits.value).getDate();	
	results.innerText = `The date and time ${Number(formNum.value)} ${formUnits.value} from now will be ${formDate}`;
});
