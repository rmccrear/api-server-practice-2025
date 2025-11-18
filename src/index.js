// src/index.js
import express from 'express';

const app = express();
const port = 3000;

app.use(express.static('public'));

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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
