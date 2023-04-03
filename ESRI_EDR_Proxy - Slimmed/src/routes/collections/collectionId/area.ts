/**
 *  the route for /collections/{collectionsId}/area This is a change 11/02/2023
 */

/// TODO: look to use an An array of middleware functions in routes
// http://expressjs.com/en/5x/api.html#app.get


import express, { Router } from "express";
import { debug } from "console";
import proxy from "express-http-proxy";
import url from "url";

import strings from "../../../strings";
import RouteBase from "../../base";
// import AreaController from "../../../controllers/queries/area";
import Geometry from "../../../utils/conversion";
import Mosaic from "../../../utils/imageserver";

// Express Router
const router: Router = express.Router();

/** route module */
class Route extends RouteBase{
    protocol = "https";
    target: string;
    constructor(protocol: string, target: string) {
        super();

        // TODO: currently making assumptions that this is ok
        // needs better error control.
        this.protocol = protocol;
        this.target = target;
    }


    /**
     * validates the parameters that are required exist
     * otherwise it throws an error
     * @param req input express request
     */
    private validateReq(req: any): void {
        const parameters = {
            coords: req.query.coords,
            parametername: req.query.parametername.split(",")
        };
        const requiredRouteParams = ["coords", "parametername"];
        this.isValidQuery(parameters, requiredRouteParams);
    }


    /**
     * builds the esri image server url
     * @param coords input coords from req
     * @param parametername input params from req
     */
    private buildUrl(coords: string, parametername: string): string {

        const _coords = Geometry.WKTToEsri(coords);
        const _parametername: string[] = parametername.split(",");
        const _mosaicRule = Mosaic.createMosaicRule(_parametername);

        // TODO -- SWAP OUT HARD CODED to Collection ID and ENV files
        const _proxyurl = url.format({
            protocol: "https",
            hostname: "imagerydemo2.geocloud.com",
            pathname: "/arcgis/rest/services/ecmwf/ecmwf_st_sp_crf/ImageServer/getSamples",
            query: {
                f: "json",
                geometry: JSON.stringify(_coords),
                geometryType: "esriGeometryPolygon",
                mosaicRule: JSON.stringify(_mosaicRule),
                returnFirstValueOnly: true,
                interpolation: "RSP_BilinearInterpolation",
                outFields: "*"
            }
        });

        return _proxyurl;
    }


    /** interception of proxy before it heads of to esri */
    private proxyReqPathResolver(req: any): Promise<any> {
        debug("GET /collections/{collectionsId}/area");
        debug(`Request url: ${req.url}`);
    
        try {
            this.validateReq(req);
        } catch (err) {
            debug(err);
            return Promise.reject({error: 500, message: "Failed to validate request"});
        }
        
        try {
            // validate the parameters then build the url
            const url: string = this.buildUrl(req.query.coords, req.query.parametername);
            return Promise.resolve(url);
        }
        catch (err) {
            // if failing to validate send error back
            debug(err);
            return Promise.reject({error: 500, message: "Internal Error"});
        }
       
    }

    /** interception of response before it sent to the client */
    private userResDecorator (proxyRes, proxyResData, userReq, userRes): string {
        
        /** handle user response */
        const data = JSON.parse(proxyResData.toString("utf8"));      

        // bit messy here at the moment TODO: sort out arrays for coverage
        if ("error" in data) {
            debug(data);
            userRes.status(500);
            return "failed";
        } else {
            userRes.status(200);
            // const holding = [];
            // for (const name of parameters) {
            //     debug(name);
            //     for (const sample of data.samples) {
            //         const value = sample.attributes[name];
            //         holding.push(value);
            //     }
            // }
            return data;
        }
    }


    /** handles error in the chain */
    private proxyErrorHandler(err, res, next): string {
        
        /** handle user error */
        switch (err.error) {
          case err.error:{ return res.status(err.error).send({code: err.error, description: err.message});}
          default:{ next(strings.GENERAL_ERROR); }
        }
    }

    /** returns the express route */
    get route (): Router {
        
        const proxyReqPathResolver = this.proxyReqPathResolver.bind(this);
        const userResDecorator = this.userResDecorator.bind(this);
        const proxyErrorHandler = this.proxyErrorHandler.bind(this);

        /** Query end point for position queries of collection {collectionId} */
        // return router.get("/", proxy(this.protocol + "://" + this.target,{ --- Note: Issue with objects in azure app. So hard coded
        return router.get("/", proxy("https://imagerydemo2.geocloud.com/arcgis/rest/services",{
                proxyReqPathResolver,
                userResDecorator,
                proxyErrorHandler
            })
        );
    }
}


export default Route;