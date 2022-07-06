const APIJOKE = 'https://icanhazdadjoke.com';

interface Joke{
    id?     : string;
    joke    : string;
    status? : number;
    score?  : number;
}

const jokes : Joke[] = [];



async function letsJoke(){
    
    const joke : Joke = await makeJoke().then(req => req);
    const stringJoke : string = joke.joke;
    const textUser:HTMLBodyElement = document.getElementById("joke") as HTMLBodyElement;
    textUser.innerHTML= stringJoke;
      
} 

async function makeJoke() : Promise<Joke> {

    const request: Joke = await fetch(APIJOKE,{headers: {'Accept': 'application/json'}})
    .then((res) => res.json())
             
    return request;
}


       


