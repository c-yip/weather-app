const currentTemp = document.querySelector('.current-temp');
const location = document.querySelector('.location');
const timeDate = document.querySelector('.time-date');
const description = document.querySelector('.description');
const cloudy = document.querySelector('#cloudy');
const wind = document.querySelector('#wind');
const feelsLike = document.querySelector('#feels-like');
const humidity = document.querySelector('#humidity');
const iconImg = document.querySelector('#icon');

export default function displayControl(temp, loc, des, icon, cloud, win, fl, hum) {
  currentTemp.textContent = parseInt(temp);
  location.textContent = loc;
  iconImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  description.textContent = des;
  cloudy.textContent = cloud;
  wind.textContent = `${win} mph`;
  feelsLike.textContent = parseInt(fl);
  humidity.textContent = `${parseInt(hum)}%`;

  const today = new Date();

  timeDate.textContent = `${today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${today.toLocaleDateString([], {
    weekday: 'short', month: 'short', day: 'numeric',
  })}`;
}
