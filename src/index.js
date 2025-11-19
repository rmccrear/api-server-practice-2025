// src/index.js
import express from 'express';

// optional - add routes to modularize code
import iceCreamRoute from './routes/ice-cream.js';

// optional - import our fake data from a separate file.
// (instead of creating a variable for gamesStorage)
// import gamesStorage from './games-db.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
// Middleware to parse JSON request bodies
// This transforms the plain text JSON string into a JavaScript object
app.use(express.json());

// optional - add routes to modularize code
// example: /ice-cream/favorites
app.use("/api/ice-cream", iceCreamRoute);


// seed our fake db with 3 games
let gamesStorage = [
    { name: "Minecraft", cost: 60 },
    { name: "World of Warcraft", cost: 50 },
    { name: "World of Warships", cost: 20 }
];

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Hello Express!</h1><p>Your server is working!</p>');
});

// Our own API Server
app.get('/pika', (req, res) => {
    res.json({
        name: "pikapika",
        weight: 20,
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

app.get("/api/games", (req, res) => {
    res.json(gamesStorage)
});

app.post("/api/games", (req, res) => {
    console.log(req.body);


    if(req.body === undefined) {
        res.status(400);
        return res.json({
            error: {
                message: "no body in request"
            }
        })
    }
    if(req.body.name === undefined){
        res.status(400);
        return res.json({
            error: {
                message: "no name supplied"
            }
        });
    }

    // create new game from user input
    const newGame = {
        name: req.body.name,
        price: req.body.price
    }

    // add new game to our list
    console.log(newGame);
    gamesStorage.push(newGame)

    // inform user that we have been successful
    res.status(201);
    res.json(newGame);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
