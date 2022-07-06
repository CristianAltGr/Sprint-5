const APIJOKE = 'https://icanhazdadjoke.com';

//Legend: Joke = interface
//        JOKE = Class
//        joke = variable with interface Joke for take info
//        jokes= array of JOKE objects (plus: inside the object save the score inside other array)

interface Joke{
    id     : string;
    joke   : string;
    status : number;
}


const jokes : JOKE[] = [];

async function letsJoke(){
    
    const joke : Joke = await makeJoke().then(req => req);
    const stringJoke : string = joke.joke;
    const textUser:HTMLBodyElement = document.getElementById("joke") as HTMLBodyElement;
    textUser.innerHTML= stringJoke;

    pushJoke(joke);
    console.log(jokes)
}

async function makeJoke() : Promise<Joke> {

    const request: Joke = await fetch(APIJOKE,{headers: {'Accept': 'application/json'}})
    .then((res) => res.json())
             
    return request;
}

function pushJoke(joke : Joke){
    
    if(jokes.length==0){
       
        let sendJoke = new JOKE(joke.id,joke.joke,joke.status); 
        jokes.push(sendJoke); // push the array
    } else{
        
        let check : boolean = false;
        jokes.forEach( pro =>{
            if(pro.getId == joke.id){
              
                check = true;  
            }
        });
        
        if(check == false){
            
            let sendJoke = new JOKE(joke.id,joke.joke,joke.status); 
            jokes.push(sendJoke);  // if the joke doesn't exist push at the array
        }
    }
}

function  punctuateJokes(num:number){
   
    if(jokes.length== 0){
        alert("Upps, you don't see any joke yet");
    
    }else{

        const textUser:HTMLBodyElement = document.getElementById("joke") as HTMLBodyElement;
        let text :string = textUser.innerHTML;
        
        const date : Date = new Date()
        const dateISO : string = date.toISOString()

        jokes.forEach( joke =>{
            
            if(joke.getJoke == text){
                
                const score : Score = { 
                    Score: num ,
                    Date : dateISO,
                }
                
                joke.setScores = score;
                
            }
        })

    }

    console.log (jokes)
}


       


