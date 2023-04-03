
/** basic "home" route for api */
import express, { Router } from "express";
import { debug } from "console";
import responses from "../responses";

// Express Router
const router: Router = express.Router();

/** basic point of entry for api */
router.get("/", (req, res) => {
    debug("GET / Pete");
    debug(`Request url: ${req.url}`);
    res.status(200).json(responses.home);
});

export default router;

