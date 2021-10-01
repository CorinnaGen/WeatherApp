function convertToF(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp*9)/5+32;
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function convertToC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

function convertTemp() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(convertToC).then(convertToF);
}

let celsiusTemp = null;

let fahLink = document.querySelector("#fahLink");
let celsiusLink = document.querySelector("#cLink");
fahLink.addEventListener("click", convertToF);
celsiusLink.addEventListener("click", convertToC);