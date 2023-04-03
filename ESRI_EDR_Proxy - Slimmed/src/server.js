"use strict";
/** hold classes responsible for generating web servers */
exports.__esModule = true;
exports.HTTPServer = exports.HTTPSServer = exports.Server = void 0;
var https_1 = require("https");
var http_1 = require("http");
var fs_1 = require("fs");
var console_1 = require("console");
/**
 * abstracting the base class. This server represents
 * a HTTP server.
 */
var HTTPServer = /** @class */ (function () {
    function HTTPServer(port) {
        this.port = port;
    }
    /**
     * initialise the declared framework within the server
     * @param {any} framework the framework "app" which will be applied. Typically Express
     */
    HTTPServer.prototype.start = function (framework) {
        var _this = this;
        var app = framework;
        this._instance = http_1["default"].createServer(app).listen(this.port, function () {
            console_1.debug("http server started at http://localhost:" + _this.port);
        });
        return app;
    };
    Object.defineProperty(HTTPServer.prototype, "instance", {
        /** returns the instance of the http server */
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return HTTPServer;
}());
exports.HTTPServer = HTTPServer;
/**
 * This server represents a HTTPS server.
 * It requires a cert and key file.
 */
var HTTPSServer = /** @class */ (function () {
    function HTTPSServer(port, cert, key) {
        this.port = port;
        var pathArray = [cert, key];
        this.doesExist(pathArray);
        this.cert = cert; // path to cert
        this.key = key; // path to key
    }
    /**
     * initialise the declared framework within the server
     * @param {http.RequestListener} framework the framework "app" which will be applied. Typically Express
    */
    HTTPSServer.prototype.start = function (framework) {
        var _this = this;
        var app = framework;
        var options = {
            key: fs_1["default"].readFileSync(this.key),
            cert: fs_1["default"].readFileSync(this.cert)
        };
        this._instance = https_1["default"].createServer(options, app).listen(this.port, function () {
            console_1.debug("https server started at https://localhost:" + _this.port);
        });
        return app;
    };
    /**
     * validate existence of the input paths.
     * @param path path to file that need validating
     */
    HTTPSServer.prototype.doesExist = function (paths) {
        var _loop_1 = function (path) {
            if (path) {
                fs_1["default"].stat(path, function (err) {
                    if (err) {
                        if (err.code === "ENOENT") {
                            throw Error("file at " + path + " does not exist");
                        }
                    }
                });
            }
            else {
                throw Error("file path declared as invalid value - " + path);
            }
        };
        for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
            var path = paths_1[_i];
            _loop_1(path);
        }
    };
    Object.defineProperty(HTTPSServer.prototype, "instance", {
        /** returns the instance of the http server */
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return HTTPSServer;
}());
exports.HTTPSServer = HTTPSServer;
/** generates web servers to host framework app */
var Server = /** @class */ (function () {
    function Server() {
    }
    Server.prototype.createHTTPServer = function (port) {
        if (port === void 0) { port = 8080; }
        return new HTTPServer(port);
    };
    Server.prototype.createHTTPSServer = function (port, cert, key) {
        if (port === void 0) { port = 8043; }
        if (cert === void 0) { cert = null; }
        if (key === void 0) { key = null; }
        return new HTTPSServer(port, cert, key);
    };
    return Server;
}());
exports.Server = Server;
exports["default"] = Server;
