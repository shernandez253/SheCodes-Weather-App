//display formatted current date and time
function formatDateTime() {
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
  let minutes = now.getMinutes();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}

//display city
function displayLocationEntered(event) {
  event.preventDefault();
  let citySearch = document.querySelector(".form-control");
  let cityDisplay = document.querySelector("#city");
  cityDisplay.innerHTML =
    citySearch.value.charAt(0).toUpperCase() + citySearch.value.slice(1);
  getTemperature(citySearch.value);
}

//get temperature of city entered
function getTemperature(city) {
  let apiKey = "9c0a0dd5ce072e1ac8919092ab708dad";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

//display temperature
function displayTemperature(response) {
  let maxTemp = document.querySelector("#high-temperature");
  let maxTempInt = parseInt(response.data.main.temp_max);
  maxTemp.innerHTML = maxTempInt;

  let lowTemp = document.querySelector("#low-temperature");
  let lowTempInt = parseInt(response.data.main.temp_min);
  lowTemp.innerHTML = lowTempInt;
}

//celcius conversion
function changeToCelcius() {
  let highTemperature = document.querySelector("#high-temperature");
  let lowTemperature = document.querySelector("#low-temperature");
  //JS Number cast :D
  highTemperature.innerHTML = `${Number("32")}°`;
  lowTemperature.innerHTML = `${Number("28")}°`;
}

//farenheit conversion
function changeToFarenheit() {
  let highTemperature = document.querySelector("#high-temperature");
  let lowTemperature = document.querySelector("#low-temperature");
  highTemperature.innerHTML = `${Number("90")}°`;
  lowTemperature.innerHTML = `${Number("83")}°`;
}

function getCoordinates(position) {
  //console.log(position.coords.latitude);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  //console.log(longitude);
  let apiKey = "9c0a0dd5ce072e1ac8919092ab708dad";
  let apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  axios.get(apiUrl).then(getCurrentLocation);
}

function getCurrentLocation(response) {
  let city = response.data[0].name;
  let displayCurrentLocation = document.querySelector("#city");
  displayCurrentLocation.innerHTML = city;
  getTemperature(city);
}

//displays local weather and city
function getLocalPosition() {
  navigator.geolocation.getCurrentPosition(getCoordinates);
}

let currentDateTime = document.querySelector("#current-time-date");
currentDateTime.innerHTML = formatDateTime();

let locationForm = document.querySelector(".location-search-form");
locationForm.addEventListener("submit", displayLocationEntered);

let farenheitElement = document.querySelector("#farenheit");
farenheitElement.addEventListener("click", changeToFarenheit);
let celsiusElement = document.querySelector("#celsius");
celsiusElement.addEventListener("click", changeToCelcius);

let currentButton = document.querySelector(".current-button");
currentButton.addEventListener("click", getLocalPosition);
