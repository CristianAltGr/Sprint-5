"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const APIJOKE = 'https://icanhazdadjoke.com';
const KEYWEATHER = "BkMrzeAO6mSJDnoYFfYM6DJMKwTt67qi";
const APIWEATHER = 'https://api.tomorrow.io/v4/timelines?location=41.3873974,2.168568&fields=temperature,precipitationType,precipitationProbability,humidity,windSpeed&timesteps=current&units=metric&apikey=BkMrzeAO6mSJDnoYFfYM6DJMKwTt67qi';
const APINORRIS = 'https://api.chucknorris.io/jokes/random';
//Legend: Joke = interface
//        JOKE = Class
//        joke = variable with interface Joke for take info
//        jokes= array of JOKE objects (plus: inside the object save the score inside other array)
timeToday(); // IMPORTANT! Function to know the time limited 25 gettings/hour!!
const jokes = [];
function letsJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        animationBg(); //Change de blob
        const joke = yield makeJoke().then(req => req);
        const stringJoke = joke.joke;
        const textUser = document.getElementById("joke");
        textUser.innerHTML = stringJoke;
        pushJoke(joke);
        console.log(jokes);
    });
}
function makeJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        let choice;
        const aux = Math.random() * 100;
        if (aux >= 50) {
            choice = false;
        }
        else {
            choice = true;
        }
        if (choice === true) {
            const request = yield fetch(APIJOKE, { headers: { 'Accept': 'application/json' } })
                .then((res) => res.json());
            return request;
        }
        else {
            const request = yield fetch(APINORRIS).then(res => res.json());
            const joke = {
                id: request.id,
                joke: request.value,
            };
            return joke;
        }
    });
}
function pushJoke(joke) {
    if (jokes.length == 0) {
        let sendJoke = new JOKE(joke.id, joke.joke, joke.status);
        jokes.push(sendJoke); // push the array
    }
    else {
        let check = false;
        jokes.forEach(pro => {
            if (pro.getId == joke.id) {
                check = true;
            }
        });
        if (check == false) {
            let sendJoke = new JOKE(joke.id, joke.joke, joke.status);
            jokes.push(sendJoke); // if the joke doesn't exist push at the array
        }
    }
}
function punctuateJokes(num) {
    if (jokes.length == 0) {
        alert("Upps, you don't see any joke yet");
    }
    else {
        const textUser = document.getElementById("joke");
        let text = textUser.innerHTML;
        const date = new Date();
        const dateISO = date.toISOString();
        jokes.forEach(joke => {
            if (joke.getJoke == text) {
                const score = {
                    Score: num,
                    Date: dateISO,
                };
                joke.setScores = score;
            }
        });
        alert("Thanks for your vote!");
    }
    console.log(jokes);
}
function timeToday() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(APIWEATHER).then(res => res.json());
        const weather = response.data.timelines[0].intervals[0]; //Destructuring object 
        const tempDoc = document.getElementById("temp");
        const rainDoc = document.getElementById("rain");
        const windDoc = document.getElementById("wind");
        const temperature = weather.values.temperature + "º";
        const rain = weather.values.precipitationProbability + "%";
        const wind = weather.values.windSpeed + " m/s";
        tempDoc.innerHTML = temperature;
        rainDoc.innerHTML = rain;
        windDoc.innerHTML = wind;
        bgWeather(weather.values.temperature, weather.values.precipitationProbability);
        // Function to change bg image with the time outside.
    });
}
function animationBg() {
    const images = [
        'url(vsc/blob.svg)',
        'url(vsc/blob1.svg)',
        'url(vsc/blob2.svg)',
        'url(vsc/blob3.svg)',
        'url(vsc/blob4.svg)',
        'url(vsc/blob5.svg)',
        'url(vsc/blob6.svg)',
        'url(vsc/blob7.svg)'
    ];
    const container = document.querySelector(".container");
    const bg = images[Math.floor(Math.random() * images.length)];
    container.style.backgroundImage = bg;
}
function bgWeather(temperature, rainProba) {
    let bg = "url(vsc/party.jpg)";
    const imgHot = 'url(vsc/beach.jpg)';
    const imgCold = 'url(vsc/winter.jpg)';
    const imgGood = 'url(vsc/spring.jpg)';
    const imgRain = 'url(vsc/rain.jpg)';
    const container = document.querySelector("body");
    if (rainProba > 50) {
        bg = imgRain;
    }
    else if (temperature >= 25) {
        bg = imgHot;
    }
    else if (temperature < 26 && temperature >= 16) {
        bg = imgGood;
    }
    else if (temperature < 16) {
        bg = imgCold;
    }
    container.style.backgroundImage = bg;
}
