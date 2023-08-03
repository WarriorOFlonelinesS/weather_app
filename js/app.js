const weatherBlock = document.querySelector('#weather');
const submit = document.getElementById('submit')
const form = document.getElementById('form')

form.addEventListener('submit', 
loadWeather
)
async function loadWeather(e){


  weatherBlock.innerHTML = 
  `<div class='weather__loading>
        <img src = "./loading.gif" alt = "Loading...">
    </div>`
    var apiKey = 'bb0808955e9c9cac837e8cbdf68de3a8';
const formData = new FormData(form);
let city = formData.get('city')
  
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;

const response = await fetch(url, {method:'GET',
});
    const responseResult = await response.json();

    if(response.ok){
        getWeather(responseResult);

    }else{
        weatherBlock.innerHTML = responseResult.message;
    }
}


function getWeather(data){
    const location = data.name;
    const temp = Math.round(data.main.feels_like);
    const feelsLike = Math.round(data.main.feels_like);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;

    const template = `
    <div class="weather__header">
    <div class="weather__main">
      <div class="weather__city">${location}</div>
      <div class="weather__status">${weatherStatus}</div>
    </div>
    <div class="weather__icons">
      <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="">
    </div>
  </div>
  <div class="weather__temp">${temp}</div>
  <div class="wether__feels-like">${feelsLike}</div>`
  weatherBlock.innerHTML = template;
}