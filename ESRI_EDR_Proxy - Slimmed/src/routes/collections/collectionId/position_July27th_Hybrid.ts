
/**
 *  the route for /collections/{collectionsId}/position
 *  * This module is used when the EDR makes a query with the key word Position
 */ 
//  This module is routed by the postion key word in the request URL.
//  The get method is invoked by the route directive in the module collections
//  This method invokes the function Pete 2 that creates the url to be used directly with ImageServer
//  The primary role of this function is to build the url that is sent to fetchESRIGetSample
//  The second step is the to pass this URL to fetchESRIGetSample that sends the requests and processes the reply.
//

import express, { Router } from "express";
import { debug } from "console";
import proxy from "express-http-proxy";
import strings from "../../../strings";
import RouteBase  from "../../base";
// import PositionController from "../../../controllers/queries/position";
import url from "url";
import Geometry from "../../../utils/conversion";
import Mosaic from "../../../utils/imageserver";
import CovJsonCreate from "../../../utils/CovJsonPoint"
import fetchESRIGetSample from "../../../utils/fetchESRIGetSample"
import fetchESRICollectionIdMetaData from "../../../utils/fetchESRICollectionIdMetaData"
import assembleCollectionId from "../../collections/collectionId/AssembleCollectionId"
import rawCollectionId from "../../collections/collectionId/rawCollectionId"
import give from "../../../utils/give"
import { domain } from "process";
import { Point } from "terraformer";
// Express Router The express.Router() function is used to create a new router object. 
//This function is used when you want to create a new router object in your program to handle requests.
const router: Router = express.Router();
class Route extends RouteBase{
    protocol = "https";
    target: string;
    constructor(protocol: string, target: string) {
        super();
        console.log("Routes")
        this.protocol = protocol;
        this.target = target;
    }

// Validate method for ensuring the request is good.
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
 * @param rawCollectionIdObject this is a collection of raw metadata fro the collectonId
 * @param originalUrl the EDR URL for the request.
 * @param coords input coords from EDR request
 * @param parametername input params from req
 * @param time the string oringal requst. Likewise for z and crs
 */
    buildUrl(rawCollectionIdObject,originalUrl,coords, parametername,time:string,z:string,crs:string): string {
        const _coords = Geometry.WKTToEsri(coords);
        const _time:string = time;
        const _z:string = z;
        const _crs:string = crs;
        const _parametername: string[] = parametername.split(",");
        var _zArray: string[]=[]
        if (!(_z===undefined)){  //  If there is a vertical coordinate then parse into zarray
            _zArray = _z.split(",");
        }
        else{ 
        _zArray[0] =undefined;
        }
        const _timeArray: string[] = _time.split(","); //  Parse up the time string
        const _mosaicRule = Mosaic.createMosaicRule(rawCollectionIdObject,_parametername,_timeArray,_zArray,_crs);
        /**
         * A typical call to the ESRI server starts:- 
         * https://imagerydemo2.geocloud.com/arcgis/rest/services/ecmwf/ecmwf_st_sp_crf/ImageServer/getSamples
         * @param protocol e.g. https
         * @param hostmame e.g imagerydemo2.geocloud.com
         * @param pathname e.g arcgis/rest/services/ecmwf/collectionId/ImageServer/getSamples
         * @param query   e.g The paramter list for the image server input to getsample.
         * @param target is the address of the ESRI image server the string oringal requst. Likewise for z and crs
         */

        const mode:string = process.env.MODE;
        let part2:string[]=this.target.split("/"); // The parsed EDR URL
        let part5:string[]=originalUrl.split("/");  // The parsed Image Server URL


        var collectionId=part5[2];  // The collectionID parameter recovered from the EDR URL
        if (mode=='Folders') { 
            var addPathName:string=part2[3]+'/'+part2[4]+'/'+part2[5]+'/'+part2[6]+'/'+collectionId+'/ImageServer'                      
        }
        else{
            var addPathName:string=part2[3]+'/'+part2[4]+'/'+part2[5]+'/'+part2[6]+'/'+part2[7]
        }
        //  addPathName identifies the ESRI image Server path name
        //  Set up the esrigeometry paramter that is used in the ESRI call.
        if (coords.includes('MULTIPOINT')) {   
            var esriGeometry:string="esriGeometryMultiPoint"
        } 
        else if (coords.includes('POLYGON')) {   
            var esriGeometry:string="esriGeometryPolygon"
            var sampleCountOut=300 //  Defaulted at present
        } 
        else if(coords.includes("POINT")) {
        var esriGeometry:string="esriGeometryPoint";
        }
        else{throw Error("No valid coordinate type");}
        
        const _proxyurl = url.format({
        protocol: part2[0],
        hostname: part2[2],
        pathname:addPathName+"/getSamples",
        query: {
            f: "json",
            geometry: JSON.stringify(_coords),
            geometryType: esriGeometry,
            sampleCount:sampleCountOut,
            mosaicRule: JSON.stringify(_mosaicRule),
            returnFirstValueOnly: false,
            interpolation: "RSP_BilinearInterpolation",
            outFields: "*"
        }   
        });
            return _proxyurl;
            
    }  //  End of Method buildURL in Class route

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
 //       const url: string = this.buildUrl(rawCollectionIdObject,req.originalUrl,req.query.coords, req.query["parameter-name"],
 //       req.query.time,req.query.z,req.query.crs);
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
// This function is called via a call back from collecton.ts router.use("/:collectionId/position", collectionCollectionIdPosition.routePoint);
get routePoint (): Router {
    const proxyReqPathResolver = this.proxyReqPathResolver.bind(this);
    const userResDecorator = this.userResDecorator.bind(this);
    const proxyErrorHandler = this.proxyErrorHandler.bind(this);
        return router.get("/", Fetch);
    }
//  This function is called via a call back collection.ts from router.use("/:collectionId/area", collectionCollectionIdPosition.routeArea);
get routeArea (): Router {
    const proxyReqPathResolver = this.proxyReqPathResolver.bind(this);
    const userResDecorator = this.userResDecorator.bind(this);
    const proxyErrorHandler = this.proxyErrorHandler.bind(this);
        return router.get("/", Fetch);
    }

}  //  End of class declaration
 
function Fetch(req,res) {
// This function is the main routine and returns the result of the call to the ImageServer using getSample
// If the output is CovJSON the format accordingly
    const protocol = process.env.TARGET_PROTOCOL;
    const target = process.env.TARGET_SERVER;
    const tempClass = new Route(protocol, target);
    console.log("calling for url", req.originalUrl);

/////////////////////////////////////////////////////////////////////////////////////
let pathArray = req.originalUrl.split("/"); // The list of arguments after the ?
let collectionIdPath="/"+pathArray[1]+"/"+pathArray[2];
fetchESRICollectionIdMetaData(collectionIdPath)
.then((esriMetadata:any) => {
    let hostName1=req.headers.host;
    var rawCollectionIdObject=rawCollectionId(esriMetadata,collectionIdPath,hostName1);
    const url: string = tempClass.buildUrl(rawCollectionIdObject,req.originalUrl,req.query.coords, req.query["parameter-name"],
    req.query.datetime,req.query.z,req.query.crs)
    let hostName=req.headers.host;
    let outputFormat=req.query.f;
    fetchESRIGetSample(url)
    .then(function(esriSampleData:any)  {
//  Once the esriSampleData is returned need to make sure that is organised by collection. It is possible
//  that the esriSampleData How do we know if it is mixed or not? 
//   esriSampleData = {Message:"help"}
        if (outputFormat=="CoverageJson"){
            getCovJsonObject(req,res,esriSampleData);
            console.log("reached getCollection call");
        } 
        else{  //  If not CoveJSON
            res.status(200).json(esriSampleData);
        }
        }).catch(error => {
            console.log(error);
            res.status(404).send({ error: 404, message: error.message });
        }); 
    }).catch(error => {
    console.log(error);
    res.status(404).send({ error: 404, message: error.message });
    }); 
}; //  End of function Fetch

    function getCovJsonObject(req,res,esriSampleData) {
        let pathArray = req.originalUrl.split("/"); // The list of arguments after the ?
        let collectionIdPath="/"+pathArray[1]+"/"+pathArray[2];
        let hostName=req.headers.host;
        fetchESRICollectionIdMetaData(collectionIdPath)
        .then((esriMetadata:any) => {
//  Once the esriMetadata is returned need to make sure that is organised by collection. It is possible
//  that the esriMetadata How do we know if it is mixed or not? 
     
            let collectionIdObject=assembleCollectionId(esriMetadata,collectionIdPath,hostName);
            var covJsonObject=setupCreateCovJson(req,esriSampleData,collectionIdObject); 
     //   return covJsonObject;
            res.status(200).json(covJsonObject);
            }).catch(error => {
            console.log(error);
            res.status(404).send({ error: 404, message: error.message });
        }); 
 };
//////////////////////////////////////////////////////////////////////////////
 function setupCreateCovJson (req,esriSampleData,collectionIdObject){
    var resquestion = req.url.split("?"); // resquestion [0] up to ? add [1] everything after
    var argumentArray = resquestion[1].split("&"); // The list of arguments after the ?
    let collectionIdPath=req.originalUrl
    let pointsString = argumentArray.find(a =>a.includes("coords=")); // String after parametername
 
//  Need to establish the domain type of the covJson. 
//  The domain types covered so far are:- Point, PointSeries, VericalProfile, Grid. Note that PointCollection
//  is of domainType Point, but it is a type CoverageCollection rather than the Coverage 
//
//  Point has only 1 time and one position
//  PointSeries has a set of times one level, but only one postion
//  Vertical has a set of levels one time, but only one postion
//  PointCollection has a number points that each has a point definition ,i.e. only one x,y for each point
//  Grid has a set of x and y points, It may have multiple times and levels, but always multiple points.
//  There is a second type of grid that may be described has a rectified grid. This is not covered in this release
//  
//  Examine first the number of positions.
var domainType:string
if (pointsString.includes("POLYGON")) {
    domainType="Grid"
}
else if (pointsString.includes("POINT")) {
        domainType="Point"
    }
else if (pointsString.includes("AREA")) {
        domainType="Area"
}
else{
        domainType="undefined"   
}

//  If the DomainType is Point  it may need further refinement as it might be a vertical profile or time series.
    if (domainType=="Point"){
        var multiTimes:boolean=false
        let timeString = argumentArray.find(a =>a.includes("time=")); // the string after the parameter time
        let lengthtimeString = timeString.length;
        var timeText=timeString.slice(5,lengthtimeString);  //  This removes the parameer "time="
        var timeRange = timeText.includes("/"); //  The time is a range if true
        if(timeText.includes("/")){
            multiTimes=true
        }
        else{
            var timeTextArray= timeText.split(",")
            if ((timeTextArray.length)!==1) {  //  There is only one time
                multiTimes=true;
            }   
        }

        var multiLevels:boolean=false
        var verticalCoordinatePresent=false;
        let levelString = argumentArray.find(a => a.includes("z=")); // the string after the parameter z
        if(argumentArray.find(a => a.includes("z="))){
            verticalCoordinatePresent=true; 
        }

        if(verticalCoordinatePresent){
            if(levelString.includes("/")){  //  There is a range of levels
                verticalCoordinatePresent=true;
                multiLevels=true;
            }
            else{
                var levelTextArray= levelString.split(",")
                if ((levelTextArray.length)!==1) {  //  There is only one level
                    multiLevels=true;
                }   
            }
        }

        if (!multiTimes && !multiLevels){
        domainType="Point"
        }
        if (multiTimes && !multiLevels){
        domainType="PointSeries"
        }
        if (!multiTimes && multiLevels){
        domainType="VerticalProfile"
        }
        if (multiTimes && multiLevels){
            throw Error("CovJson of multitime and multilevel not supported");
        }
    }
//  By this stage have the domainType established
    if (domainType=="Point"){   
        if (verticalCoordinatePresent) {
            var covJsonObject = CovJsonCreate.createCovJsonVerticalProfile(esriSampleData,domainType,collectionIdObject);
        }
        else{
            var covJsonObject = CovJsonCreate.createCovJsonPoint(esriSampleData,domainType,collectionIdObject);
        }
        return covJsonObject
    }
    if (domainType=="VerticalProfile"){   
        const covJsonObject = CovJsonCreate.createCovJsonVerticalProfile(esriSampleData,domainType,collectionIdObject);
        return covJsonObject
    }
    if (domainType=="PointSeries"){   
        const covJsonObject = CovJsonCreate.createCovJsonTimeSeries(esriSampleData,domainType,collectionIdObject);
        return covJsonObject
    }
    if (domainType=="Grid"){   
        const covJsonObject = CovJsonCreate.createCovJsonArea(esriSampleData,domainType,collectionIdObject);
        return covJsonObject
    }
};

export default Route;