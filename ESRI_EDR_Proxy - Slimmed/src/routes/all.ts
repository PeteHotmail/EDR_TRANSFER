/** collective routes module */
import express, { Router } from "express";
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import strings from "../strings";
import home from "./home";
import conformance from "./conformance";
import groups from "./groups";
import collections from "./collections";
import dotenv from "dotenv";
//  Note that the import is acually and import of the object router for that url
dotenv.config();
// Documentation libraries
const swaggerPath = process.env.SWAGGER;
const swaggerDocument = yaml.safeLoad(fs.readFileSync(path.resolve(process.env.SWAGGER), "utf8"));

// Express Router
const router: Router = express.Router();

/** EDR Routes */
router.use("/", home);
router.use("/conformance", conformance);
router.use("/groups", groups);
router.use("/collections", collections);

// Add path for swagger documentation
router.use("/doc", swaggerUi.serve);
router.get("/doc", swaggerUi.setup(swaggerDocument));

// Provide a handler for anything else such as sending a GET instead of POST to a route
router.use("*", (req, res) => {
    res.status(404).send(strings.ROUTE_NOT_FOUND);
});

export default router;