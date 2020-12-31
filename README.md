
# Tamako-API

Quick [Tamako API](https://api.tamako.tech) wrapper for beginners.


![Tamako-API](https://nodei.co/npm/tamako-api.png)



# Features

- Beginner friendly
- Ideal for beginner Discord Bot creators
- Easy to use


# Quick Example

```js
// Destructure the class from the library
const { TAMAKOAPI } = require("tamako-api");

// Instantiate the class before you can use it
const tamako = new TAMAKOAPI;

// Use the chatbot
// Note: Authkey and BID are important, you should store them
// in an environment variable wheneve possible

const username = process.env.TAMAKO_USERNAME;
const id = process.env.TAMAKO_ID;
const secret = process.env.TAMAKO_SECRET;
const message = 'Hello there';

tamako.chatbot(auth, bid, message).then((response) => {
   console.log(response);
});

// Fires whenever an error occurs
tamako.on("error", error => {
   console.log(error);
});
```

# Functions

## chatbot(username, id, secret, message, name, gender, userid)
Returns message sent by the chatbot or undefined (if error occurs)
	
| Parameter | Type | Default | Optional | Description |
| - | - | - | :-: | - |
| username | string | none | ❌ | You can get your own authkey [here](https://appcenter.theskyfallen.com/)
| id | string | none | ❌ | You can get your bid [here](https://appcenter.theskyfallen.com/)
| secret | string | none | ❌ | You can get your own secret [here](https://appcenter.theskyfallen.com/)
| message | string | none | ❌ | The message you want the chatbot to reply with 
| name | string | Tamako | ✔️ | The name of the chatbot
| gender | string | female | ✔️ | The gender of the chatbot
| userid | string | 123456 | ✔️ | Unique ID to tell users using the endpoint apart



## lyrics(name)
Returns lyrics of the song from the name
| Parameter | Type | Default | Optional | Description |
| - | - | - | :-: | - |
| name | string | none | ❌ | The title of the song |

Example
```js
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
tamako.pokemon('pikachu')
.then(res => console.log(res));
```


## joke()
Returns a random joke

Example
```js
tamako.joke()
.then(joke => console.log(joke));
```


## animalfact(name)
Returns a fact of the mentioned animal

`name` can be any of the following:
| | | | | | | | | | | |
| - | - | - | - | - | - | - | - | - | - | - |
| dog | cat | panda | fox | birb | koala | kangaroo | racoon | elephant | giraffe | whale |

Example
```js
tamako.animalfact('dog')
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
