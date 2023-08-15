const weatherBlock =<HTMLElement> document.getElementById('weather');
const submit = document.getElementById('submit')
const form =<HTMLFormElement> document.getElementById('form')

form.addEventListener('submit', loadWeather)
async function loadWeather(e:Event){
    e.preventDefault()

    var apiKey = 'bb0808955e9c9cac837e8cbdf68de3a8';
    const formData = new FormData(form);

  let city = formData.get('city')
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}&lang=en`;

  const response = await fetch(url, {method:'GET',
} );
    const responseResult = await response.json();

    if(response.ok){
        getWeather(responseResult, city);

    }else{
        weatherBlock.innerHTML = responseResult.message;
    }
}


function getWeather(data, nameOfCity){
  console.log(data)
    const location = nameOfCity;
    const temp = Math.round(data.main.feels_like);
    const feelsLike = Math.round(data.main.feels_like);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;

    const template = `
    <div class='weather-holder'> 
    <h3 class='weather__title'> Today </h3>
 </div>
<div class="weather__main">
    <div class="weather__header">
 
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