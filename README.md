# brutal-client

[![license](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

## This was inspired by [DiepSocket](https://github.com/Cazka/diepsocket)

## Installation

`git clone https://github.com/Craabby/brutal-client.git`

## Making a connection

```js
const BrutalClient = require("./brutal-client") // brutal-client must be in the same directory, move to node_modules if you dont want to use the ./

const bot = new BrutalClient("enter websocket url here")

bot.on("open", () => { // when the websocket connection is finished, run the code in the function
  bot.spawn("brutal-client"); // makes the bot spawn into the game with the name "brutal-client"

  bot.send("input", {
    mouse: new BrutalSocket.Vector(100, 100), // makes the bot's mouse position be 100, 100
    flags: {
      playerIsMoving: true, 
    },
  });
});
```
