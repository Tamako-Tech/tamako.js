
# Tamako-API

Quick [Tamako API](https://api.tamako.tech) wrapper for beginners.

[![App Version](https://img.shields.io/npm/v/tamako-api)](https://www.npmjs.com/package/tamako-api)
[![Node](https://img.shields.io/node/v/tamako-api?color=green&logo=Node.js&logoColor=white)]()
[![License](https://img.shields.io/github/license/BearTS/tamako-api?color=blue&label=License)](https://github.com/BearTS/tamako-api/blob/master/LICENSE)

![Tamako-API](https://nodei.co/npm/tamako-api.png)



# Features

- Beginner friendly
- Ideal for beginner Discord Bot creators
- Easy to use


# Quick Example

```js
// Destructure the class from the library
const { TAMAKOAPI } = require("tamako-api");

// Note: Username, id, and secret are important, you should store them
// in an environment variable whenever possible and be kept private at all times

// Instantiate the class before you can use it
// Parameters are only required if you want to use the chatbot method
// You can get your own username, id, and secret here -> https://appcenter.theskyfallen.com/
// chatbot parameter is optional
const tamako = new TAMAKOAPI({
 svcid: process.env.TAMAKO_SERVICEID,
 prvid: process.env.TAMAKO_PRIVATEID,
 svcsecret: process.env.TAMAKO_SECRET,
 chatbot: {
   name: "The name for the bot",
   gender: "The assumed gender of the bot",
   prefix: "The prefix of your bot",
   dev: "The creator of your bot (naturally it is you)"
   }
});

// Using default values for options found in tamako.cboptions
tamako.chatbot('hello there', { user: '123456' }).then((response) => {
   console.log(response);
});

// Using own values without using the options found on tamako.cboptions
tamako.chatbot('hello there', {
   name: "The name for the bot",
   gender: "The assumed gender of the bot",
   user: "123456",
   prefix: "The prefix of your bot",
   dev: "The creator of your bot (naturally it is you)"
}).then(response => console.log(response));

// Fires whenever an error occurs
tamako.on("error", error => {
   console.log(error);
});
```

# Authenticated Functions

## chatbot(message, options)
Note: Requires authentication
Returns message sent by the chatbot or undefined (if error occurs)

| Parameter | Type | Default | Optional | Description |
| - | - | - | :-: | - |
| message | string | none | ❌ | The message you want the chatbot to reply with
| options.name | string | Tamako | ✔️ | The name of the chatbot
| options.gender | string | female | ✔️ | The gender of the chatbot
| options.user | string | none | ❌ | Unique ID to tell users using the endpoint apart
| options.prefix | string | Not Set By Developer | ✔️ | It should be your bot's prefix
| options.dev | string | Bear#3437 | ✔️ | Name Of the developer of the bot

# Unauthenticated Functions

## lyrics(name)
Returns lyrics of the song from the name
| Parameter | Type | Default | Optional | Description |
| - | - | - | :-: | - |
| name | string | none | ❌ | The title of the song |

Example
```js
const { TAMAKOAPI } = require('tamako-api');
const tamako = new TAMAKOAPI();

tamako.lyrics('In the End')
.then(res => {
const lyrics = res.lyrics;
const cover = res['album-art'];
const artist = res.artist;
const link = res.link

console.log(lyrics, cover, artist, link);
});
```


## pokemon(name)
Returns an object containing information about the Pokemon
| Parameter | Type | Default | Optional | Description |
| - | - | - | :-: | - |
| name | string | none | ❌ | The name of the pokemon |

Example
```js
const { TAMAKOAPI } = require('tamako-api');
const tamako = new TAMAKOAPI();

tamako.pokemon('pikachu')
.then(res => console.log(res));
```


## joke()
Returns a random joke

Example
```js
const { TAMAKOAPI } = require('tamako-api');
const tamako = new TAMAKOAPI();

tamako.joke()
.then(joke => console.log(joke));
```


## animalfact(name)
Returns a fact of the mentioned animal

`name` can be any of the following:
| | | | | | | | | | | | |
| - | - | - | - | - | - | - | - | - | - | - | - |
| bird | bunny | cat | dog | fox | giraffe | kangaroo | koala | panda | racoon | whale | elephant |

Example
```js
const { TAMAKOAPI } = require('tamako-api');
const tamako = new TAMAKOAPI();

tamako.animalfact('dog')
.then(res => console.log(res))
```

## image(type)
Returns an image link

`type` can be any of the following:
| | | | | | | | | | |
| - | - | - | - | - | - | - | - | - | - |
| bird | dog | cat | dog | fox | koala | panda | redpanda | tamako | mai |

Example
```js
const { TAMAKOAPI } = require('tamako-api');
const tamako = new TAMAKOAPI();

tamako.image('dog')
.then(res => console.log(res))
```

## roleplay(type)
Returns a gif image link

`type` can be any of the following:
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
| - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - |- |
| baka | bite | blush | celebrate | cry | dance | disgust | eat | explode | feed | fistbump | happy | highfive | holdhands | hug | inhale | kill | kiss | lick | midfing | pat | poke | punch | slap | sleep | smug | tickle | wave | wink |

Example
```js
const { TAMAKOAPI } = require('tamako-api');
const tamako = new TAMAKOAPI();

tamako.roleplay('hug')
.then(res => console.log(res))
```

# Events
`error` - Returns an error if an error is returned from the API.
Example
```js
tamako.on('error', (err) => {
  console.log('Encountered an error:' + err.message)
})
```

# Links
- **[Discord Support Server](https://support.tamako.tech)**
- **[GitHub](https://github.com/BearTS/tamako-api)**
