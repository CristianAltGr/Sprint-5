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
const jokes = [];
function letsJoke() {
    return __awaiter(this, void 0, void 0, function* () {
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
        const request = yield fetch(APIJOKE, { headers: { 'Accept': 'application/json' } })
            .then((res) => res.json());
        return request;
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
    }
    console.log(jokes);
}
