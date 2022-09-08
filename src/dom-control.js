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
const hourlyContainer = document.querySelector('.hourly-temp');
let windUnit;
let degreeUnit;

export function displayControl(
  temp,
  loc,
  des,
  icon,
  cloud,
  win,
  fl,
  hum,
  min,
  max,
  unit,
) {
  const chosenUnit = unit;
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

function createHourlyElements(time, img, temp, unit) {
  const chosenUnit = unit;
  if (chosenUnit === 'imperial') {
    windUnit = 'mph';
    degreeUnit = '\u00B0F';
  } else {
    windUnit = 'kph';
    degreeUnit = '\u00B0C';
  }

  const container = document.createElement('div');
  container.classList.add('col');
  hourlyContainer.appendChild(container);
  const timeDiv = document.createElement('div');
  const date = new Date(time * 1000);
  timeDiv.textContent = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const iconHourlyImg = document.createElement('img');
  iconHourlyImg.setAttribute('src', `http://openweathermap.org/img/wn/${img}@2x.png`);
  const tempDiv = document.createElement('div');
  tempDiv.textContent = parseInt(temp) + degreeUnit;
  container.appendChild(timeDiv);
  container.appendChild(iconHourlyImg);
  container.appendChild(tempDiv);
}

export function hourlyDisplayControl(
  h1Time,
  h1Icon,
  h1Temp,
  h2Time,
  h2Icon,
  h2Temp,
  h3Time,
  h3Icon,
  h3Temp,
  h4Time,
  h4Icon,
  h4Temp,
  h5Time,
  h5Icon,
  h5Temp,
  unit,
) {
  while (hourlyContainer.firstChild) {
    hourlyContainer.removeChild(hourlyContainer.firstChild);
  }

  createHourlyElements(h1Time, h1Icon, h1Temp, unit);
  createHourlyElements(h2Time, h2Icon, h2Temp, unit);
  createHourlyElements(h3Time, h3Icon, h3Temp, unit);
  createHourlyElements(h4Time, h4Icon, h4Temp, unit);
  createHourlyElements(h5Time, h5Icon, h5Temp, unit);
}
