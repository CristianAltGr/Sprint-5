const APIJOKE = 'https://icanhazdadjoke.com';
const KEYWEATHER = "BkMrzeAO6mSJDnoYFfYM6DJMKwTt67qi";
const APIWEATHER = 'https://api.tomorrow.io/v4/timelines?location=41.3873974,2.168568&fields=temperature,precipitationType,precipitationProbability,humidity,windSpeed&timesteps=current&units=metric&apikey=BkMrzeAO6mSJDnoYFfYM6DJMKwTt67qi'
const APINORRIS  = 'https://api.chucknorris.io/jokes/random';

//Legend: Joke = interface
//        JOKE = Class
//        joke = variable with interface Joke for take info
//        jokes= array of JOKE objects (plus: inside the object save the score inside other array)

timeToday(); // IMPORTANT! Function to know the time limited 25 gettings/hour!!

const jokes : JOKE[] = [];

async function letsJoke(){
    
    animationBg(); //Change de blob

    const joke : Joke = await makeJoke().then(req => req);    
    const stringJoke : string = joke.joke;
    const textUser:HTMLBodyElement = document.getElementById("joke") as HTMLBodyElement;
    textUser.innerHTML= stringJoke;

    pushJoke(joke);
    console.log(jokes)
}

async function makeJoke() : Promise<Joke> {

    let choice : boolean;
    const aux : number = Math.random()*100;
    
    if(aux>=50){
        choice = false; 
    } else{
        choice = true; 
    }
      
    if(choice===true){
        const request: Joke = await fetch(APIJOKE,{headers: {'Accept': 'application/json'}})
        .then((res) => res.json())
             
        return request;
    
    }else{
        const request = await fetch(APINORRIS).then(res => res.json());
        const joke : Joke = {
            id: request.id,
            joke: request.value,
        }

        return joke;
    }    
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
    
    bgWeather(weather.values.temperature , weather.values.precipitationProbability ); 
    // Function to change bg image with the time outside.
}

function animationBg(){

    const images : string[] = [
        'url(vsc/blob.svg)',
        'url(vsc/blob1.svg)',
        'url(vsc/blob2.svg)',
        'url(vsc/blob3.svg)',
        'url(vsc/blob4.svg)',
        'url(vsc/blob5.svg)',
        'url(vsc/blob6.svg)',
        'url(vsc/blob7.svg)'
    ]

    const container = <HTMLElement>document.querySelector(".container") ;
    const bg = images[Math.floor(Math.random()*images.length)];
    container.style.backgroundImage= bg; 
}

function bgWeather(temperature : number,rainProba: number){
    
    let bg : string = "url(vsc/party.jpg)";
    const imgHot : string = 'url(vsc/beach.jpg)'; 
    const imgCold : string = 'url(vsc/winter.jpg)'; 
    const imgGood : string = 'url(vsc/spring.jpg)'; 
    const imgRain : string = 'url(vsc/rain.jpg)'; 

    const container = <HTMLElement>document.querySelector("body") ;
    
    if(rainProba > 50){
        bg = imgRain;
    }else if (temperature >= 25){
        bg = imgHot; 
    }else if (temperature < 26 && temperature >= 16){
        bg = imgGood;
    }else if(temperature < 16){
        bg = imgCold; 
    }
    
    container.style.backgroundImage= bg; 
}
