
/**
 *  the route for /collections/{collectionsId}/position
 * cloned from collectionIdmetadata
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
 import fetchESRICollectionIdMetaData from "../../../utils/fetchESRICollectionIdMetaData"
 import assembleCollectionId from "./AssembleCollectionId";
 

 /// TODO: look to use an An array of middleware functions in routes
 // http://expressjs.com/en/5x/api.html#app.get

 // Express Router
 const router: Router = express.Router();
 
 class Route extends RouteBase{
     protocol = "https";
     target: string;
     constructor(protocol: string, target: string) {
         super();
         this.protocol = protocol;
         this.target = target;
     }

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
     private validateReq(req: any): void {
        const parameters = {
            coords: req.query.coords,
            parametername: req.query["parameter-name"].split(",")
        };
        const requiredRouteParams = ["coords", "parametername"];
        this.isValidQuery(parameters, requiredRouteParams);
    }



     get route (): Router {
 
         /** Query end point for position queries of collection {collectionId} */
                 // return router.get("/", proxy(this.protocol + "://" + this.target,{ --- Note: Issue with objects in azure app. So hard coded
 // Exucting the  function called proxy  
       
        return router.get("/", Pete);
     }
 }  //  End of class declaration
 
    function Pete(req,res) {
    let collectionIdPath=req.originalUrl
    let hostName=req.headers.host;
    const proxyReqPathResolver = this.proxyReqPathResolver;
        fetchESRICollectionIdMetaData(collectionIdPath).then((esriMetadata:any) => {
 //  Once the esriMetadata is returned need to make sure that is organised by collection. It is possible
 //  that the esriMetadata How do we know if it is mixed or not? 
            console.log("From collectionId metadata ",req.originalUrl);        
            let object=assembleCollectionId(esriMetadata,collectionIdPath,hostName);
            res.status(200).json(object);
            }).catch(error => {
              console.log(error);
              res.status(404).send({ error: 404, message: error.message });
        }); 
         console.log("pater noster")
     };
 export default Route;