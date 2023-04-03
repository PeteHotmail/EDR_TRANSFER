/**
 * Entry point for application and has been updated on March 23rd at 08:55
 */

import {Server, HTTPSServer, HTTPServer} from "./server";
import router from "./routes/all";

import Framework from "./framework";
import dotenv from "dotenv";
import http from "http";
import { debug } from "console";

/**
 * Creates the Express framework app
 * @returns {http.RequestListener }
 */
function getFramework(): http.RequestListener {
    const frameworkFactory = new Framework();
    const app = frameworkFactory.createExpressApp(router);
    return app;
}
    const tokenHolder = {token: "Gill"};
    export {tokenHolder};
/**
 * 
 * @param {number} port the desired port for the server
 * @param {boolean} useHTTP switch for HTTP or HTTPS. Default is false
 */
function getServer(port: number, useHTTP: string, cert?: string, key?: string):  HTTPSServer | HTTPServer {
    const serverFactory = new Server();
    
    let server: HTTPSServer | HTTPServer;
    if (useHTTP === "http") {
        debug("using http");
        server = serverFactory.createHTTPServer(port);
    } else if (useHTTP === "https") {
        debug("using https");
        server = serverFactory.createHTTPSServer(port, cert, key);
    } else {
        throw Error("invalid protocol option, please use https or http in your environment variables");
    }
    return server;
}


/** initialise application */
function init(): void {
    // const port: number = parseInt(process.env.PORT) || 8043;
    const port: any = process.env.PORT || 8043;
    const certPath: string = process.env.CERT_PATH || ".\certificates\cert.pem";
    const keyPath: string  = process.env.KEY_PATH || ".\certificates\key.pem";
    const useHTTP: string = process.env.TARGET_PROTOCOL || "https";

    const app = getFramework();
    const server = getServer(port, useHTTP, certPath, keyPath);
    server.start(app);

}


/** utilise .env file */
function setupEnv(): void {
    dotenv.config();
}


/** main */
console.log("before any calls");

setupEnv();
init();