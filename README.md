# Express API Practice

Welcome! This mini project is meant for developers who are touching Express and modern JavaScript for the first time. You will spin up a simple HTTP server, add a custom API route, and get familiar with handy ES6 syntax like arrow functions and destructuring.

## Project Overview

- Tech stack: Node.js, Express 5, ES modules (`type: "module"` in `package.json`).
- Entry point: `src/index.js` builds an Express app, serves static files in `public`, and exposes two routes: `GET /` for a minimal HTML page and `GET /pika` for a JSON payload.
- Run scripts:
  - `npm install` – install dependencies.
  - `npm run dev` – start with live reload via Nodemon.
  - `npm start` – run the server once with Node.

## Setting Up

```bash
npm install
npm run dev
```

Open http://localhost:3000 to verify the landing page. Visit http://localhost:3000/pika to see the JSON API response. Keep the server running so you can edit `src/index.js` and watch live reloads in the terminal.

## Express Concepts to Notice

1. **App creation** – `const app = express();` bootstraps the HTTP server.
2. **Middleware** – `app.use(express.static('public'));` serves files out of the `public` folder.
3. **Route handlers** – `app.get(path, handler)` attaches logic for each HTTP verb + path combo.
4. **Responses** – `res.send()` returns HTML/text, while `res.json()` serializes plain objects.
5. **Port binding** – `app.listen(port, callback)` keeps the server alive and logs when ready.

Try adding a new route, e.g. `app.get('/status', (req, res) => res.json({ up: true }));`, and watch how Express automatically sets the `Content-Type` and status code.

## ES6 Function Patterns

Express plays nicely with modern JavaScript features. This project already uses ES modules (`import ... from ...`) and arrow functions for concise callbacks:

```js
app.get('/pika', (req, res) => {
  res.json({ name: 'pikapika', weight: 20, power: 'lightening' });
});
```

Key ES6 concepts to explore while you build routes:

- **Arrow functions** – shorter syntax that keeps `this` lexical, perfect for callbacks.
- **Destructuring** – extract `const { query } = req;` to grab query params quickly.
- **Default parameters** – `const power = req.query.power ?? 'electric';` avoids manual checks.
- **Template literals** – `res.send(\`Welcome, ${name}!\`);` embed variables directly in strings.

Experiment by writing helper functions using these features. For instance:

```js
const buildPokemon = ({ name = 'Unknown', weight = 0, power = 'mystery' }) => ({
  name,
  weight,
  power
});

app.get('/custom-pika', (req, res) => {
  const pokemon = buildPokemon({ name: 'Pikachu', weight: 20, power: 'lightening' });
  res.json(pokemon);
});
```

## Suggested Next Steps

- Add more API routes that return arrays, nested objects, or status codes like `res.status(404).json({...})`.
- Wire up query parameters (`req.query`) or route params (`req.params`) to customize responses.
- Serve a real frontend from `public` and fetch your API routes with `fetch`.
- Introduce error-handling middleware to learn how Express manages failures elegantly.

Have fun experimenting and keep referencing the Express docs as you expand this practice server!
