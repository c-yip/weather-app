const currentTemp = document.querySelector('.current-temp');
const location = document.querySelector('.location');
const timeDate = document.querySelector('.time-date');
const description = document.querySelector('.description');
const cloudy = document.querySelector('#cloudy');
const wind = document.querySelector('#wind');
const feelsLike = document.querySelector('#feels-like');
const humidity = document.querySelector('#humidity');
const iconImg = document.querySelector('#icon');
const minMax = document.querySelector('#min-max');
let windUnit;
let degreeUnit;

export default function displayControl(temp, loc, des, icon, cloud, win, fl, hum, min, max, unit) {
  const chosenUnit = unit;
  console.log(chosenUnit);
  if (chosenUnit === 'imperial') {
    windUnit = 'mph';
    degreeUnit = '\u00B0F';
  } else {
    windUnit = 'kph';
    degreeUnit = '\u00B0C';
  }

  currentTemp.textContent = parseInt(temp) + degreeUnit;
  location.textContent = loc;
  iconImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  description.textContent = des;
  cloudy.textContent = `${cloud}%`;
  wind.textContent = `${win} ${windUnit}`;
  feelsLike.textContent = parseInt(fl) + degreeUnit;
  humidity.textContent = `${parseInt(hum)}%`;
  minMax.textContent = `${min}${degreeUnit}/${max}${degreeUnit}`;

  const today = new Date();

  timeDate.textContent = `${today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${today.toLocaleDateString([], {
    weekday: 'short', month: 'short', day: 'numeric',
  })}`;
}
