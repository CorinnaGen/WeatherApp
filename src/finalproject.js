let currentTime = new Date();
let h2 = document.querySelector("#current-time");
let date = currentTime.getDate();
let year = currentTime.getFullYear();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

function formatHours(timestamp){
  let currentTime = new Date(timestamp);
  let hours = currentTime.getHours();
  if(hours< 10){hours = `0${hours}`;}
let minutes = currentTime.getMinutes();
if (minutes <10){
  minutes =`0${minutes}`;
}
  return `${hours}:${minutes}`

}


function showCity(event) {
  event.preventDefault();
  let cityForm = document.querySelector("#city-input");
  let h1 = document.querySelector("#heading");
  h1.innerHTML = `${cityForm.value}`;
  searchCity(cityForm.value);
}
let form = document.querySelector("#choose-form");
form.addEventListener("submit", showCity);

function displayForecast(response){
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for(let index=0; index < 4; index++){
    forecast = response.data.list[index];
  forecastElement.innerHTML += `<div class="col-3">
          ${formatHours(forecast.dt * 1000)} h
          <br />
          <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/><br>
          <strong>${Math.round(forecast.main.temp_max)}º</strong>||${Math.round(forecast.main.temp_min)}º
        </div>`
  }

  let tomorrowTemp = document.querySelector("weather-tomorrow");
  tomorrowTemp.innerHTML= `${Math.round()}`

}

function searchCity(city) {
  let apiKey = "94128e0a800f0999e0bbd83894a5cfd3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  apiUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function showTemperature(response) {
  console.log(response.data);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}ºC`;
  let currentCity = document.querySelector("#city-input");
  currentCity.innerHTML = response.data.name;
  let description = document.querySelector("#description");
  description.innerHTML= `${response.data.weather[0].description}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} Km/H`;
  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  celsiusTemp = Math.round(response.data.main.temp);
  }


function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
 
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "94128e0a800f0999e0bbd83894a5cfd3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentLocation);

function convertToF(event, response) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp*9)/5+32;
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function convertToC(event, response) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
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

let celsiusTemp = null;

let fahLink = document.querySelector("#fahLink");
let celsiusLink = document.querySelector("#cLink");
fahLink.addEventListener("click", convertToF);
celsiusLink.addEventListener("click", convertToC);

searchCity("Bari");