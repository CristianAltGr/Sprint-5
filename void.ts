const APIJOKE = 'https://icanhazdadjoke.com';

interface Joke{
    id?: string;
    joke: string;
    status? : number;
}

async function letsJoke(){
    
    const joke : string = await makeJoke().then(req => req.joke);
    
    const textUser:HTMLBodyElement = document.getElementById("joke") as HTMLBodyElement;
    textUser.innerHTML= joke;
      
} 

async function makeJoke() : Promise<Joke> {

    const request: Joke = await fetch(APIJOKE,{headers: {'Accept': 'application/json'}})
    .then((res) => res.json())
             
    return request;
}
       


