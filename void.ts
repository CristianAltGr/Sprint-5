const APIJOKE = 'https://icanhazdadjoke.com';
const KEYWEATHER = "BkMrzeAO6mSJDnoYFfYM6DJMKwTt67qi";
const APIWEATHER = 'https://api.tomorrow.io/v4/timelines?location=41.3873974,2.168568&fields=temperature,precipitationType,precipitationProbability,humidity,windSpeed&timesteps=current&units=metric&apikey=BkMrzeAO6mSJDnoYFfYM6DJMKwTt67qi'

//Legend: Joke = interface
//        JOKE = Class
//        joke = variable with interface Joke for take info
//        jokes= array of JOKE objects (plus: inside the object save the score inside other array)

//timeToday(); // IMPORTANT! Function to know the time limited 25 gettings/hour!!

const jokes : JOKE[] = [];

async function letsJoke(){
    
    const choice = (): boolean =>  {
        
        const aux : number = Math.random()*100;
        if(aux<=50){
            return false
        } else{
            return true
        }
    }
       
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

async function chuckDontJoke(){

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
        
        alert("Thanks for your vote!");
    }
    console.log (jokes)
}

async function timeToday(){

    const response : Weather = await fetch(APIWEATHER).then( res => res.json());
    const weather : BcnWeather = response.data.timelines[0].intervals[0]; //Destructuring object 
    
    const tempDoc :HTMLBodyElement = document.getElementById("temp") as HTMLBodyElement;
    const rainDoc :HTMLBodyElement = document.getElementById("rain") as HTMLBodyElement;
    const windDoc :HTMLBodyElement = document.getElementById("wind") as HTMLBodyElement;

    const temperature : any = weather.values.temperature + "º";
    const rain : any = weather.values.precipitationProbability + "%";
    const wind :any  = weather.values.windSpeed + " m/s";

    tempDoc.innerHTML = temperature;
    rainDoc.innerHTML = rain;
    windDoc.innerHTML = wind;    
}

