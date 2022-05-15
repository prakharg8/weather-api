//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    console.log(req.body.cityName);
    console.log("request recieved");

    var city = req.body.cityName;
    var apiKey = "ef9c322b4ba58adb7839904adac40dd1";
    var unit = "metric";
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
    https.get(url, function(response) {
        response.on("data", function(data){
            var weatherData = JSON.parse(data);
            var desc = weatherData.weather[0].description;
            var temp = weatherData.main.temp;
            var icon = weatherData.weather[0].icon;
            var iconimg = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write(`<p> The weather is ${desc}</p>`);
            res.write(`<h1>The temprature in ${city} is ${temp} degrees</h1>`);
            res.write(`<img src=${iconimg}>`);
            res.write(`<form action="/" method="GET"> <button type="submit">Back</button> </form>`);
            res.send();
        });
    });
});


app.listen(process.env.PORT || 3000, function(){
    console.log("running on port 3000");
});