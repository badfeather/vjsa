/**
 * Sanitize and encode all HTML in a user-submitted string
 * https://portswigger.net/web-security/cross-site-scripting/preventing
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
function sanitizeHTML(str) {
	return str.toString().replace(/javascript:/gi, '').replace(/[^\w-_. ]/gi, function(c) {
		return `&#${c.charCodeAt(0)};`;
	});
}

(function () {
	let geo = navigator.geolocation;
	let app = document.getElementById( 'app' );
	// bail early if geolocation isn't supported
	if (! geo) {
		app.textContent = 'Sorry, geolocation is not supported by your browser';
		return;
	}
	let endpoint = 'https://api.weatherbit.io/v2.0/current';
	let apiKey = 'e777313cc4834a5f8a16306e0de2c6e6';
	let iconPath = 'https://www.weatherbit.io/static/img/icons/';
	let q;
		
	/**
	 * Log an error message
	 * @param  {Object} error The error details
	 */
	function logError(error) {
		app.textContent = 'Sorry, there was an error fetching your weather data.';
		console.warn(error);
	}
	
	function getAirQualityDesc(aqi) {
		q = false;
		if (! aqi) {
			return q;
		}
		if (aqi > 300) {
			q = 'hazardous';
		} else if (aqi > 200) {
			q = 'very unhealthy';
		} else if (aqi > 150) {
			q = 'unhealthy';
		} else if (aqi > 100) {
			q = 'unhealthy for sensitive groups';
		} else if (aqi > 50) {
			q  = 'moderate';
		} else {
			q = 'good';
		}
		return q;
	}
	
	function getUviDesc(uv) {
		q = false;
		if (! uv) {
			return q;
		}
		if (uv >= 11) {
			q = 'very high risk';
		} else if (uv >= 8) {
			q = 'high risk';
		} else if (uv >= 6) {
			q = 'moderate risk';
		} else if (uv >= 3) {
			q = 'low risk';
		} else {
			q = 'minimal risk';
		}
		return q;
	}
	
	function renderWeather(weather) {
		let date = new Date();
		let formatDate = date.toLocaleString(navigator.language, {
			dateStyle: 'long',
			timeStyle: 'short',
			hour12: true
		});
		let aqi = sanitizeHTML(weather.aqi);
		let uv = sanitizeHTML(weather.uv);
		let aqiDesc = getAirQualityDesc(aqi);
		let uvDesc = getUviDesc(uv);
		
		app.innerHTML = `
		<h2>Local weather in ${sanitizeHTML(weather.city_name)}, ${sanitizeHTML(weather.state_code)} on ${formatDate}</h2>
		<table class="weather-data">
			<tr>
				<th>Outlook</th>
				<td><img src="${iconPath}${sanitizeHTML(weather.weather.icon)}.png" alt="" width="30" height="30"> ${sanitizeHTML(weather.weather.description)}</td>
			</tr>
			<tr>
				<th>Temperature</th>
				<td>${sanitizeHTML(weather.temp)}&deg; F</td>
			</tr>	
			<tr>
				<th>Feels Like</th>
				<td>${sanitizeHTML(weather.app_temp)}&deg; F</td>
			</tr>
			<tr>
				<th>Humidity</th>
				<td>${sanitizeHTML(weather.rh)}%</td>
			</tr>	
			<tr>
				<th>Precipitation</th>
				<td>${sanitizeHTML(weather.precip)} in/hr</td>
			</tr>	
			<tr>
				<th>Cloud Cover</th>
				<td>${sanitizeHTML(weather.clouds)}%</td>
			</tr>	
			<tr>
				<th>Wind</th>
				<td>${sanitizeHTML(weather.wind_spd)} mph, ${sanitizeHTML(weather.wind_cdir)}</td>
			</tr>
			<tr>
				<th>UV Index</th>
				<td>${uv}  (${uvDesc})</td>
			</tr>	
			<tr>
				<th>Visibility</th>
				<td>${sanitizeHTML(weather.vis)} mi</td>
			</tr>	
			<tr>
				<th>Pressure</th>
				<td>${sanitizeHTML(weather.pres)} mb</td>
			</tr>	
			<tr>
				<th>Air Quality</th>
				<td>${aqi} (${aqiDesc})</td>
			</tr>	
			<tr>
				<th>Dew Point</th>
				<td>${sanitizeHTML(weather.dewpt)}&deg; F</td>
			</tr>	
		</table>
		`;			
	}
	
	function noWeather() {
		app.textContent = 'Unable to get weather data at this time.';
	}
	
	function fetchWeather(pos) {	
		let lat = pos.coords.latitude;
		let lon = pos.coords.longitude;
		// Make the API call
		fetch(`${endpoint}?key=${apiKey}&units=I&lat=${lat}&lon=${lon}`).then(function(response) {
			if (response.ok) {
				return response.json();
			}
			throw response;
		}).then(function(data) {
			//console.log(JSON.stringify(data));
			renderWeather(data.data[0]);	
		})
		.catch(function(error) {
			console.log(error);
			noWeather();
		});
	}
	geo.getCurrentPosition(fetchWeather, logError);
})();