const weatherAPI = '904aa33c255754744867c717f0deff45';
const locationSearch = document.getElementById('search');
const submit = document.getElementById('submit');
const fahrenheit = 'imperial';
const celsius = 'metric';
let location;

submit.addEventListener('click', () => {
  location = locationSearch.value;
  console.log(location);
  getCurrentWeather(fahrenheit, location)
    .then((currentWeatherData) => console.log(currentWeatherData));
});

// fetches weather data
const getCurrentWeather = async (unit, location) => {
  const unitSelection = unit;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unitSelection}&appid=${weatherAPI}`);
  const currentWeatherData = await response.json();
  return currentWeatherData;
};
