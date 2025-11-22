// src/index.js
import express from 'express';

import cors from "cors";

import { randomUUID } from 'node:crypto';

import { readFile } from 'node:fs';

// optional - add routes to modularize code
import iceCreamRoute from './routes/ice-cream.js';

// optional - import our fake data from a separate file.
// (instead of creating a variable for gamesStorage)
// import gamesStorage from './games-db.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())

app.use(express.static('public'));
// Middleware to parse JSON request bodies
// This transforms the plain text JSON string into a JavaScript object
app.use(express.json());

// optional - add routes to modularize code
// example: /ice-cream/favorites
app.use("/api/ice-cream", iceCreamRoute);


// seed our fake db with 3 games
let gamesStorage = [
    { id: "abcdefg", name: "Minecraft", cost: 30, vendors: ["Toys R Us", "Amazon", "Microsoft Store"] },
    { id: "hijklmnop", name: "World of Warcraft II", cost: 50, vendors: ["Steam", "Amazon", "Game Stop"] },
    { id: "qrstuvwxyz", name: "World of Warships", cost: 20, vendors: ["Steam", "Amazon", "Game Stop"] }
];

// Routes
app.get('/', (req, res) => {
    res.type("text/plain");
    res.json('<h1>Hello Express!</h1><p>Your server is working!</p>');
});

app.get("/get-the-file", (req, res) => {
    // readFile('./public/hello.css', (err, data) => {
    readFile('./public/hot-reload.png', (err, data) => {
        if (err) throw err;
        // console.log(data);
        // const dataBuffer = Buffer.from(data)
        // const utf8Decoder = new TextDecoder('UTF-8')
        // const text = utf8Decoder.decode(dataBuffer);
        // console.log(text) // Obst;Person;
        // res.type("text/css")
        // res.send(text);
        res.type("text/plain")
        res.send(data)
    });
})


// Our own API Server
app.get('/pika', (req, res) => {
    res.json({
        name: "pikapika",
        weight: 20,
        height: 55,
        power: "lightening"
    });
});

// cat route
app.get('/my-cat', (req, res) => {
    res.json({
        name: "Fluffy",
        age: 2,
        breed: "Maine Coon"
    });
});

// fav poke route
app.get('/fav-poke', (req, res) => {
    const poke = { "pokemon": "Bulbasaur", "height": 0.7, "weight": 6.9, "attacks": ["Vine Whip", "Seed Bomb", "Solar Beam"] }
    res.json(poke);
});

// GAMES API
// "REST" API

app.get("/api/v1/games", (req, res) => {
    res.json(gamesStorage)
});

// get by "id" where the id is just the index.
app.get("/api/v1/games/:id", (req, res) => {
    // using object destructuring...
    // const {id} = req.params;
    // using dot notation...
    const id = req.params.id;



    // Using the reducer pattern...
    // let game = null;
    // for(let i=0; i<gamesStorage.length; i++) {
    //     if(gamesStorage[i].id === id) {
    //         game = gamesStorage[i];
    //     }
    // }
    
    // Using the array method (convenience function)...
    const game = gamesStorage.find((g) => g.id === id);
    
    res.json(game);
});

app.delete("/api/v1/games/:id", (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;

    // Using the filter pattern...
    // const temp = [];
    // for(let i=0; i<gamesStorage.length; i++){
    //     if( gamesStorage[i].id !== id ) {
    //         // keep
    //         temp.push(gamesStorage[i])
    //     }
    // }
    // gamesStorage = temp;

    // Using the array method (convenience function)...
    gamesStorage = gamesStorage.filter(g => g.id !== id);

    res.status(200);
    res.json();
})

app.post("/api/v1/games", (req, res) => {
    console.log(req.body);

    // create new game from user input (safer to avoid extra params) 
    // const newGame = {
    //     name: req.body.name,
    //     price: req.body.price
    // }
    const newGame = req.body;

    console.log(newGame);
    
    // add new game to our list
    // const nextId = gamesStorage.length + 1;
    const nextId = randomUUID();   // make a brand new id...
    // newGame.id = nextId; // Using dot notation to mutate the object
    const newGameWithId = { ...newGame, id: nextId } // using the spread operator to create a new object based on the old one.
    
    gamesStorage.push(newGameWithId)

    // inform user that we have been successful
    res.status(201);
    res.json(newGameWithId);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
