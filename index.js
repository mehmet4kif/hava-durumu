const urlWeather = "https://api.openweathermap.org/data/2.5/weather?";
const urlGeo = "http://api.openweathermap.org/geo/1.0/direct?";
const APIkey = "1a3e67d1a6c280a545501c444a7c9a2f";

const city = document.querySelector(".city");
const temprature = document.querySelector(".temp");
const desc = document.querySelector(".desc");
const minmax = document.querySelector(".minmax");
const humi = document.querySelector(".humidity");
const windspeed = document.querySelector(".windspeed");
const winddegree = document.querySelector(".winddegree");
const hiss = document.querySelector(".his");

function setQuery(e){
    if(e.keyCode == '13')
        getResult(searchBar.value);
}

function getResult(cityName){
    let query = `${urlGeo}q=${cityName}&appid=${APIkey}`;
    fetch(query).then(geoloc => {
        return geoloc.json();
    }).then(coordinates => {
        const lat = coordinates[0].lat;
        const lon = coordinates[0].lon;
        console.log(lat);
        fetch(`${urlWeather}lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=tr`).then(weatherOne => {
            return weatherOne.json();
        }).then(weatherJson => {
            console.log(weatherJson);
            let aciklama = weatherJson.weather[0].description;
            let temp = weatherJson.main.temp;
            let tempMax = weatherJson.main.temp_max;
            let tempMin = weatherJson.main.temp_min;
            let humidity = weatherJson.main.humidity;
            let feelsLike = weatherJson.main.feels_like;
            let country = weatherJson.sys.country;
            let windSpeed = weatherJson.wind.speed;
            let windDeg = weatherJson.wind.deg;
            
            city.innerHTML = `${weatherJson.name}, ${country}`;
            temprature.innerHTML = `${temp.toFixed(1)}°`;
            desc.innerHTML = `${aciklama.toUpperCase()}`;
            minmax.innerHTML = `${tempMax.toFixed(1)}° / ${tempMin.toFixed(1)}°`;
            humi.innerHTML = `%${humidity}`;
            windspeed.innerHTML = `${windSpeed} km/h`;
            winddegree.innerHTML = `${windDeg}°`;
            hiss.innerHTML = `${feelsLike.toFixed(1)}°`
        })
    
    });
}

const searchBar = document.querySelector("#searchBar");
searchBar.addEventListener('keypress',setQuery);