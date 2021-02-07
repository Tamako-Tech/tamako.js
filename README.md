
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
const tamako = new TAMAKOAPI({
 username: process.env.TAMAKO_USERNAME,
 id: process.env.TAMAKO_ID,
 secret: process.env.TAMAKO_SECRET
});

tamako.chatbot('hello there').then((response) => {
   console.log(response);
});

// Fires whenever an error occurs
tamako.on("error", error => {
   console.log(error);
});
```

# Authenticated Functions

## chatbot(message, name, gender, userid)
Note: Requires authentication
Returns message sent by the chatbot or undefined (if error occurs)

| Parameter | Type | Default | Optional | Description |
| - | - | - | :-: | - |
| message | string | none | ❌ | The message you want the chatbot to reply with
| name | string | Tamako | ✔️ | The name of the chatbot
| gender | string | female | ✔️ | The gender of the chatbot
| userid | string | 123456 | ✔️ | Unique ID to tell users using the endpoint apart
| prefix | string | Not Set By Developer | ✔️ | It should be your bot's prefix
| dev | string | Bear#3437 | ✔️ | Name Of the developer of the bot

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

## image(name)
Returns an image link

`name` can be any of the following:
| | | | | | | | |
| - | - | - | - | - | - | - | - |
| bird | dog | cat | dog | fox | koala | panda | redpanda |

Example
```js
const { TAMAKOAPI } = require('tamako-api');
const tamako = new TAMAKOAPI();

tamako.image('dog')
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
