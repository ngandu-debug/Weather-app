
    function getWeather() {
      const apikey = '9c9fad62b51a725370d7f7b218e2fc96';
      const city = document.getElementById('City-search').value;

      if (!city) {
        alert('Please enter a city');
        return;
      }

      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;

      // Fetch current weather
      fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
          console.error('Error fetching current weather data:', error);
          alert('Error fetching weather data. Please try again.');
        });

      // Fetch forecast
      fetch(forecastUrl)
        .then(response => response.json())
        .then(data => displayHourlyForecast(data.list))
        .catch(error => {
          console.error('Error fetching hourly forecast data:', error);
          alert('Error fetching hourly forecast data. Please try again.');
        });
    }

    function displayWeather(data) {
      const tempDivInfo = document.getElementById('temp-div');
      const weatherInfoDiv = document.getElementById('weather-info');
      const weatherIcon = document.getElementById('Weather-icon');
      const hourlyForecastDiv = document.getElementById('hourly-forecast');

      weatherInfoDiv.innerHTML = '';
      hourlyForecastDiv.innerHTML = '';
      tempDivInfo.innerHTML = '';

      if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
      } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        tempDivInfo.innerHTML = `<p>${temperature}°C</p>`;
        weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>${description}</p>`;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
        weatherIcon.style.display = 'block';
      }
    }

    function displayHourlyForecast(hourlyData) {
      const hourlyForecastDiv = document.getElementById('hourly-forecast');
      const next24Hours = hourlyData.slice(0, 8);

      next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const hourlyItemHtml = `
          <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature}°C</span>
          </div>`;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
      });
      
      if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
   
   
   
    }
  