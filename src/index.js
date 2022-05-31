//let fahrenheitTemperature = Math.round(temperature * 9) / 5 + 32;
//It is currently ${celsiusTemperature}°C (${fahrenheitTemperature}°F) in ${city} with a humidity of ${humidity}%`

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

let hour = String(now.getHours()).padStart(2, "0");
let minutes = String(now.getMinutes()).padStart(2, "0");

let todayDate = document.querySelector("h2.today");
todayDate.innerHTML = `${day} ${hour}:${minutes}`;

function search(event) {
  event.preventDefault();

  let h1 = document.querySelector("h1.today");
  let cityName = document.querySelector("#input-city");
  if (cityName.value) {
    h1.innerHTML = cityName.value;

    let cityNameValue = cityName.value;
    let apiKey = `79a3607cf44d8fac8c27b9322d439b62`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameValue}&appid=${apiKey}&units=metric`;

    function getWeather(response) {
      let h4 = document.querySelector("h4");
      h4.innerHTML = `${Math.round(response.data.main.temp)}°C`;
    }
    axios.get(apiUrl).then(getWeather);
  } else {
    let h4 = document.querySelector("h4");
    h1.innerHTML = `Type a city...`;
    h4.innerHTML = `Non data`;
  }

  function tempCelsius(event) {
    event.preventDefault();
    let h4 = document.querySelector("h4");
    function getWeather(response) {
      h4.innerHTML = Math.round(response.data.main.temp) + "°C";
    }

    let cityNameValue = cityName.value;
    let apiKey = `79a3607cf44d8fac8c27b9322d439b62`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameValue}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(getWeather);
  }
  function tempFahren(event) {
    event.preventDefault();
    let h4 = document.querySelector("h4");
    function getWeather(response) {
      h4.innerHTML = (Math.round(response.data.main.temp) * 9) / 5 + 32 + "°F";
    }

    let cityNameValue = cityName.value;
    let apiKey = `79a3607cf44d8fac8c27b9322d439b62`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameValue}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(getWeather);
  }

  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", tempCelsius);

  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.addEventListener("click", tempFahren);
}
let form = document.querySelector("#search-engine");
form.addEventListener("submit", search);

function getCurrentWeather(response) {
  console.log(response);
  let h1 = document.querySelector("h1.today");
  let h4 = document.querySelector("h4");
  h1.innerHTML = response.data.name;
  h4.innerHTML = ` ${Math.round(response.data.main.temp)}°C`;
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `79a3607cf44d8fac8c27b9322d439b62`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentTemp = document.querySelector("#current");
currentTemp.addEventListener("click", getCurrentPosition);

//Homework 5
//Task: In your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.
//Please note: there's no need to include a temperature conversion at the moment. This will be taught later on in the course.
//Bonus:Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
