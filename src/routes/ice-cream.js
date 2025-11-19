import { Router } from "express";

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

export default iceCreamRoute;