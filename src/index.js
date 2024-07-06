function refreshWeather(response){
    let tempElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    
    tempElement.innerHTML = Math.round(temperature);

    let cityElement = document.querySelector("#city")
    cityElement.innerHTML = response.data.city;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.condition.description;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

    let windSpeedElement = document.querySelector("#wind-speed");
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    
    let iconElement = document.querySelector("#icon");
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat","Sun"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>15º</strong>
          </div>
          <div class="weather-forecast-temperature">9º</div>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}


function searchCity(city){

let apiKey = "78e3cca87dof83c3428t5ba6e7fa0071";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`

axios.get(apiUrl).then(refreshWeather);}




let date = new Date();

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}
let timeElement = document.querySelector("#time");
timeElement.innerHTML = formatDate(date);


function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Tokyo");
displayForecast();