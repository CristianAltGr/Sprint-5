"use strict";
class JOKE {
    constructor(id, joke, status) {
        this._id = id;
        this._joke = joke;
        this._status = status;
        this._scores = [];
    }
    get getId() {
        return this._id;
    }
    get getJoke() {
        return this._joke;
    }
    get getStatus() {
        return this._status;
    }
    get getScores() {
        return this._scores;
    }
    set setScores(score) {
        this._scores.push(score);
    }
}
