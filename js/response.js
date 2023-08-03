"use strict";


var apiKey = 'bb0808955e9c9cac837e8cbdf68de3a8';
var city = "Dnipro";
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;
const resData = []
axios.get(url).then( (res) => {
    // Вывод города
      resData.push(res.data.name);
    // // Вывод температуры
    //   resData.push(res.data.main.temp);
    // // Вывод влажности
    //   resData.push(res.data.main.humidity);
    // // Вывод скорости ветра
    //   resData.push(res.data.wind.speed);
  console.log(resData)
  });
  

export default resData 