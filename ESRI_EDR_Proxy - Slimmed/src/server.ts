
/** hold classes responsible for generating web servers */

import https from "https";
import http from "http";
import fs from "fs";
import { debug } from "console";



/** core base class supporting different server types */
interface ServerBase {
    port: number; // port the server should deploy
    instance: http.Server; // variable representing the http server instance generated
    start(framework: http.RequestListener): http.RequestListener; // function which "starts" the server

}


/**
 * abstracting the base class. This server represents
 * a HTTP server. 
 */
class HTTPServer implements ServerBase {
    port: number;
    private _instance: http.Server;

    constructor(port: number) {
        this.port = port;
    }
    
    /**
     * initialise the declared framework within the server
     * @param {any} framework the framework "app" which will be applied. Typically Express
     */
    start(framework: http.RequestListener): http.RequestListener {
        const app = framework;
        this._instance = http.createServer(app).listen(this.port, () => {
            debug( `http server started at http://localhost:${ this.port }` );
        });
        return app;
    }

    /** returns the instance of the http server */
    get instance(): http.Server {
        return this._instance;
    }

}


/**
 * This server represents a HTTPS server.
 * It requires a cert and key file. 
 */
class HTTPSServer implements ServerBase {
    port: number;
    private key: string;
    private cert: string;
    private _instance: https.Server;

    constructor(port: number, cert: string, key: string) {
        this.port = port;
        
        const pathArray = [cert, key];
        this.doesExist(pathArray);
    
        this.cert = cert; // path to cert
        this.key = key; // path to key
    }

    /**
     * initialise the declared framework within the server
     * @param {http.RequestListener} framework the framework "app" which will be applied. Typically Express
    */
    start(framework: http.RequestListener): http.RequestListener {

        const app = framework;
        const options = {
            key: fs.readFileSync(this.key),
            cert: fs.readFileSync(this.cert)
        };
        this._instance = https.createServer(options, app).listen(this.port, () => {
            debug( `https server started at https://localhost:${ this.port }` );
        });
        return app;
    }

    /**
     * validate existence of the input paths.
     * @param path path to file that need validating
     */
    private doesExist(paths: string[]): void {
        
        for (const path of paths) {
            if (path) {
                fs.stat(path, (err) => {
                    if (err) {
                        if (err.code === "ENOENT") {
                            throw Error ("file at " + path + " does not exist");
                        }
                    }
                });
            } else {
                throw Error ("file path declared as invalid value - " + path);
            }
        }
    }


    /** returns the instance of the http server */
    get instance(): https.Server {
        return this._instance;
    }

}


/** generates web servers to host framework app */
class Server {

    createHTTPServer(port=8080): HTTPServer {
        return new HTTPServer(port);
    }

    createHTTPSServer(port=8043, cert: string = null, key: string = null): HTTPSServer {
        return new HTTPSServer(port, cert, key);
    }
}



export default Server;
export {Server, HTTPSServer, HTTPServer};