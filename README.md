
# Tamako-API

Quick [Tamako API](https://api.tamako.tech) wrapper for beginners.



![Tamako-API](https://nodei.co/npm/tamako-api.png)



# Features

- Beginner friendly

- Easy to use




# Quick Example



```js

const { TAMAKOAPI } =  require("tamako-api");

const  tamako  =  new  TAMAKOAPI;



tamako.chatbot("AUTHKEY","BID","Hello There").then(console.log);

tamako.on("error", error => {
			console.log(error);
		});


```

# Functions



**NOTE:** Parameters with `<>` are compulsory while those with `[]` are optional



`chatbot(<authkey>, <bid>, <message>, [name], [gender], [userid])` - Returns message sent by the Chatbot

Default values: `name`: Tamako, `gender`: female, `userid`: 123456



`lyrics(<name>)` - Returns lyrics of the song mentioned


`pokemon(<name>)` - Returns an object containing information about the Pokemon

`joke()`  - Returns a joke

# Image API

`image(<category>)` - Returns an object containing information about the category

### Accepted Values

- Dog
- Cat
- Panda
- Red_panda
- Fox
- Birb
- Koala
- Kangaroo
- Racoon
- Whale
- Pikachu

# Animal Facts API

`animalfact(<name>)` - Returns a fact of the mentioned animal

### Accepted values

- Dog
- Cat
- Panda
- Fox
- Birb
- Koala
- Kangaroo
- Racoon
- elephant
- giraffe
- whale

# Events

`error` - Returns an error if an error is returned from the API.



# Links

- **[Discord Support Server](https://support.tamako.tech)**

- **[GitHub](https://github.com/BearTS/tamako-api)**
