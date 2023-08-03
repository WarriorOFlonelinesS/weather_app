"use strict";

// k6BKH5Mc8&_&78i

var apiToken = 'bb0808955e9c9cac837e8cbdf68de3a8';
const axios = require('axios').default;

let apiKey = 'bb0808955e9c9cac837e8cbdf68de3a8';

let city = "Dnipro";

let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;

axios.get(url).then(res => {
    // Вывод города
    document.querySelector('.city').innerHTML = res.data.name
    // Вывод температуры
    document.querySelector('.temp').innerHTML = res.data.main.temp
    // Вывод влажности
    document.querySelector('.humidity').innerHTML = res.data.main.humidity
    // Вывод скорости ветра
    document.querySelector('.wind').innerHTML = res.data.wind.speed
    console.log(res.name)
 })