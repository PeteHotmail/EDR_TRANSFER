
/**
 *  the route for /collections/{collectionsId}/position
 */

import express, { Router } from "express";
import { debug } from "console";
import proxy from "express-http-proxy";
import strings from "../../../strings";
import RouteBase from "../../base";
// import PositionController from "../../../controllers/queries/position";
import url from "url";
import Geometry from "../../../utils/conversion";
import Mosaic from "../../../utils/imageserver";

// Express Router
const router: Router = express.Router();

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
            parametername: req.query["parameter-name"].split(",")
        };
        const requiredRouteParams = ["coords", "parametername"];
        this.isValidQuery(parameters, requiredRouteParams);
    }


    /**
     * builds the esri image server url
     * @param coords input coords from req
     * @param parametername input params from req
     */
    //  private buildUrl(coords: string, parametername: string): string {
        private buildUrl(coords, parametername,time:string,z:string,crs:string): string {
        const _coords = Geometry.WKTToEsri(coords);
        const _time:string = time;
        const _z:string = z;
        const _crs:string = crs;
        const _parametername: string[] = parametername.split(",");
        var _zArray: string[]
        if (!(_z===undefined)){
        _zArray = _z.split(",");
        }
        else{ 
        _zArray[0] =undefined;
        }
        const _timeArray: string[] = _time.split(",");
        const _mosaicRule = Mosaic.createMosaicRule(_parametername,_timeArray,_zArray,_crs);

        // TODO -- SWAP OUT HARD CODED to Collection ID and ENV files
        const _proxyurl = url.format({
            protocol: "https",
            hostname: "imagerydemo2.geocloud.com",
            pathname: "/arcgis/rest/services/ecmwf/ecmwf_st_sp_crf/ImageServer/getSamples",
            query: {
                f: "json",
                geometry: JSON.stringify(_coords),
                geometryType: "esriGeometryPoint",
                mosaicRule: JSON.stringify(_mosaicRule),
                returnFirstValueOnly: false,
                interpolation: "RSP_BilinearInterpolation",
                outFields: "*"
            }
          });

        return _proxyurl;
    }

    /** interception of proxy before it heads of to esri */
    private proxyReqPathResolver(req: any): Promise<any> {
        debug("GET /collections/{collectionsId}/position");
        debug(`Request url: ${req.url}`);

        try {
            this.validateReq(req);
        } catch (err) {
            debug(err);
            return Promise.reject({error: 500, message: "Failed to validate request"});
        }
        
        try {
            // validate the parameters then build the url
            const url: string = this.buildUrl(req.query.coords, req.query["parameter-name"],
            req.query.time,req.query.z,req.query.crs);
            return Promise.resolve(url);
        }
        catch (err) {
            // if failing to validate send error back
            debug(err);
            return Promise.reject({error: 500, message: "Internal Error"});
        }
       
    }

    private userResDecorator (proxyRes, proxyResData, userReq, userRes): string {
        /** handle user response */
        const data = JSON.parse(proxyResData.toString("utf8"));
    
        if ("error" in data) {
            userRes.status(500);
            return "failed";
        } else {
            userRes.status(200);
            return data;
        }
    }

    private proxyErrorHandler(err, res, next): string {
        /** handle user error */
        switch (err.error) {
          case err.error:{ return res.status(err.error).send({code: err.error, description: err.message});}
          default:{ next(strings.GENERAL_ERROR); }
        }
    }

    get route (): Router {
        const proxyReqPathResolver = this.proxyReqPathResolver.bind(this);
        const userResDecorator = this.userResDecorator.bind(this);
        const proxyErrorHandler = this.proxyErrorHandler.bind(this);

        /** Query end point for position queries of collection {collectionId} */
                // return router.get("/", proxy(this.protocol + "://" + this.target,{ --- Note: Issue with objects in azure app. So hard coded
        
        const routeFunction=proxy("https://imagerydemo2.geocloud.com/arcgis/rest/services",{
            proxyReqPathResolver,
            userResDecorator,
            proxyErrorHandler
        })
                return router.get("/", routeFunction);
    }
}  //  End of class declaration



export default Route;