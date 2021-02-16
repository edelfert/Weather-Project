const express = require('express');
const app = express();
const https = require('https');



app.get('/', function(req, res){
  const url = "https://api.openweathermap.org/data/2.5/weather?q=boston&units=imperial&appid=2b618a8a77b897a553910fb8461abc13"
  https.get(url, function (response){
    console.log(response)

    response.on('data', function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<h1>The weather is currently " + description + "</h1>")
      res.write("<h1>The temperature in Boston is " + temp + " degrees Farenheit </h1>")
      res.write("<img src=" + imageURL + ">")
      res.send();
    })
  })


})


app.listen(3000, function () {
  console.log('Server is running on 3000')
})
