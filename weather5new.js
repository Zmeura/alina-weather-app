let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let today = document.querySelector("#dayofweekanftime");
today.innerHTML = `${day} ${hour}:${minutes}`;

let apiKey = "95d7d2d06b9ed1ae1ccca7fcd6a50893";
let units = "metric";
let currentcity = document.querySelector("#currentcity");

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let currenttemperature = document.querySelector("#currenttemperature");
let celsius = currenttemperature.innerHTML;
let fahrenheit = Math.round((celsius * 9) / 5 + 32);

function tofahrenheit() {
  currenttemperature.innerHTML = fahrenheit;
}
let fahrenheitTemperature = document.querySelector(".fahrenheit");
fahrenheitTemperature.addEventListener("click", tofahrenheit);

function tocelsius() {
  currenttemperature.innerHTML = celsius;
}
let celsiusTemperature = document.querySelector(".celsius");
celsiusTemperature.addEventListener("click", tocelsius);

let currentButton = document.querySelector("#currentbutton");
currentButton.addEventListener("click", showCurrenLocation);

function showCurrenLocation() {
  navigator.geolocation.getCurrentPosition(searchPosition);
}

function searchPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "metric";
  let apiUrlPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrlPosition).then(showWeather);
}

function showWeather(response) {
  let enterCity = response.data.name;
  currentcity.innerHTML = enterCity;

  let temperatureCelsius = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#currenttemperature");
  temperatureElement.innerHTML = temperatureCelsius;

  let humidityElement = response.data.main.humidity;
  humidityValue.innerHTML = humidityElement;

  let windElement = response.data.wind.speed;
  windValue.innerHTML = windElement;
}

let humidityValue = document.querySelector("#humidityvalue");
let windValue = document.querySelector("#windvalue");

let kiev = document.querySelector("#kiev");
kiev.addEventListener("click", function () {
  searchCity("kiev");
});
let odessa = document.querySelector(".odessa");
odessa.addEventListener("click", function () {
  searchCity("odessa");
});
let lviv = document.querySelector(".lviv");
lviv.addEventListener("click", function () {
  searchCity("lviv");
});
let kharkiv = document.querySelector(".kharkiv");
kharkiv.addEventListener("click", function () {
  searchCity("kharkiv");
});
let dnepr = document.querySelector(".dnepr");
dnepr.addEventListener("click", function () {
  searchCity("dnepr");
});

showCurrenLocation();
