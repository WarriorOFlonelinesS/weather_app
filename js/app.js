
import loadWeather from './response.js'
const weatherBlock = document.getElementById('weather');
const weatherBlock2 = document.querySelector('.content-items');
const buttons = document.querySelectorAll('.main__btn');
const contents = document.querySelectorAll('.weather-content');
const loading = document.querySelectorAll('.weather__loading')

const weatherBlock3 = document.getElementById('weatherBlock3')

const render6Blocks= (data) =>{
  const forecastList = data.list;
  const forecastArray = Array.from(forecastList)
  for (let i = 0; i <= forecastArray.length-1; i+=7){
    // console.log(forecastArray[i])
    const date = new Date(forecastArray[i].dt * 1000).toLocaleString().slice(0,10);
    const icon = forecastArray[i].weather[0].icon;
    const status = forecastArray[i].weather[0].description;
    const temp = Math.round(forecastArray[i].main.feels_like)
    const template2 = `
    <div class="content-item">
      <div class="item__title">${date}</div>
      <img src="https://openweathermap.org/img/w/${icon}.png"" alt="">
      <div class="weather__temp">${temp}</div>
      <div class="weather__status">${status}</div>
    </div>`
    weatherBlock2.innerHTML += template2
  }
}

const renderCircles = (data) => {

  const forecastList = data.list;

  forecastList.forEach((forecast, index) => {
    if (index % 7 === 0) {

      const humidity = forecast.main.humidity;

      const circleContainer = document.createElement("div");
      circleContainer.className = "weather-humidity";

      const windTitle = document.createElement("div");
      windTitle.innerHTML = "Wind"
      windTitle.style.fontSize = 15 +'px';

      const wind = document.createElement("div");
      wind.innerHTML = forecast.wind.speed + 'm/s';
      wind.style.fontSize = 15 +'px';
      windTitle.style.marginLeft = 18 + 'px';
      wind.style.marginLeft = 8 + 'px';

      const title = document.createElement("div");
      title.innerHTML = 'Humidity'
      title.style.fontSize = 15 +'px';

      const circleInner = document.createElement("div");
      circleInner.className = "humidity-outer";


      const circle = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      circle.setAttribute("width", "200");
      circle.setAttribute("height", "200");

      const circleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circleElement.setAttribute("cx", "100");
      circleElement.setAttribute("cy", "100");
      circleElement.setAttribute("r", "50");
      circle.appendChild(circleElement);

      const numberElement = document.createElement("div");
      numberElement.className = "humidity__number";

      circleContainer.appendChild(title);
      circleInner.appendChild(numberElement);
      circleContainer.appendChild(circleInner);
      circleContainer.appendChild(circle);
      circleContainer.appendChild(windTitle);
      circleContainer.appendChild(wind)
      if (humidity < 30 || humidity > 90) {
        circleInner.animate(
          [
            {
              backgroundColor: 'red'
            }
          ],
          {
            duration: 1000,
            fill: "both"
          }
        );
      } else if ((humidity >= 30 && humidity < 60) || (humidity > 70 && humidity <= 90)) {
        circleInner.animate(
          [
            {
              backgroundColor: 'orange'
            }
          ],
          {
            duration: 1000,
            fill: "both"
          }
        );
      } else {
        circleInner.animate(
          [
            {
              backgroundColor: 'green'
            }
          ],
          {
            duration: 1000,
            fill: "both"
          }
        );
      }
      
      weatherBlock3.appendChild(circleContainer);

      const circleId = `circle-${index}`;
      circleElement.id = circleId;
      numberElement.id = `number-${index}`;

      const animationDuration = 300;

      let counter = 0;
      const intervalId = setInterval(() => {
        if (counter === humidity) {
          clearInterval(intervalId);
        } else {
          counter += 1;
          document.getElementById(`number-${index}`).innerHTML = counter + "%";
        }
      }, animationDuration / humidity);
    }
  });
  
};

buttons.forEach((btn,index) =>{
  btn.addEventListener('click',()=>{
    buttons.forEach(btn => {btn.classList.remove('_active')});
    btn.classList.add('_active');
    contents.forEach(content =>{content.classList.remove('active')});
    contents[index].classList.add('active')
  })
  }
)

function getWeather(data, nameOfCity){
  for(let load of loading){
    load.style.display = 'none'
  }

    const location = nameOfCity;
    const weatherTemp = Math.round(data.list[0].main.feels_like);
    const feelsLike = Math.round(data.list[0].main.feels_like);
    const weatherStatus = data.list[0].weather[0].description;
    const weatherIcon = data.list[0].weather[0].icon;

    const template = `
    <div class="content-holder">
    <div class="weather-left"> 
      <div class="weather__main">
    <div class="weather__header">
    <div class="weather__city">${location}</div>
    <div class="weather__status">${weatherStatus}</div>
    </div>
    <div class="weather__temp">${weatherTemp}</div>
    <div class="wether__feels-like"> Fells like: ${feelsLike}</div>
      </div>
    </div>
    <div class="weather-right">
    <div class="weather__icons">
      <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="">
    </div>
    </div>
  </div>`
  weatherBlock.innerHTML = template;
  weatherBlock2.innerHTML = ``
  weatherBlock3.innerHTML = ``
 render6Blocks(data)
 renderCircles(data)

}

export default getWeather