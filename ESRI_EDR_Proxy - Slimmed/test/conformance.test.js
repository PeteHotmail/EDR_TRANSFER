"use strict";
exports.__esModule = true;
var supertest_1 = require("supertest");
var server_1 = require("../src/server");
var framework_1 = require("../src/framework");
var all_1 = require("../src/routes/all");
var dotenv_1 = require("dotenv");
/**
 * Creates the Express framework app
 * @returns {http.RequestListener }
 */
function getFramework() {
    var frameworkFactory = new framework_1["default"]();
    var app = frameworkFactory.createExpressApp(all_1["default"]);
    return app;
}
/** utilise .env file */
function setupEnv() {
    dotenv_1["default"].config();
}
describe("GET /groups on http", function () {
    var app;
    var server;
    var framework;
    beforeAll(function () {
        setupEnv();
        var port = 8083;
        framework = getFramework();
        var serverFactory = new server_1.Server();
        server = serverFactory.createHTTPServer(port);
        app = server.start(framework);
    });
    it("/conformance should return 200 OK", function () {
        return supertest_1["default"](app).get("/conformance")
            .expect(200);
    });
});
