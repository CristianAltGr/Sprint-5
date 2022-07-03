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
function makeJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const request = yield fetch(APIJOKE, { headers: { 'Accept': 'application/json' } })
                .then((res) => res.json());
            //console.log("hola" + request);
            return request;
        }
        catch (error) {
            console.log("Error= " + error);
        }
    });
}
