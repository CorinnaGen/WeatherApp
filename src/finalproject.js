let currentTime = new Date();
let h2 = document.querySelector("#current-time");
let date = currentTime.getDate();
let year = currentTime.getFullYear();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fry", "Sat"];
let day = days[currentTime.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[currentTime.getMonth()];

h2.innerHTML = `Today is ${day}, ${month}, ${date}, ${year}, ${hours}:${minutes}`;

function showCity(event) {
  event.preventDefault();
  let cityForm = document.querySelector("#city-input");
  let h1 = document.querySelector("#heading");
  h1.innerHTML = `${cityForm.value}`;
  searchCity(cityForm.value);
}
let form = document.querySelector("#choose-form");
form.addEventListener("submit", showCity);

function searchCity(city) {
  let apiKey = "94128e0a800f0999e0bbd83894a5cfd3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  console.log(response.data);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}ºC`;
  let city = response.data.name;
  let currentCity = document.querySelector("#city-input");
  currentCity.innerHTML = city;
  let description = document.querySelector("#description");
  description.innerHTML= `${response.data.weather.description}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.main.wind.speed}`;
}

function currentLocation(event) {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "94128e0a800f0999e0bbd83894a5cfd3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentLocation);

function convertToF(event, response) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}ºC`;
}

function convertToC(event, response) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}ºC`;
}

function convertTempC(response) {
  let apiKey = "94128e0a800f0999e0bbd83894a5cfd3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(convertToC);
}

function convertTempF(response) {
  let apiKey = "94128e0a800f0999e0bbd83894a5cfd3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(convertToF);
}

let fahLink = document.querySelector("#fahLink");
let celsiusLink = document.querySelector("#cLink");
fahLink.addEventListener("click", convertToF);
celsiusLink.addEventListener("click", convertToC);