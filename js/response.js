import getWeather from './app.js'
const form = document.getElementById('form');
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
      weatherBlock.innerHTML =  `<h2>${responseResult.message}<h2>`
    }
  }
  catch (error){
    console.error('error:', error)
  }
}

export default loadWeather 