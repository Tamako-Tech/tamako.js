const err = require('./APIError');
const base = 'http://api.tamako.tech/api'
const fetch = require("node-fetch");
const EventEmitter = require("events");

class TAMAKOAPI extends EventEmitter {
    constructor(options = {}) {
        super();
        
        // Specify in Error message where it went wrong
        if (typeof options !== 'object') {
            throw new err(`TAMAKOAPI#options: Expected object, received ${typeof options}`);
        };
        
        // Encode the components on the go while instantiating this constructor
        for (const args of ['svcid', 'prvid', 'svcsecret']){
            this[args] = options[args] ? encodeURIComponent(options[args]) : undefined;
        };
        
        // Add chatbot's static data directly into the constructor
        this.cboptions = {};
        for (const [args, altr] of [['name', 'Tamako'], ['gender', 'female'], ['prefix', 'Not Set By Developer'], ['dev', 'Bear#3437']]){
            this.cboptions[args] = encodeURIComponent((options.chatbot||{})[args]) || altr;
        };
    };


    /**
     * Message for AI Chatbot
     * @name chatbot
     * @param {message} string Message for chatbot
     * @param {options} object The options for this chatbot
     * @param {options.name} string The name for the chatbot
     * @param {options.gender} string The gender for the chatbot
     * @param {options.user} string The user identifier for the message sender
     * @param {options.prefix} string The prefix this bot currently uses
     * @param {options.dev} string The developer for this bot
     * @example 
     * TAMAKOAPI.chatbot('A super cool message', {
     *    name: 'ExampleBot',
     *    gender: 'Female'
     * });
     */ 
    async chatbot(message, options = {}) {
        if (!message) {
            throw new err(`TAMAKOAPI#chatbot: Required message parameter, received none.`);
        };
        
        const param = ['svcid','prvid','svcsecret'].map(param => `${param}=${this[param]}`);
        
        for (const prop of ['name', 'gender', 'user', 'prefix', 'dev']){
            if (options[prop] && typeof options[prop] !== 'string'){
                throw new err(`Expected ${prop} to be of type string, received ${typeof prop}`);
            } else if (prop === 'user' && !options[prop]){
                throw new err(`TAMAKOAPI#chatbot: options.user: This field is required.`);
            } else {
                param.push(`${prop}=${options[prop] ? encodeURIComponent(options[prop]) : this.cboptions[prop]}`);
            };
        };
        
        const res = await fetch(`${base}/chat?${param.join('&')}&message=${encodeURIComponent(message)}`);
        
        if (res.status === 401){
            this.emit('error', 'Invalid API key was provided');
            return Promise.reject('Invalid API key was provided');
        };
        
        const { error, response } = await res.json();
        
        if (error){
            this.emit('error', error);
            return Promise.reject(error);
        };

        return Promise.resolve(response);
    };
    
    
    /**Internal
     * Internal function for fetching an endpoint
     * @private
     */
    async __fetch(endpoint, param = '', prop){
        const res = await fetch(`${base}/${endpoint}/${encodeURIComponent(param)}`);
        if (res.status == 401) {
            this.emit("error", "Check With Bear#3437");
            return Promise.reject('Check With Bear#3437');
        }
        const response = await res.json();
        if (response.error) {
            this.emit('error', response.error);
            return Promise.reject(response.error);
        }
        if (!Object.entries(response).filter(([key, val]) => key !== 'api' && !!val).length){
            this.emit('error', 'Not Found.')
            return Promise.reject('Not Found')
        };
        return Promise.resolve(prop ? response[prop] : response);
    };


    /**Returns a animequote along with the name of the anime and character who spoke it
     * @name aniquote
     * @returns {animequote} object An anime quote object.
     * @returns {animequote.anime} string The anime from where the quote was taken from
     * @returns {animequote.character} string The character who spoke this quote
     * @returns {animequote.quote} string An anime quote
     * @returns {animequote.api} object An API object
     */
    animequote() {
        return this.__fetch('anime-quote');
    };


    /**Returns a fact about animal
     * @name animalfact
     * @param {string} name The animal to query
     * @returns {string} facts Fact about the animal
     */
    async animalfact(name) {
        return this.__fetch('animalfact', name, 'fact');
    };


    /**Returns an image
     * @name image
     * @param {string} type Type of query
     * @returns {string} url URL link to the type of image
     */
    async image(type) {
        return this.__fetch('image', type, 'url');
    };


    /**Returns an Roleplay gif link
     * @name roleplay
     * @param {string} type Type of query
     * @returns {string} url GIF link to the type of roleplay
     */
    async roleplay(type) {
        return this.__fetch('roleplay', type, 'url');
    };


    /**Returns a joke
     * @name joke
     * @returns {string} Joke
     */
    async joke() {
        return this.__fetch('joke', null, 'joke');
    };

    /**Returns lyrics of a song
     * @name lyrics
     * @param {string} lyrics Title of the song
     * @returns {string} lyrics of the song
     */
    async lyrics(query) {
        return this.__fetch(`lyrics?name=${query}`);
    };

    /**pokemon - Returns data about a pokemon
     *
     * @param {string} name Name of the pokemon
     */
    async pokemon(query = '') {
        return this.__fetch(`pokedex?pokemon=${String(query).toLowerCase()}`);
    };
}
module.exports = TAMAKOAPI;
