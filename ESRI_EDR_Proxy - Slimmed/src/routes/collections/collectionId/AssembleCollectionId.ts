//  AssembleCollectionId
//  This is invoked from collectionIdMetadata
//  The purpose of this function is to create the collectionId object.
//  The inputs are the serviceMetadata and the multidimensional metadata
//  Added token
import {extractObject} from "../../../utils/extractObject"
import {validateMetadata} from "../../../utils/validateMetadata"
import reorderMetadata from "../../../utils/reorderMetadata"
import dotenv from "dotenv";
//  collected from the ESRI metadata.

export function AssembleCollectionId(esriMetadata,collectionIdPath,hostName) {
const mode:string = process.env.MODE;
const token=process.env.TOKEN;
//  Carry out some quality control. The output holds the metadata as a service data/multidimensional pair
let esriMetadataQ=validateMetadata(esriMetadata);
//  The data within the ImageServer may be stored either in folders or as on large lump in
//  in the ImageServer directory e.g. https://imagerydemo2.geocloud.com/arcgis/rest/services/ecmwf 
//  or in folders https://imagerydemo2.geocloud.com/arcgis/rest/services/ukmet-edr/ImageServer
//  It is assumed that if the folders option is used to store the data then each folder will hold a specific vertcial
//  surface type. If olders are not used then the data needs to be put into "virtiual buckets" using the reorder function

if (mode=='Folders') {  //  Data assume to be in buckets sorted by surface type e.g. isbl,sfc, max wind, etc                     
  var sourceData=esriMetadataQ;
  reorderd_Data=esriMetadataQ;
  let indexAt:number = collectionIdPath.indexOf("collections")
  var collectionId=collectionIdPath.slice(indexAt+12,collectionIdPath.length);
  p2=1;  //  This is a pointer to the multidimensional info for the case where the the data is put into folders.
}
else{
  var reorderd_Data=reorderMetadata(esriMetadataQ);  // Each "collection" has a unique domain object
// Find the collection corresponsding to the reqested coverageId
  let indexAt:number = collectionIdPath.indexOf("collections")
  var collectionId=collectionIdPath.slice(indexAt+12,collectionIdPath.length);  // Slice out text "/collections"
  let reorderLength:number=reorderd_Data.length/2;  //  The number of collections in reorder.
  for (var i = 0; i <reorderLength; i++) {  //  Loop over each collection to find a match
    var p1:number= i*2; //  The service metatadata
    var p2:number= i*2+1; //  Index for the mulitidimensional data
    let searchString=reorderd_Data[p1].serviceDescription; // Search on the collectionId
    var condition=searchString.includes(collectionId);  // does description property contain master
    if (condition) { 
      break 
    }  //  A ESRI surface types is found in the master array.
  }  //  The value of i holds the postion of the in the master array;
  if(!condition){
    const message = `The collectionId is not part of the collection: Please re-enter valid CollectionId`;      
    throw new Error(message);
  };
  var sourceData=[];
  sourceData[0]=reorderd_Data[p1];
  sourceData[1]=reorderd_Data[p2];
}  // End of the else clause for folders

//  Process the collectionId object for the collection that matched the collectionId
//  Set up the object structure. Need to know if there is a "vertical property" for the collectionId object
//  p1 and p2 hold the index's of the service and multidimensional metatadata  to the appropriate  collectionId
var serviceObject=reorderd_Data[0];
var mutidimensionalObject=reorderd_Data[p2];
let number_of_dimensions=mutidimensionalObject.multidimensionalInfo.variables[0].dimensions.length;
if(number_of_dimensions==2) {
  var vertical_present=true;
}
else{
  var vertical_present=false;
}
var spatial ={
  bbox:[],
  crs:String
}
var temporal ={
  interval:[],
  trs:String
}
var vertical ={
  interval:[],
  vrs:String
}

var extent;
if (vertical_present) 
  { 
    extent ={
      spatial,
      temporal,
      vertical
    }
  }
else
  {
    extent ={
    spatial,
    temporal
  }
}
var href:{};
var pete:string;
var hreflang:string;
var type:string;
var rel:string;
//var anObject={href,rel,type,title}

var collectionIdObject= {
id:String,
title:String,
description:String,
keywords:[],
links:[],
extent,
data_queries:{position:{link:{}},radius:{link:{}},area:{link:{}}},
crs:[],
output_formats:[],
parameter_names:{}
}

collectionIdObject['id'] = collectionId; // Add some extra objects
collectionIdObject['title'] = serviceObject.name;
collectionIdObject['description'] = collectionId;
let numberOfParameters=mutidimensionalObject.multidimensionalInfo.variables.length;  //

for (let k=0 ; k <numberOfParameters; k++) {
  collectionIdObject.keywords[k]=mutidimensionalObject.multidimensionalInfo.variables[k].name;
}
let callingURL=hostName+collectionIdPath+token;
// collectionIdObject.links = []; // Create the array Links
//collectionIdObject.links.push({href,hreflang,rel,type}); // Populate the array with objects
collectionIdObject.links.push({href,hreflang,rel,type}); // Populate the array with objects
collectionIdObject.links[0].href = callingURL; // The first ojbect has the key href and value href
collectionIdObject.links[0].hreflang = 'en'; // An alternative way of defining an object
collectionIdObject.links[0].rel = 'self';
collectionIdObject.links[0].type = 'application/json';
collectionIdObject.links.push({href,hreflang,rel,type});

collectionIdObject.links[1].href = callingURL+"?f=html";
collectionIdObject.links[1].hreflang = 'en';
collectionIdObject.links[1].rel = 'alternate';
collectionIdObject.links[1].type = 'text/html';

collectionIdObject.links.push({href,hreflang,rel,type});
let postionURL= callingURL+"/instances/latest/position?";
collectionIdObject.links[2].href = postionURL;
collectionIdObject.links[2].hreflang = 'en';
collectionIdObject.links[2].rel = 'data';

collectionIdObject.links.push({href,hreflang,rel,type});
let radiusURL= callingURL+"/instances/latest/radius?";
collectionIdObject.links[3].href = radiusURL;
collectionIdObject.links[3].hreflang = 'en';
collectionIdObject.links[3].rel = 'data';

collectionIdObject.links.push({href,hreflang,rel,type});
let areaURL= callingURL+"/instances/latest/area?";
collectionIdObject.links[4].href = areaURL;
collectionIdObject.links[4].hreflang = 'en';
collectionIdObject.links[4].rel = 'data';

let ESRI_timeObject = serviceObject.timeInfo.timeExtent;
let ESRI_extentObject  = serviceObject.extent;

collectionIdObject.extent.spatial.bbox[0]=ESRI_extentObject.xmin;
collectionIdObject.extent.spatial.bbox[1]=ESRI_extentObject.xmax;
collectionIdObject.extent.spatial.bbox[2]=ESRI_extentObject.ymin;
collectionIdObject.extent.spatial.bbox[3]=ESRI_extentObject.ymax;
var crs = ESRI_extentObject.spatialReference.wkid;
if (crs==4326) {    
  crs="GEOGCS[\"WGS 84\",DATUM[\"WGS_1984\",SPHEROID[\"WGS 84\",6378137,298.257223563,AUTHORITY[\"EPSG\",\"7030\"]],AUTHORITY[\"EPSG\",\"6326\"]],PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",\"8901\"]],UNIT[\"degree\",0.01745329251994328,AUTHORITY[\"EPSG\",\"9122\"]],AUTHORITY[\"EPSG\",\"4326\"]]"
} else
{
crs="collectionIdObject.extent.spatialReference.wkid"
}
collectionIdObject.extent.spatial.crs=crs;
//  This code is needed as the dimension info in the multidiemnsional info has no 
//  predefined order of the time or vertical axes. The dimensions_index
//  is required to knoww what order they are in.   

let ESRI_variablesObject  = mutidimensionalObject.multidimensionalInfo.variables;
if (number_of_dimensions== 1) {  //  This is just surface data and only time will be specified.
  var temporal_dimension_first=true;
  var vertical_dimensions_index=-1;
  temporal_dimensions_index=0;
  var vertical_dimension_flag=false;
} else //  There is a vertical dimension, but what order is it in?
if (ESRI_variablesObject[0].dimensions[0].name=="StdTime") {   //  the time dimension is first
  temporal_dimension_first=true;  // The temporal index is second
  var temporal_dimensions_index=0;
  var vertical_dimensions_index=1;
  vertical_dimension_first=false;   // The vertical dimenions is first
  var vertical_dimension_flag=true;
   } 
else {  //  The vertical dimension is first
  var temporal_dimensions_index=1;
  var vertical_dimensions_index=0;
  var vertical_dimension_first=true;
  var vertical_dimension_flag=true;
 } 

let startTime = ESRI_timeObject[0];
let endTime = ESRI_timeObject[1];
let startTimeIso = new Date(startTime).toISOString();
let endTimeIso = new Date(endTime).toISOString();
let startDateObj:any = new Date(startTime);
var endDateObj:any = new Date(endTime);
//  let modelTimeDuration = dateAS.subtract(endDateObj, startDateObj).toHours();
var modelTimeDuration = Math.abs(startDateObj - endDateObj) / 36e5;
var modelTimeDurationISO = "PT" + modelTimeDuration + "H";
var timeRange=startTimeIso+"/"+endTimeIso;
collectionIdObject.extent.temporal.interval=[];
collectionIdObject.extent.temporal.interval[0]=timeRange;
var trs:any="TIMECRS[\"DateTime\",TDATUM[\"Gregorian Calendar\"],CS[TemporalDateTime,1],AXIS[\"Time (T)\",future]";
collectionIdObject.extent.temporal.trs=trs;

//  This code to be used if a list of times is required.
let timesListRequired=true;
if (timesListRequired) {
    let time_Object=mutidimensionalObject.multidimensionalInfo.variables[0].dimensions[temporal_dimensions_index]
    let hasTimeRange=time_Object.hasRanges;
    let numberOfTimeValues=time_Object.values.length;
    for (let k = 0; k < numberOfTimeValues; k++) { 
        let validatingTime=time_Object.values[k];
//     Some variables have time ranges. In this case only the first value is used
        if(hasTimeRange){
          let ISOTime=new Date(validatingTime[1]).toISOString();
          collectionIdObject.extent.temporal.interval[k]=ISOTime;
        }
        else{
          let ISOTime=new Date(validatingTime).toISOString();
          collectionIdObject.extent.temporal.interval[k]=ISOTime;
        }
    }
}

//  If present the vertical coordinate.

if (vertical_dimension_flag){  //  start of vertical dimension flag
  var verticalObject=mutidimensionalObject.multidimensionalInfo.variables[0].dimensions[vertical_dimensions_index]
  let lowerBound=verticalObject.extent[0];
  let upperBound=verticalObject.extent[1];
  collectionIdObject.extent.vertical.interval=[lowerBound,upperBound];
  let numberOfLevels=verticalObject.values.length;
  for (let k = 0; k < numberOfLevels; k++) { 
    collectionIdObject.extent.vertical.interval[k]=verticalObject.values[k];
  }
  collectionIdObject.extent.vertical.vrs=verticalObject.description;
}   


collectionIdObject.data_queries.position.link["href"]=callingURL+"/position";
collectionIdObject.data_queries.position.link["hreflang"]="en";
collectionIdObject.data_queries.position.link["rel"]="data";
collectionIdObject.data_queries.position.link["variables"]={};
collectionIdObject.data_queries.position.link["variables"].title="Position query";
collectionIdObject.data_queries.position.link["variables"].description="Position query";
collectionIdObject.data_queries.position.link["variables"].query_type="position";
collectionIdObject.data_queries.position.link["variables"].output_formats=[];
collectionIdObject.data_queries.position.link["variables"].output_formats[0]="CoverageJSON";
collectionIdObject.data_queries.position.link["variables"].default_output_format="CoverageJSON";
collectionIdObject.data_queries.position.link["variables"].crs_details=[];
collectionIdObject.data_queries.position.link["variables"].crs_details.push({}); // Populate the array with objects
collectionIdObject.data_queries.position.link["variables"].crs_details[0].crs="CRS84";
collectionIdObject.data_queries.position.link["variables"].crs_details[0].wkt="GEOGCS[\"WGS 84\",DATUM[\"WGS_1984\",SPHEROID[\"WGS 84\",6378137,298.257223563,AUTHORITY[\"EPSG\",\"7030\"]],AUTHORITY[\"EPSG\",\"6326\"]],PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",\"8901\"]],UNIT[\"degree\",0.01745329251994328,AUTHORITY[\"EPSG\",\"9122\"]],AUTHORITY[\"EPSG\",\"4326\"]]";


collectionIdObject.data_queries.area.link["href"]=callingURL+"/area";
collectionIdObject.data_queries.area.link["hreflang"]="en";
collectionIdObject.data_queries.area.link["rel"]="data";
collectionIdObject.data_queries.area.link["variables"]={};
collectionIdObject.data_queries.area.link["variables"].title="Area query";
collectionIdObject.data_queries.area.link["variables"].description="Area query";
collectionIdObject.data_queries.area.link["variables"].query_type="area";
collectionIdObject.data_queries.area.link["variables"].output_formats=[];
collectionIdObject.data_queries.area.link["variables"].output_formats[0]="CoverageJSON";
collectionIdObject.data_queries.area.link["variables"].default_output_format="CoverageJSON";
collectionIdObject.data_queries.area.link["variables"].crs_details=[];
collectionIdObject.data_queries.area.link["variables"].crs_details.push({}); // Populate the array with objects
collectionIdObject.data_queries.area.link["variables"].crs_details[0].crs="CRS84";
collectionIdObject.data_queries.area.link["variables"].crs_details[0].wkt="GEOGCS[\"WGS 84\",DATUM[\"WGS_1984\",SPHEROID[\"WGS 84\",6378137,298.257223563,AUTHORITY[\"EPSG\",\"7030\"]],AUTHORITY[\"EPSG\",\"6326\"]],PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",\"8901\"]],UNIT[\"degree\",0.01745329251994328,AUTHORITY[\"EPSG\",\"9122\"]],AUTHORITY[\"EPSG\",\"4326\"]]";

collectionIdObject.data_queries.radius.link["href"]=callingURL+"/radius";
collectionIdObject.data_queries.radius.link["hreflang"]="en";
collectionIdObject.data_queries.radius.link["rel"]="data";
collectionIdObject.data_queries.radius.link["variables"]={};
collectionIdObject.data_queries.radius.link["variables"].title="Radius query";
collectionIdObject.data_queries.radius.link["variables"].description="Radius query";
collectionIdObject.data_queries.radius.link["variables"].query_type="radius";
collectionIdObject.data_queries.radius.link["variables"].output_formats=[];
collectionIdObject.data_queries.radius.link["variables"].output_formats[0]="CoverageJSON";
collectionIdObject.data_queries.radius.link["variables"].default_output_format="CoverageJSON";
collectionIdObject.data_queries.radius.link["variables"].within_limits=[];
collectionIdObject.data_queries.radius.link["variables"].within_limits[0]="km";
collectionIdObject.data_queries.radius.link["variables"].within_limits[1]="miles";
collectionIdObject.data_queries.radius.link["variables"].crs_details=[];
collectionIdObject.data_queries.radius.link["variables"].crs_details.push({}); // Populate the array with objects
collectionIdObject.data_queries.radius.link["variables"].crs_details[0].crs="CRS84";
collectionIdObject.data_queries.radius.link["variables"].crs_details[0].wkt="GEOGCS[\"WGS 84\",DATUM[\"WGS_1984\",SPHEROID[\"WGS 84\",6378137,298.257223563,AUTHORITY[\"EPSG\",\"7030\"]],AUTHORITY[\"EPSG\",\"6326\"]],PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",\"8901\"]],UNIT[\"degree\",0.01745329251994328,AUTHORITY[\"EPSG\",\"9122\"]],AUTHORITY[\"EPSG\",\"4326\"]]";

collectionIdObject.crs[0]="WGS84";
collectionIdObject.output_formats[0]="CoverageJSON";
collectionIdObject.output_formats[1]="GeoJSON";

//  This function is called for each collectinonID
let metadataObject=[];
let useEsriNameFlag:any = process.env.useEsriNameFlag;
// let useEsriNameFlag=true;
//  extractObject is called for every collection (Surfaces type)and returns the WMO metadata 
//  for each variable for that surface type.
//  The description of this collection (in particular the surface type) is passed 
//  ESRI_parameterTerm contains the ESRI names of the variables in the collection i.e for that surfacet type.
//  ESRI_variableSurfaceDescription is the level type in the esri multidimensional object description property.
//  The output metadataObject holds a set of esri variable names keys with WMO properties for this collection.
//  useEsriNameFlag is set to true if esri aliases are tobe used 
// 
var ESRI_parameterTerm=[]
for (let kk=0 ; kk <numberOfParameters; kk++) {
  ESRI_parameterTerm[kk]=mutidimensionalObject.multidimensionalInfo.variables[kk].name;
}
let ESRI_variableSurfaceDescription=mutidimensionalObject.multidimensionalInfo.variables[0].description
extractObject(useEsriNameFlag,ESRI_variableSurfaceDescription,ESRI_parameterTerm,metadataObject);
//  The metadataObject holds the WMO metadata for each esri variable 
for (let k=0 ; k <metadataObject.length; k++) {
  var  parameterKeyArray=Object.keys(metadataObject[k]);
  console.log("break");
//  collectionIdObject.parameter_names=metadataObject[k][parameterKeyArray[0]];
  collectionIdObject.parameter_names[parameterKeyArray[0]]={};
  collectionIdObject.parameter_names[parameterKeyArray[0]]=metadataObject[k][parameterKeyArray[0]];
  console.log("break");
}
if(vertical_dimension_flag)
{
  let numberOfObjects=metadataObject.length
  let variable=parameterKeyArray[0]
  let temp =metadataObject[metadataObject.length-1];
  let temp2=temp[variable].verticalCRSDescription.vrs
  collectionIdObject.extent.vertical.vrs=temp2;
}
return collectionIdObject;
}
export default AssembleCollectionId;