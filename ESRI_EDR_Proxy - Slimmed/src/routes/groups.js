"use strict";
exports.__esModule = true;
/** basic "home" route for api */
var express_1 = require("express");
var console_1 = require("console");
var responses_1 = require("../responses");
// Express Router
var router = express_1["default"].Router();
/** list all requirements classes specified in a standard that the server conforms to */
router.get("/", function (req, res) {
    console_1.debug("GET /conformance");
    console_1.debug("Request url: " + req.url);
    res.status(200).json(responses_1["default"].groups);
});
/** List of links to information available in the group */
router.get("/:groupId", function (req, res) {
    console_1.debug("GET /group/{groupId}");
    console_1.debug("Request url: " + req.url);
    res.status(200).json(responses_1["default"].groups_groupId);
});
exports["default"] = router;
