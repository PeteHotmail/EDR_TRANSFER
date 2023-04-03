"use strict";
exports.__esModule = true;
/** collective routes module */
var express_1 = require("express");
var swagger_ui_express_1 = require("swagger-ui-express");
var js_yaml_1 = require("js-yaml");
var fs_1 = require("fs");
var path_1 = require("path");
var strings_1 = require("../strings");
var home_1 = require("./home");
var conformance_1 = require("./conformance");
var groups_1 = require("./groups");
var collections_1 = require("./collections");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
// Documentation libraries
var swaggerPath = process.env.SWAGGER;
var swaggerDocument = js_yaml_1["default"].safeLoad(fs_1["default"].readFileSync(path_1["default"].resolve(process.env.SWAGGER), "utf8"));
// Express Router
var router = express_1["default"].Router();
/** EDR Routes */
router.use("/", home_1["default"]);
router.use("/conformance", conformance_1["default"]);
router.use("/groups", groups_1["default"]);
router.use("/collections", collections_1["default"]);
// Add path for swagger documentation
router.use("/doc", swagger_ui_express_1["default"].serve);
router.get("/doc", swagger_ui_express_1["default"].setup(swaggerDocument));
// Provide a handler for anything else such as sending a GET instead of POST to a route
router.use("*", function (req, res) {
    res.status(404).send(strings_1["default"].ROUTE_NOT_FOUND);
});
exports["default"] = router;
