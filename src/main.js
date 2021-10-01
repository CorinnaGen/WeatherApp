let apiKey = "94128e0a800f0999e0bbd83894a5cfd3";
let units = "metric";


function showCity(event) {
  event.preventDefault();
  let cityForm = document.querySelector("#city-input");
  let h1 = document.querySelector("#heading");
  h1.innerHTML = `${cityForm.value}`;
  searchCity(cityForm.value) 
}
function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
  apiUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

let form = document.querySelector("#choose-form");
form.addEventListener("submit", showCity);

function showTemperature(response) {
  //console.log(response);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  let currentCity = document.querySelector("#heading");
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
  getForecast(response.data.coord);
  }

// Forecast per hours and per days

function displayForecast(response){
  //console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = response.data.list;
  forecast.forEach((val, i)=>{
  if(i <4){
  forecastElement.innerHTML += `<div class="col-3">
          ${formatHours(val.dt * 1000)} h
          <br />
          <img src="http://openweathermap.org/img/wn/${val.weather[0].icon}@2x.png"/><br>
          <strong>${Math.round(val.main.temp_max)}º</strong>||${Math.round(val.main.temp_min)}º
        </div>`
  }});
}
  function getForecast(coordinates){
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeeklyForecast);
}

function displayWeeklyForecast(response){
  //console.log(response.data.daily);
let weeklyForecastElement = document.querySelector("#weekly-forecast");
   weeklyForecastElement.innerHTML= null;
let weeklyForecast = response.data.daily;

 weeklyForecast.forEach((val, i )=>{
   if (i < 4){
  weeklyForecastElement.innerHTML += `<div class="col-3">
<span><h5>${formatDay(val.dt)}</h5></span>
<br/>
<img src="http://openweathermap.org/img/wn/${val.weather[0].icon}@2x.png" />
<div>
<strong>${Math.round(val.temp.max)}</strong>º|| º${Math.round(val.temp.min)}</div></div>`}});
 }


//shows forecast of the current location

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
  
}
function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
   apiUrl= `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
;
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentLocation);



searchCity("Bari");

