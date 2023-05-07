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

let currentDate = document.querySelector("h3");
let now = new Date();
let citySearch = document.querySelector("#city-form");

currentDate.innerHTML = formatDate(now);
citySearch.addEventListener("submit", updateCity);

function searchCity(city) {
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function displayCurrentWeather(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let minTemp = Math.round(response.data.main.temp_min);
  let maxTemp = Math.round(response.data.main.temp_max);
  let description = response.data.weather[0].main;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#current-degrees").innerHTML = `${currentTemp}`;
  document.querySelector("#min-max").innerHTML = `${maxTemp}°F / ${minTemp}°F`;
  document.querySelector("#description").innerHTML = `${description}`;
  document.querySelector("#wind").innerHTML = `${wind}mph`;
  console.log(response);
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

let currentLocationButton = document.querySelector("#search-current");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
