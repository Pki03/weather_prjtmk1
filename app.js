const express = require("express");

const app = express();

const https=require("https");

const bodyparser = require("body-parser");


app.use(bodyparser.urlencoded({extended:true}));



app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

    const query = req.body.cityname;
    const units = "metric";
    

    const url ="https://api.openweathermap.org/data/2.5/weather?appid=7153981d3fcc1ab395101fa5e20ef14c&q="+query+"&units="+units+"";

    https.get(url,function(response)
{
    

    response.on("data",function(data)
    {
        const weatherdata = JSON.parse(data);
        const temp = weatherdata.main.temp;
        const weatherdescription = weatherdata.weather[0].description;
        const icon = weatherdata.weather[0].icon;
        const imgurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
    
        res.write("<h1>the weather has "+weatherdescription+"</h1>");
        res.write("<h2>the temperature is "+temp+" degrees Celcius in "+query+"</h2>");
        res.write("<img src ="+imgurl+">");
        res.send();

    })
})
})


app.listen(3000,function(req,res){
    console.log("server running on port 3000");
});



/*const url ="https://api.openweathermap.org/data/2.5/weather?appid=7153981d3fcc1ab395101fa5e20ef14c&q=London&units=metric";

    https.get(url,function(response)
{
    console.log(response.statusCode);

    response.on("data",function(data)
    {
        const weatherdata = JSON.parse(data);
        const temp = weatherdata.main.temp;
        const weatherdescription = weatherdata.weather[0].description;
        const icon = weatherdata.weather[0].icon;
        const imgurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
    
        res.write("<h1>the weather is "+weatherdescription+"</h1>");
        res.write("<h2>the temperature is "+temp+" degrees Celcius.</h2>");
        res.write("<img src ="+imgurl+">");
        res.send();

    })
})*/