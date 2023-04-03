
/**
 *  the route for /collections/{collectionsId}/collectionIdMetadata
 */

 import express, { Router } from "express";
 import { debug } from "console";
 import proxy from "express-http-proxy";
 import strings from "../../../strings";
 import RouteBase from "../../base";
 // import PositionController from "../../../controllers/queries/position";
 import url from "url";
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
 
     get route (): Router {
 
         /** Query end point for position queries of collection {collectionId} */
                 // return router.get("/", proxy(this.protocol + "://" + this.target,{ --- Note: Issue with objects in azure app. So hard coded
 // Exucting the  function called proxy  
       
        return router.get("/", getCollectiond);
     }
 }  //  End of class Route.
 
     function getCollectiond(req,res) {
        let collectionIdPath=req.originalUrl
        let hostName=req.headers.host;
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