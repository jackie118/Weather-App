function formatDate(date) {
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} at ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thursday", "Friday", "Saturday", "Sunday", "Monday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2">
    <div class ="weather-forecast-day">
      ${day}
      </div>
      <img
        src="https://openweathermap.org/img/wn/10d@2x.png"
        alt=""
        id="forecast-icon-1"
        height="100"
        width="100"
      />
      <div class="weather-forecast-temp">
      <span class="forecast-max">59° </span>
      <span class="forecast-min">37°</span>
      </div>
  </div>
`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayCurrentWeather(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let minTemp = Math.round(response.data.main.temp_min);
  let maxTemp = Math.round(response.data.main.temp_max);
  let description = response.data.weather[0].main;
  let wind = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;

  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#current-degrees").innerHTML = `${currentTemp}`;
  document.querySelector("#min-max").innerHTML = `${maxTemp}°F / ${minTemp}°F`;
  document.querySelector("#description").innerHTML = `${description}`;
  document.querySelector("#wind").innerHTML = `${wind}mph`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function updateCity(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#city-name").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let currentTemp = document.querySelector("#current-degrees");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let currentTemp = document.querySelector("#current-degrees");
  currentTemp.innerHTML = Math.round(fahrenheitTemperature);
}

let currentDate = document.querySelector("h3");
let now = new Date();
let citySearch = document.querySelector("#city-form");

currentDate.innerHTML = formatDate(now);
citySearch.addEventListener("submit", updateCity);

let currentLocationButton = document.querySelector("#search-current");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let fahrenheitTemperature = null;

searchCity("New York");
displayForecast();
