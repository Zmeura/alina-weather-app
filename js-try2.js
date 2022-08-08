function updateTime() {
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
}

setInterval(updateTime, 1000);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

let apiKey = "3ce209b8047a12ec6d4a03afe5ecbc6d";
let units = "metric";
let currentcity = document.querySelector("#currentcity");

function displayForecast(response) {
  let forecast = response.data.daily;
  let weekForecast = document.querySelector("#weekforecast");

  function displayForecastMetric() {
    let forecastHTML = `<div class="weekforecast" id="weekforecast">`;

    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
        forecastHTML =
          forecastHTML +
          `<div class="col2">
          <div class="current_day_weather_min_max">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img
            src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="60"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> ${Math.round(
              forecastDay.temp.max
            )}° </span>
            <span class="weather-forecast-temperature-min"> ${Math.round(
              forecastDay.temp.min
            )}° </span>
          </div>
          </div>
        </div>`;
      }
    });
    forecastHTML = forecastHTML + `</div>`;

    weekForecast.innerHTML = forecastHTML;
  }
  displayForecastMetric();

  function displayForecastImperial() {
    let forecastHTML = `<div class="weekforecast" id="weekforecast">`;

    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
        forecastHTML =
          forecastHTML +
          `<div class="col2">
          <div class="current_day_weather_min_max">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img
            src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="60"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> ${Math.round(
              (forecastDay.temp.max * 9) / 5 + 32
            )}° </span>
            <span class="weather-forecast-temperature-min"> ${Math.round(
              (forecastDay.temp.min * 9) / 5 + 32
            )}° </span>
          </div>
          </div>
        </div>`;
      }
    });
    forecastHTML = forecastHTML + `</div>`;

    weekForecast.innerHTML = forecastHTML;
  }
  fahrenheitTemperature.addEventListener("click", displayForecastImperial);
  celsiusTemperature.addEventListener("click", displayForecastMetric);
}

function getForcastMetric(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  fahrenheitTemperature.classList.remove("active");
  celsiusTemperature.classList.add("active");
  fahrenheitTemperature.classList.add("noactive");
  celsiusTemperature.classList.remove("noactive");
  let enterCity = response.data.name;
  currentcity.innerHTML = enterCity;

  celsius = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#currenttemperature");
  temperatureElement.innerHTML = celsius;

  let humidityElement = response.data.main.humidity;
  humidityValue.innerHTML = humidityElement;

  let windElement = response.data.wind.speed;
  windValue.innerHTML = windElement;

  let weatherDiscription = document.querySelector("#weatherdiscription");
  weatherDiscription.innerHTML = response.data.weather[0].description;

  let iconCode = response.data.weather[0].icon;

  let iconElement = document.querySelector("#weathericon");
  iconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="weather icon" id="weathericon" class="weathericon">`;

  getForcastMetric(response.data.coord);
}

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

let currentButton = document.querySelector("#currentbutton");
currentButton.addEventListener("click", showCurrenLocation);

function showCurrenLocation() {
  navigator.geolocation.getCurrentPosition(searchPosition);
}

function searchPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrlPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrlPosition).then(showWeather);
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

let currenttemperature = document.querySelector("#currenttemperature");
let celsius = null;

function tofahrenheit() {
  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
  currenttemperature.innerHTML = fahrenheit;
  celsiusTemperature.classList.remove("active");
  fahrenheitTemperature.classList.remove("noactive");
  celsiusTemperature.classList.add("noactive");
  fahrenheitTemperature.classList.add("active");
}
let fahrenheitTemperature = document.querySelector(".fahrenheitelement");
fahrenheitTemperature.addEventListener("click", tofahrenheit);
function tocelsius() {
  currenttemperature.innerHTML = celsius;
  fahrenheitTemperature.classList.remove("active");
  celsiusTemperature.classList.add("active");
  fahrenheitTemperature.classList.add("noactive");
  celsiusTemperature.classList.remove("noactive");
}
let celsiusTemperature = document.querySelector(".celsiuselement");
celsiusTemperature.addEventListener("click", tocelsius);

// showCurrenLocation();
searchCity("Odesa");
