
/** basic "home" route for api */
import express, { Router } from "express";
import { debug } from "console";
import responses from "../responses";

// Express Router
const router: Router = express.Router();


/** list all requirements classes specified in a standard that the server conforms to */
router.get("/", (req, res) => {
    debug("GET /conformance petes conformance");
    debug(`Request url: ${req.url}`);
    res.status(200).json(responses.conformance);
});

export default router;
