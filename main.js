(()=>{const e=document.getElementById("search"),t=document.getElementById("submit"),n="imperial";let i;t.addEventListener("click",(()=>{i=e.value,console.log(i),a(n,i).then((e=>console.log(e.description))).catch((e=>console.log("Error:",e.message)))}));const a=async(e,t)=>{const n=e,i=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${t}&units=${n}&appid=904aa33c255754744867c717f0deff45`),a=await i.json();return console.log(a),{currentTemp:a.main.temp,locationName:a.name,description:a.weather[0].description,icon:a.weather[0].icon,clouds:a.clouds.all,wind:`${a.wind.gust} mph`,feelsLike:a.main.feels_like,humidity:a.main.humidity,min:a.main.temp_min,max:a.main.temp_max}};a(n,"west covina")})();