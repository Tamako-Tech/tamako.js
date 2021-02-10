const err = require('./APIError');
const base = 'http://api.tamako.tech/api'
const fetch = require("node-fetch");
let token;
const EventEmitter = require("events");
class TAMAKOAPI extends EventEmitter {
    constructor(options = {}) {
        super();

        if (typeof options !== 'object') {
            throw new err(`TAMAKOAPI: Expected object, received ${typeof(options)}`);
        };

        this.username = options.username;
        this.id = options.id;
        this.secret = options.secret;

    };


    /**Message for AI Chatbot
     * @name chatbot
     * @param {string} message Message for chatbot
     * @param {string} name Name for the chatbot
     * @param {string} gender Gender of the chatbot
     * @param {string} user User id who triggered the chatbot
     * @param {string} prefix Prefix of your bot
     * @param {string} dev Name of the Developer of the bot
     */

    async chatbot(message, name = 'Tamako', gender = 'female', user = '123456', prefix = 'Not Set by Developer', dev = 'Bear#3437') {
        if (!message) {
            throw new err("No message was provided");
        };

        const param = {
            name,
            gender,
            user,
            prefix,
            dev
        };

        for (const [key, iter] of Object.entries(param)) {
            if (typeof iter !== 'string') {
                throw new err(`Expected ${iter} to be of type string, received ${typeof(iter)}`);
            } else {
                param[key] = encodeURIComponent(iter);
            };
        };

        const username = encodeURIComponent(this.username);
        const appid = encodeURIComponent(this.id);
        const secret = encodeURIComponent(this.secret);

        const res = await fetch(`${base}/chat?username=${username}&appid=${appid}&appsecret=${secret}&name=${param.name}&gender=${param.gender}&prefix=${param.prefix}&dev=${param.dev}&user=${param.user}&message=${message}`);

        if (res.status === 401) {
            this.emit('error', 'Invalid API key was provided');
            return undefined;
        };

        const response = await res.json();

        if (response.error) {
            this.emit('error', response.error);
            return undefined;
        }

        return response.response;
    };


    /**Returns a animequote along with the name of the anime and character who spoke it
     * @name aniquote
     * @returns {animequote} object An anime quote object.
     * @returns {animequote.anime} string The anime from where the quote was taken from
     * @returns {animequote.character} string The character who spoke this quote
     * @returns {animequote.quote} string An anime quote
     * @returns {animequote.api} object An API object
     */
    async animequote() {

        const res = await fetch(`${base}/anime-quote`);
        if (res.status == 401) {
            this.emit("error", "Check With Bear#3437");
            return undefined;
        }
        const response = await res.json();
        if (response.error) {
            this.emit('error', response.error);
            return undefined;
        }
        return response;
    };


    /**Returns a fact about animal
     * @name animalfact
     * @param {string} name The animal to query
     * @returns {string} facts Fact about the animal
     */
    async animalfact(name) {
        const res = await fetch(`${base}/animalfact/${encodeURIComponent(name)}`);
        if (res.status == 401) {
            this.emit("error", "Check With Bear#3437");
            return undefined;
        }

        const response = await res.json();
        if (response.error) {
            this.emit('error', response.error);
            return undefined;
        }
        return response.fact;
    };


    /**Returns an image
     * @name image
     * @param {string} type Type of query
     * @returns {string} url URL link to the type of image
     */
    async image(type) {
        const res = await fetch(`${base}/image/${type}`);
        if (res.status == 401) {
            this.emit("error", "Check With Bear#3437");
            return undefined;
        }

        const response = await res.json();
        if (response.error) {
            this.emit('error', response.error);
            return undefined;
        }
        return response.url;
    };


    /**Returns an Roleplay gif link
     * @name roleplay
     * @param {string} type Type of query
     * @returns {string} url GIF link to the type of roleplay
     */
    async roleplay(type) {
        const res = await fetch(`${base}/roleplay/${type}`);
        if (res.status == 401) {
            this.emit("error", "Check With Bear#3437");
            return undefined;
        }

        const response = await res.json();
        if (response.error) {
            this.emit('error', response.error);
            return undefined;
        }
        return response.url;
    };


    /**Returns a joke
     * @name joke
     * @returns {string} Joke
     */
    async joke() {
        const res = await fetch(`${base}/joke`);
        if (res.status == 401) {
            this.emit("error", "Check With Bear#3437");
            return undefined;
        };
        const response = await res.json();
        if (response.error) {
            this.emit('error', response.error);
            return undefined;
        };

        return response.joke;
    };

    /**Returns lyrics of a song
     * @name lyrics
     * @param {string} lyrics Title of the song
     * @returns {string} lyrics of the song
     */
    async lyrics(query) {
        if (!query) throw new err("No query was provided to search");
        const res = await fetch(`${base}/lyrics?name=${encodeURIComponent(query)}`);
        if (res.status == 401) {
            this.emit("error", "Check With Bear#3437");
            return undefined;
        }
        const response = await res.json();
        if (response.error) {
            this.emit('error', response.error);
            return undefined;
        }
        return response;
    };

    /**pokemon - Returns data about a pokemon
     *
     * @param {string} name Name of the pokemon
     */
    async pokemon(query) {
        if (!query) throw new err("No query was provided to search");
        const res = await fetch(`${base}/pokedex?pokemon=${encodeURIComponent(query.toLowerCase())}`);
        if (res.status == 401) {
            this.emit("error", "Check With Bear#3437");
            return undefined;
        }
        const response = await res.json();
        if (response.error) {
            this.emit('error', response.error);
            return undefined;
        }
        return response;
    };
}
module.exports = TAMAKOAPI;
