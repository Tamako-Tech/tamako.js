const err = require('./APIError');
const base = 'http://api.tamako.tech/api'
const fetch = require("node-fetch");
let token;
const EventEmitter = require("events");
class TAMAKOAPI extends EventEmitter{


    /**chatbot- Message for AI Chatbot
     *
     * @param {string} message Message for chatbot
     * @param {string} name Name for the chatbot
     * @param {string} gender Gender of the chatbot
     * @param {string} user User id who triggered the chatbot
     */

    async chatbot(username, id, secret, message, name='Tamako', gender='female', user='123456'){
        if(!message) throw new err("No message was provided");
        if(typeof(name)!= 'string') throw new err(`Expected name to be string, recieved ${typeof(name)}`);
        if(typeof(gender)!= 'string') throw new err(`Expected gender to be string, recieved ${typeof(gender)}`);
        if(typeof(user)!= 'string') throw new err(`Expected user id to be string, recieved ${typeof(user)}`);

        const res = await fetch(`${base}/chat?username=${encodeURIComponent(username)}&appid=${encodeURIComponent(id)}&secret=${encodeURIComponent(secret)}&name=${encodeURIComponent(name)}&gender=${encodeURIComponent(gender)}&user=${encodeURIComponent(user)}&message=${encodeURIComponent(message)}`,{
        });
        if(res.status == 401){
            this.emit("error", "Invalid API key was provided");
            return undefined;
        }
        const response = await res.json();
        if(response.error) {
            this.emit('error', response.response);
            return undefined;
        }
        return response.response;
    }


    /**animquote - Returns a animequote along with the name of the anime and character who spoke it
     *
     *
     */
    async animequote(){

        const res = await fetch(`${base}/anime-quote`);
        if(res.status == 401){
            this.emit("error", "Check With Bear#3437");
            return undefined;
        }
        const response = await res.json();
        if(response.error) {
            this.emit('error', response.error);
            return undefined;
        }
        return response;
    };


/**animalfact - Returns a fact about animal
 *
 */
async animalfact(name){
    const res = await fetch(`${base}/animalfact?name=${encodeURIComponent(name)}`);
    if(res.status == 401){
          this.emit("error", "Check With Bear#3437");
        return undefined;
    }
    const response = await res.json();
    if(response.error) {
        this.emit('error', response.error);
        return undefined;
    }
    return response.fact;
}

/**Joke - Returns a joke
 *
 */
async joke(){
    const res = await fetch(`${base}/joke`);
    if(res.status == 401){
          this.emit("error", "Check With Bear#3437");
        return undefined;
    }
    const response = await res.json();
    if(response.error) {
        this.emit('error', response.error);
        return undefined;
    }
    return response.joke;
}

/**Lyrics - Returns lyrics of a song
 *
 * @param {string} lyrics Song Name
 */
async lyrics(query){
    if(!query) throw new err("No query was provided to search");
    const res = await fetch(`${base}/lyrics?name=${encodeURIComponent(query)}`);
    if(res.status == 401){
        this.emit("error", "Check With Bear#3437");
        return undefined;
    }
    const response = await res.json();
    if(response.error) {
        this.emit('error', response.error);
        return undefined;
    }
    return response;
};

    /**pokemon - Returns data about a pokemon
     *
     * @param {string} name Name of the pokemon
     */
    async pokemon(query){
        if(!query) throw new err("No query was provided to search");
        const res = await fetch(`${base}/pokedex?pokemon=${encodeURIComponent(query.toLowerCase())}`);
        if(res.status == 401){
            this.emit("error", "Check With Bear#3437");
            return undefined;
        }
        const response = await res.json();
        if(response.error) {
            this.emit('error', response.error);
            return undefined;
        }
        return response;
    };



}
module.exports = TAMAKOAPI;
