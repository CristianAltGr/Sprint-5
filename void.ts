const APIJOKE = 'https://icanhazdadjoke.com';

interface Joke{
    id?: string;
    joke: string;
    status? : number;
}

async function makeJoke() {

   try{
        const request: Joke = await fetch(APIJOKE,{headers: {'Accept': 'application/json'}})
        .then((res) => res.json())
             
        //console.log("hola" + request);
        return request;
          
    } catch(error){
        console.log("Error= " + error);
    }          
}

