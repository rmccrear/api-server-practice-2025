import { Router } from "express";

import iceCreamStorage from "../ice-cream-db.js";

const iceCreamRoute = Router();


iceCreamRoute.get("/favorite", (req, res) => {
    res.json({
        name: "Cherry",
        calories: 500
    });
})

iceCreamRoute.get("/least-favorite", (req, res) => {
    res.json({
        name: "Sour Apple",
        calories: 200
    });
})

iceCreamRoute.get("/", (req, res) => {
    res.json(iceCreamStorage);
})

export default iceCreamRoute;