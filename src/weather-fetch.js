import { displayControl, hourlyDisplayControl } from './dom-control';

const weatherAPI = '904aa33c255754744867c717f0deff45';
const locationSearch = document.getElementById('search');
const submit = document.getElementById('submit');
const f = document.getElementById('fahrenheit-btn');
const c = document.getElementById('celsius-btn');
const fahrenheit = 'imperial';
const celsius = 'metric';
let location = 'los angeles';
let chosenUnit = fahrenheit;

// fetches weather data
const getCurrentWeather = async (unit, loc) => {
  const unitSelection = unit;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=${unitSelection}&appid=${weatherAPI}`);

  const data = await response.json();

  console.log(data);

  const currentWeatherData = {
    currentTemp: data.main.temp,
    locationName: data.name,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    clouds: data.clouds.all,
    wind: data.wind.speed,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    min: data.main.temp_min,
    max: data.main.temp_max,
  };
  return currentWeatherData;
};

const getHourlyForecast = async (unit, loc) => {
  const unitSelection = unit;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${loc}&units=${unitSelection}&appid=${weatherAPI}`);

  const data = await response.json();
  console.log('Five Day:', data);

  const hourlyForecastData = {
    hour1time: data.list[0].dt,
    hour1temp: data.list[0].main.temp,
    hour1icon: data.list[0].weather[0].icon,

    hour2time: data.list[1].dt,
    hour2temp: data.list[1].main.temp,
    hour2icon: data.list[1].weather[0].icon,

    hour3time: data.list[2].dt,
    hour3temp: data.list[2].main.temp,
    hour3icon: data.list[2].weather[0].icon,

    hour4time: data.list[3].dt,
    hour4temp: data.list[3].main.temp,
    hour4icon: data.list[3].weather[0].icon,

    hour5time: data.list[4].dt,
    hour5temp: data.list[4].main.temp,
    hour5icon: data.list[4].weather[0].icon,

    rainChance: data.list[0].pop,
  };
  return hourlyForecastData;
};

function displayWeather(unit, loc) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = '';
  getCurrentWeather(unit, loc)
    .then((currentWeatherData) => displayControl(
      currentWeatherData.currentTemp,
      currentWeatherData.locationName,
      currentWeatherData.description,
      currentWeatherData.icon,
      currentWeatherData.clouds,
      currentWeatherData.wind,
      currentWeatherData.feelsLike,
      currentWeatherData.humidity,
      currentWeatherData.min,
      currentWeatherData.max,
      chosenUnit,
    ))
    .catch((err) => {
      console.log('Error:', err.message);
      errorMessage.textContent = 'City not found';
    });

  getHourlyForecast(unit, loc)
    .then((hourlyForecastData) => hourlyDisplayControl(
      hourlyForecastData.hour1time,
      hourlyForecastData.hour1icon,
      hourlyForecastData.hour1temp,

      hourlyForecastData.hour2time,
      hourlyForecastData.hour2icon,
      hourlyForecastData.hour2temp,

      hourlyForecastData.hour3time,
      hourlyForecastData.hour3icon,
      hourlyForecastData.hour3temp,

      hourlyForecastData.hour4time,
      hourlyForecastData.hour4icon,
      hourlyForecastData.hour4temp,

      hourlyForecastData.hour5time,
      hourlyForecastData.hour5icon,
      hourlyForecastData.hour5temp,

      chosenUnit,

      hourlyForecastData.rainChance,
    ))
    .catch((err) => console.log('Error:', err.message));
}

// user location search
function submitLocation() {
  submit.addEventListener('click', () => {
    location = locationSearch.value;
    locationSearch.value = '';
    displayWeather(chosenUnit, location);
  });
  locationSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      location = locationSearch.value;
      locationSearch.value = '';
      displayWeather(chosenUnit, location);
    }
  });
}

// creates dom on page load
function createDom() {
  displayWeather(chosenUnit, location);
}

// user unit choice
function unitChoice() {
  f.addEventListener('click', () => {
    chosenUnit = fahrenheit;
    createDom();
  });
  c.addEventListener('click', () => {
    chosenUnit = celsius;
    createDom();
  });
}

export default function onLoad() {
  unitChoice();
  submitLocation();
  createDom();
  getHourlyForecast(chosenUnit, location);
}
