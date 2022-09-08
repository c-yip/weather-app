import displayControl from './dom-control';

const weatherAPI = '904aa33c255754744867c717f0deff45';
const locationSearch = document.getElementById('search');
const submit = document.getElementById('submit');
const fahrenheit = 'imperial';
const celsius = 'metric';
let location;

export function submitLocation() {
  submit.addEventListener('click', () => {
    location = locationSearch.value;
    getCurrentWeather(fahrenheit, location)
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
