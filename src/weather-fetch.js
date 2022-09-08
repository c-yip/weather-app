import displayControl from './dom-control';

const weatherAPI = '904aa33c255754744867c717f0deff45';
const locationSearch = document.getElementById('search');
const submit = document.getElementById('submit');
const f = document.getElementById('fahrenheit-btn');
const c = document.getElementById('celsius-btn');
const fahrenheit = 'imperial';
const celsius = 'metric';
let location;
let chosenUnit;

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

// user unit choice
export function unitChoice() {
  f.addEventListener('click', () => {
    chosenUnit = fahrenheit;
    console.log(chosenUnit);
  });
}

c.addEventListener('click', () => {
  chosenUnit = celsius;
  console.log(chosenUnit);
});

// user location search
export function submitLocation() {
  submit.addEventListener('click', () => {
    location = locationSearch.value;
    getCurrentWeather(chosenUnit, location)
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
      ))
      .catch((err) => console.log('Error:', err.message));
  });
}

// creates dom on page load
export function createDom() {
  getCurrentWeather(fahrenheit, 'west covina')
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
    ))
    .catch((err) => console.log('Error:', err.message));
}
