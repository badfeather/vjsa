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

/**
 * Get the weather forecast
 * @param {string} appSelector - The selector for the container where the forecast should render, defaults to '#app'
 * @param {string} apiKey - The weather API key
 * @param {boolean} iconPath -  The path for the weather icons
 * @param {string} errorMsg - The error message to display if there is an error retrieving weather data
 * @param {string} lang - The two-letter language code, defaults to 'en'
 * @param {string} units - The units to use ('M' for metric, 'I' for fahrenheit, 'S' for scientific), defaults to 'I'
 */
function forecast( appSelector = '#app', apiKey, iconPath, errorMsg, lang, units ) {
	let geo = navigator.geolocation;
	let app = document.querySelector( appSelector );
	// bail early if geolocation isn't supported
	if (!geo) {
		app.textContent = 'Sorry, geolocation is not supported by your browser';
		return;
	}
	if (!apiKey) {
		throw 'Please provide your api key.';
		return;
	}
	let endpoint = 'https://api.weatherbit.io/v2.0/forecast/hourly';
	iconPath = iconPath ? sanitizeHTML(iconPath) : 'https://www.weatherbit.io/static/img/icons/';
	errorMsg = errorMsg ? sanitizeHTML(errorMsg) : 'Unable to get weather data at this time.';
	lang = lang ? lang : 'en';
	units = units === ('M' || 'S' || 'I') ? units : 'I';
	let degreeName, speedName, distName, depthName;
	switch (units) {
		case 'M':
			degreeName = 'C';
			speedName = 'm/s';
			depthName = 'mm';
			distName = 'km';
			break;
		case 'S':
			degreeName = 'K';
			speedName = 'm/s';
			depthName = 'mm';
			distName = 'km';
			break;
		case 'I':
			degreeName = 'F';
			speedName = 'mph';
			depthName = 'in';
			distName = 'mi';
			break;
	}
	let q;
	
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
	
	function renderForecast(data) {
		let html, hour, uv, uvDesc, time;
		let i = 0;
		html = `<h2>12 Hour Forecast for ${sanitizeHTML(data.city_name)}, ${sanitizeHTML(data.state_code)}</h2>`;
		for (let hour of data.data) {
			//console.log(JSON.stringify(hour));
			time = new Date(sanitizeHTML(hour.ts) * 1000).toLocaleString(navigator.language);		
			uv = sanitizeHTML(hour.uv);
			uvDesc = getUviDesc(uv);
			
			html += `
			<details${i === 0 ? ' open' : ''}>
				<summary>
					${time}</th>: <img src="${iconPath}${sanitizeHTML(hour.weather.icon)}.png" alt="" width="30" height="30"> ${sanitizeHTML(hour.temp)}&deg; ${degreeName}, ${sanitizeHTML(hour.weather.description)}

				</summary>
				<table class="hour-data">
					<tr>
						<th>Feels Like</th>
						<td>${sanitizeHTML(hour.app_temp)}&deg; ${degreeName}</td>
					</tr>
					<tr>
						<th>Humidity</th>
						<td>${sanitizeHTML(hour.rh)}%</td>
					</tr>	
					<tr>
						<th>Precipitation</th>
						<td>${sanitizeHTML(hour.precip)} ${depthName}/hr</td>
					</tr>	
					<tr>
						<th>Cloud Cover</th>
						<td>${sanitizeHTML(hour.clouds)}%</td>
					</tr>	
					<tr>
						<th>Wind</th>
						<td>${sanitizeHTML(hour.wind_spd)} ${speedName}, ${sanitizeHTML(hour.wind_cdir)}</td>
					</tr>
					<tr>
						<th>UV Index</th>
						<td>${uv}  (${uvDesc})</td>
					</tr>	
					<tr>
						<th>Visibility</th>
						<td>${sanitizeHTML(hour.vis)} ${distName}</td>
					</tr>	
					<tr>
						<th>Pressure</th>
						<td>${sanitizeHTML(hour.pres)} mb</td>
					</tr>	
					<tr>
						<th>Dew Point</th>
						<td>${sanitizeHTML(hour.dewpt)}&deg; F</td>
					</tr>	
				</table>
			</details>
			`;
			i++;	
		}
		app.innerHTML = html;		
	} 
	
	function noWeather() {
		app.textContent = errorMsg;
	}
	
	function fetchWeather(pos) {	
		let lat = pos.coords.latitude;
		let lon = pos.coords.longitude;
		// Make the API call
		fetch(`${endpoint}?key=${apiKey}&units=${units}&lang=${lang}&lat=${lat}&lon=${lon}&hours=12`).then(function(response) {
			if (response.ok) {
				return response.json();
			}
			throw response;
		}).then(function(data) {
			//console.log(JSON.stringify(data.data));
			renderForecast(data);
			
		})
		.catch(function(error) {
			console.log(error);
			noWeather();
		});
	}
	geo.getCurrentPosition(fetchWeather, noWeather);
}

forecast( '#app', 'e777313cc4834a5f8a16306e0de2c6e6', 'https://www.weatherbit.io/static/img/icons/' );