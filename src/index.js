console.log('texting index.js');
const weatherAPI = '904aa33c255754744867c717f0deff45';
const fahrenheit = '&units=imperial';
const celsius = '&units=metric';

const getCurrentWeather = async (unit) => {
  const unitSelection = unit;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99${unitSelection}&appid=${weatherAPI}`);
  const currentWeatherData = await response.json();
  console.log(currentWeatherData);
  console.log(currentWeatherData.main.temp);
};

getCurrentWeather(fahrenheit);
