/** holds classes responsible for managing framework */

import express, { Router } from "express";
import helmet from "helmet";
import cors from "cors";
import http from "http";



/** interface for framework instances */
interface AppBase {
    instance(): any;
}

/**
 * An express app instance. 
 * @param {Router} router an Express router object. Ideally a route module. 
 */
class ExpressApp implements AppBase {
    private _instance: any;

    constructor(router: Router) {
        // set up app
        this._instance = express();
        this._instance.use(cors());
        this._instance.use(helmet());
        this._instance.use(router);
    }

    get instance (): any {
        return this._instance;
    }
}

/** factory class to produces framework component */
class Framework {

    /**
     * create an express app
     * @param {Router} routes instance of express routes
     */
    createExpressApp(routes: Router): http.RequestListener {
        const app = new ExpressApp(routes);
        return app.instance;
    }
}


export default Framework;