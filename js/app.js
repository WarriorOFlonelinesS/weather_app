const weatherBlock = document.getElementById('weather');
const weatherBlock2 = document.querySelector('.content-items')
const submit = document.getElementById('submit');
const form = document.getElementById('form');
const buttons = document.querySelectorAll('.main__btn');
const contents = document.querySelectorAll('.weather-content');
const loading = document.querySelectorAll('.weather__loading')

buttons.forEach((btn,index) =>{
  btn.addEventListener('click',()=>{
    buttons.forEach(btn => {btn.classList.remove('_active')});
    btn.classList.add('_active');
    contents.forEach(content =>{content.classList.remove('active')});
    contents[index].classList.add('active')
  })
  }
)

form.addEventListener('submit', loadWeather);

async function loadWeather(e){
try{
    e.preventDefault();
    var apiKey = 'bb0808955e9c9cac837e8cbdf68de3a8';
    const formData = new FormData(form);

    let city = formData.get('city')
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=en&units=metric&appid=${apiKey}`;

    const response = await fetch(url, {method:'GET',
    } );
    const responseResult = await response.json();
    if(response.ok){
        getWeather(responseResult, city);
    }else{
      weatherBlock.innerHTML =  responseResult.message
    }
  }
  catch (error){
    console.error('error:', error)
  }
}


function getWeather(data, nameOfCity){
  for(let load of loading){
    load.style.display = 'none'
  }
  const forecastList = data.list;
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
  forecastArray = Array.from(forecastList)
  for (let i = 0; i <= forecastArray.length-1; i+=7){
    
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
  console.log(forecastArray[0])
}

