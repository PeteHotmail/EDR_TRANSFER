
/**
 *  the route for /collections/{collectionsId}/collectionsMetadata
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
 import fetchESRIMetaData from "../../../utils/fetchESRIMetaData"
 import assembleCollection from "../../../routes/collections/collectionId/assembleCollection";
 import { tokenHolder } from "./../../../index"
 

 /// TODO: look to use an An array of middleware functions in routes
 // http://expressjs.com/en/5x/api.html#app.get

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
 
     /** interception of proxy before it heads of to esri */
 
     get route (): Router {
 
         /** Query end point for position queries of collection {collectionId} */
                 // return router.get("/", proxy(this.protocol + "://" + this.target,{ --- Note: Issue with objects in azure app. So hard coded
 // Exucting the  function called proxy        

        return router.get("/", Pete);
     }
 }
     function Pete(req,res) {
        let collectionIdPath=req.originalUrl
        let hostName=req.headers.host;
        fetchESRIMetaData().then((esriMetadata:any) => {
 //  Once the esriMetadata is returned need to make sure that is organised by collection. It is possible
 //  that the esriMetadata How do we know if it is mixed or not?         
            console.log("From collections metadata vv",req.url);
            let object=assembleCollection(esriMetadata,collectionIdPath,hostName);
            res.status(200).json(object);
            }).catch(error => {
              console.log(error);
              res.status(404).send({ error: 404, message: error.message });
        }); 
         console.log("pater noster")
     };
 export default Route;