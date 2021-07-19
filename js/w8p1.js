let stamp = (function() {	
	/**
	 * Utility Function
	 * @param {number} n - a positive or negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @param {number} timestamp - a UTC timestamp - defaults to current time
	 * @return {number} A future/past timestamp with n units added/subtracted	 	 
	 */	
	function addSubtractTime(n, units, timestamp = new Date().getTime()) {
		let seconds = 1000,
			minutes = seconds * 60,
			hours = minutes * 60,
			days = hours * 24,
			weeks = days * 7,
			months = days * 30,
			years = days * 365,
			times = {seconds, minutes, hours, days, weeks, months, years};
		if (!times[units] || !n || !timestamp) return;
		return timestamp + n * times[units];				
	}

	
	function addSubtractSeconds(n, timestamp) {
		return addSubtractTime(n, 'seconds', timestamp);
	}
	
	function addSubtractMinutes(n, timestamp) {
		return addSubtractTime(n, 'minutes', timestamp);
	}
	
	function addSubtractHours(n, timestamp) {
		return addSubtractTime(n, 'hours', timestamp);
	}
	
	function addSubtractDays(n, timestamp) {
		return addSubtractTime(n, 'days', timestamp);
	}
	
	function addSubtractWeeks(n, timestamp) {
		return addSubtractTime(n, 'weeks', timestamp);
	}
	
	function addSubtractMonths(n, timestamp) {
		return addSubtractTime(n, 'months', timestamp);
	}
	
	function addSubtractYears(n, timestamp) {
		return addSubtractTime(n, 'years', timestamp);
	}
	
	/**
	 * Utility function
	 * @param {number} timestamp - a UTC timestamp
	 * @param {object} options - an object of toLocaleString options, defaults to:
	 *	{
	 *		locale: navigator.language,
	 *		format: {
	 *			dateStyle: 'long',
	 *			timeStyle: 'long',
	 *			hour12: true			
	 *	}
	 * @return {string} A formatted date string	 	 
	 */
	function getDate(timestamp, options = {}) {
		if (typeof timestamp !== 'number') return;
		let defaults = {
			locale: navigator.language,
			format: {
				dateStyle: 'long',
				timeStyle: 'long',
				hour12: true			
			},
		};	
		let {locale, format} = Object.assign(defaults, options);
		return new Date(timestamp).toLocaleString(locale, format);
	}
	
	/**
	 * Utility function
	 * @param {number} n - a positive/negative integer
	 * @param {string} units - expects 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', or 'years'
	 * @param {number} timestamp - a UTC timestamp
	 * @param {object} options - an object of toLocaleString options, defaults to:
	 *	{
	 *		locale: navigator.language,
	 *		format: {
	 *			dateStyle: 'long',
	 *			timeStyle: 'long',
	 *			hour12: true			
	 *	}
	 * @uses addSubtractTime(), getDate()
	 * @return {string} formatted future/past date
	 */	 
	function getFuturePastDate(n, units, timestamp, options) {
		let newTime = addSubtractTime(n, units, timestamp);
		return getDate(newTime, options);
	}
	
	function getFuturePastSecondDate(n, timestamp, options) {
		return getFuturePastDate(n, 'seconds', options);
	}
	
	function getFuturePastMinuteDate(n, timestamp, options) {
		return getFuturePastDate(n, 'minutes', options);
	}
	
	function getFuturePastHourDate(n, timestamp, options) {
		return getFuturePastDate(n, 'hours', options);
	}

	function getFuturePastDayDate(n, timestamp, options) {
		return getFuturePastDate(n, 'days', options);
	}
	
	function getFuturePastWeekDate(n, timestamp, options) {
		return getFuturePastDate(n, 'weeks', options);
	}
	
	function getFuturePastMonthDate(n, timestamp, options) {
		return getFuturePastDate(n, 'months', options);
	}
	
	function getFuturePastYearDate(n, timestamp, options) {
		return getFuturePastDate(n, 'years', options);
	}
	
	return {
		addSubtractTime, 
		addSubtractSeconds,
		addSubtractMinutes,
		addSubtractHours, 
		addSubtractDays,
		addSubtractWeeks, 
		addSubtractMonths, 
		addSubtractYears, 
		getDate,
		getFuturePastDate, 
		getFuturePastSecondDate,
		getFuturePastMinuteDate,
		getFuturePastHourDate,
		getFuturePastDayDate,
		getFuturePastWeekDate,
		getFuturePastMonthDate,
		getFuturePastYearDate
	};
})();

console.log('The time 20 seconds from now will be ' + stamp.getFuturePastSecondDate(20));
console.log('The time 20 minutes from now will be ' + stamp.getFuturePastMinuteDate(20));
console.log('The time 3 hours from now will be ' + stamp.getFuturePastHourDate(3));
console.log('The time 3 days from now will be ' + stamp.getFuturePastDayDate(3));
console.log('The time 3 weeks from now will be ' + stamp.getFuturePastWeekDate(3));
console.log('The time 3 months from now will be ' + stamp.getFuturePastMonthDate(3));
console.log('The time 3 years from now will be ' + stamp.getFuturePastYearDate(3));

// Time Traveler testing form
let form = document.getElementById('form');
let formNum = document.getElementById('number');
let formUnits = document.getElementById('units');
let results = document.getElementById('results');

form.addEventListener('submit', function(event) {
	event.preventDefault();
	results.innerText = `The date and time ${formNum.value} ${formUnits.value} from now will be ${stamp.getFuturePastDate(formNum.value, formUnits.value)}`;
});
