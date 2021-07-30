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
		defaultLocale = navigator.language,
		defaultFormat = {
			dateStyle: 'long',
			timeStyle: 'long',
			hour12: true			
		};	
		let newTime;
	
	/**
	 * The Constructor object
	 * @param {number} timestamp - the timestamp to use, defaults to now
	 */
	function Constructor(timestamp, locale, format = {}) {
		this.timestamp = ! isNaN(timestamp) ? timestamp : now;
		this.dateLocale = locale ? locale : defaultLocale;
		this.dateFormat = typeof format === 'object' ? Object.assign(defaultFormat, format) : defaultFormat;
		this.date = new Date(this.timestamp).toLocaleString(this.dateLocale, this.dateFormat);
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n units added/subtracted	 	 
	 */		
	Constructor.prototype.fromNow = function(n, units) {
		return !isNaN(n) && times[units] ? new Constructor(this.timestamp + (n * times[units])) : this;					
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n seconds added/subtracted	 	 
	 */	
	Constructor.prototype.secondsFromNow = function(n) {
		return !isNaN(n) ? new Constructor(this.timestamp + (n * times.seconds)) : this;
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n minutes added/subtracted	 	 
	 */		
	Constructor.prototype.minutesFromNow = function(n) {
		return !isNaN(n) ? new Constructor(this.timestamp + (n * times.minutes)) : this;
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n hours added/subtracted	 	 
	 */		
	Constructor.prototype.hoursFromNow = function(n) {
		return !isNaN(n) ? new Constructor(this.timestamp + (n * times.hours)) : this;
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n days added/subtracted	 	 
	 */		
	Constructor.prototype.daysFromNow = function(n) {
		return !isNaN(n) ? new Constructor(this.timestamp + (n * times.days)) : this;
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n weeks added/subtracted	 	 
	 */		
	Constructor.prototype.weeksFromNow = function(n) {
		return !isNaN(n) ? new Constructor(this.timestamp + (n * times.weeks)) : this;
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n months added/subtracted	 	 
	 */		
	Constructor.prototype.monthsFromNow = function(n) {
		return !isNaN(n) ? new Constructor(this.timestamp + (n * times.months)) : this;
	}

	/**
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @return {number} A future/past timestamp with n years added/subtracted	 	 
	 */		
	Constructor.prototype.yearsFromNow = function(n) {
		return !isNaN(n) ? new Constructor(this.timestamp + (n * times.years)) : this;
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

console.log(`Current Stamp: ${JSON.stringify(now)}`);
console.log(`In 5 minutes using fromNow, timestamp: ${addSubtractInFiveMin.timestamp}, date: ${addSubtractInFiveMin.date}`);
console.log(`In 20 seconds using secondsFromNow, timestamp: ${twentySecondsFromNow.timestamp}, date: ${twentySecondsFromNow.date}`);
console.log(`In 20 minutes using minutesFromNow, timestamp: ${twentyMinutesFromNow.timestamp}, date: ${twentyMinutesFromNow.date}`);
console.log(`In 3 hours using hoursFromNow, timestamp: ${threeHoursFromNow.timestamp}, date: ${threeHoursFromNow.date}`);
console.log(`In 3 days using daysFromNow, timestamp: ${threeDaysFromNow.timestamp}, date: ${threeDaysFromNow.date}`);
console.log(`In 3 weeks using weeksFromNow, timestamp: ${threeWeeksFromNow.timestamp}, date: ${threeWeeksFromNow.date}`);
console.log(`In 3 months using monthsFromNow, timestamp: ${threeMonthsFromNow.timestamp}, date: ${threeMonthsFromNow.date}`);
console.log(`In 3 years using yearsFromNow, timestamp: ${threeYearsFromNow.timestamp}, date: ${threeYearsFromNow.date}`);

console.log(`Stamp object 3 years, 3 months, 3 weeks, 3 hours, 3 minutes, and 3 seconds from now: ${JSON.stringify(new Stamp().yearsFromNow(3).monthsFromNow(3).weeksFromNow(3).daysFromNow(3).minutesFromNow(3).secondsFromNow(3))}`);


// Time Traveler testing form
let form = document.getElementById('form');
let results = document.getElementById('results');
let years = document.getElementById('years');
let months = document.getElementById('months');
let weeks = document.getElementById('weeks');
let days = document.getElementById('days');
let hours = document.getElementById('hours');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let formTime = new Stamp();
let mods = '';

form.addEventListener('submit', function(event) {
	event.preventDefault();
	let formTime = new Stamp().yearsFromNow(years.value).monthsFromNow(months.value).weeksFromNow(weeks.value).daysFromNow(days.value).minutesFromNow(minutes.value).secondsFromNow(seconds.value);

	results.innerText = `The date and time in ${years.value} years, ${months.value} months, ${days.value} days, ${hours.value} hours, ${minutes.value} minutes, and ${seconds.value} seconds from now will be ${formTime.date}`;
});
