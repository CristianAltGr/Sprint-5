
interface Weather{
    data: {
        timelines: [
            {
                timestep: string;
                endTime: string;
                startTime: string;
                intervals: [
                    {
                        startTime: string;
                        values: {
                            humidity: number,
                            precipitationProbability: number;
                            precipitationType: number;
                            temperature: number;
                            windSpeed: number;
                        }
                    }
                ]
            }
        ]
    }
}

interface BcnWeather{
    startTime: string;
    values : {
        humidity: number,
        precipitationProbability: number;
        precipitationType: number;
        temperature: number;
        windSpeed: number;
    }
}

interface Joke{
    id      : string;
    joke    : string;
    status? : number;
}

interface Score{
    Score : number;
    Date  : string;        
}

class JOKE{

    private _id?: string;
    private _joke  : string;
    private _status?: number;
    private _scores: Score []; //I made a array o arrays with the info of score and date, the reason is no repeat jokes.
    
    constructor (id:string,joke:string,status?:number){

       this._id      =  id;
       this._joke    =  joke;
       this._status  =  status;
       this._scores  =  [];

    }

    get getId(){
        return this._id ;
    }

    get getJoke(){
        return this._joke;
    }
   
    get getStatus(){
        return this._status;
    }

    get getScores(){
        return this._scores;
    }
    
    set setScores(score: Score){
        this._scores.push(score)
    }
}
