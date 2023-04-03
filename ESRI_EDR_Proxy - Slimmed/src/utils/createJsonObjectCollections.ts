import { link } from "fs";
import {extractObject} from "../utils/extractObject"
export function createJsonObjectCollections(collectionsTargetObject, count, collectionIdObject, collectionIdMultiObject,callingURL) {
// This function is called for each collection.
// The input is two objects and represent a collection.
// myObject.collections is the output and is passed back to assembleCollection.
// Once returned the assembleCollection. There are a set of variables for each collection i.e numberOfParameters
  var fs = require('fs');
  collectionsTargetObject.collections.push({});
//    let collectionId=collectionIdObject.serviceDescription;
    let collectionId=collectionIdObject.name;
    

    let indexAt:number = collectionId.indexOf("/")
    collectionId=collectionId.slice(indexAt+1,collectionId.length);



    collectionsTargetObject.collections[count]['id'] = collectionId;
    collectionsTargetObject.collections[count]['title'] = collectionId;
    collectionsTargetObject.collections[count]['description'] = 'From ESRIa Image server';

    var numberOfParameters=collectionIdMultiObject.multidimensionalInfo.variables.length;  // 
    collectionsTargetObject.collections[count].keywords=[];
    for (let k=0 ; k<numberOfParameters; k++) {  // Loop over each parameter in each collection
      collectionsTargetObject.collections[count].keywords[k]=collectionIdMultiObject.multidimensionalInfo.variables[k].name;
    }
    collectionsTargetObject.collections[count].keywords.push('position');
    collectionsTargetObject.collections[count].keywords.push('radius');
    collectionsTargetObject.collections[count].keywords.push("area");
    let Title = collectionIdObject.name;
    collectionsTargetObject.collections[count].links = [];
    collectionsTargetObject.collections[count].links.push({});
   // myObject.collections[count].links[0]['href'] = serviceURL;
    collectionsTargetObject.collections[count].links[0]['href'] = "https://imagerydemo2.geocloud.com/arcgis/rest/services/ecmwf";
    collectionsTargetObject.collections[count].links[0]['hreflang'] = "en";
    collectionsTargetObject.collections[count].links[0]['rel'] = 'describedBy';
    collectionsTargetObject.collections[count].links[0]['type'] = 'text/html';
 //   collectionsTargetObject.collections[count].links[0]['title'] = Title + ' document';

    collectionsTargetObject.collections[count].links.push({});
 //   myObject.collections[count].links[1]['href'] = callingURL;
    collectionsTargetObject.collections[count].links[1]['href'] = callingURL+"/"+collectionId;
    collectionsTargetObject.collections[count].links[1]['hreflang'] = 'en';
    collectionsTargetObject.collections[count].links[1]['rel'] = 'collection';
    collectionsTargetObject.collections[count].links[1]['type'] = 'collection';
//    collectionsTargetObject.collections[count].links[1]['title'] ='';

    collectionsTargetObject.collections[count].links.push({});
    collectionsTargetObject.collections[count].links[2]['href'] = "http://" + callingURL+collectionId+"/position";
    collectionsTargetObject.collections[count].links[2]['hreflang'] = 'en';
    collectionsTargetObject.collections[count].links[2]['rel'] = 'data';
    
    collectionsTargetObject.collections[count].links.push({});
    collectionsTargetObject.collections[count].links[3]['href'] = "http://" + callingURL+collectionId+"/radius";
    collectionsTargetObject.collections[count].links[3]['hreflang'] = 'en';
    collectionsTargetObject.collections[count].links[3]['rel'] = 'data';


    collectionsTargetObject.collections[count].links.push({});
    collectionsTargetObject.collections[count].links[4]['href'] = "http://" + callingURL+collectionId+"/area";
    collectionsTargetObject.collections[count].links[4]['hreflang'] = 'en';
    collectionsTargetObject.collections[count].links[4]['rel'] = 'data';
    var xmin = collectionIdObject.extent.xmin;
    var ymin = collectionIdObject.extent.ymin;
    var xmax = collectionIdObject.extent.xmax;
    var ymax = collectionIdObject.extent.ymax;
    var crs = collectionIdObject.extent.spatialReference.wkid;
    if (crs==4326) {    
      crs="GEOGCS[\"WGS 84\",DATUM[\"WGS_1984\",SPHEROID[\"WGS 84\",6378137,298.257223563,AUTHORITY[\"EPSG\",\"7030\"]],AUTHORITY[\"EPSG\",\"6326\"]],PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",\"8901\"]],UNIT[\"degree\",0.01745329251994328,AUTHORITY[\"EPSG\",\"9122\"]],AUTHORITY[\"EPSG\",\"4326\"]]"
    } else
    {
    crs="collectionIdObject.extent.spatialReference.wkid"
    }

    collectionsTargetObject.collections[count].extent={};
    collectionsTargetObject.collections[count].extent.spatial={};
//    collectionsTargetObject.collections[count].extent.spatial.bbox=[xmin, ymin, xmax, ymax];
    collectionsTargetObject.collections[count].extent.spatial.bbox=[];
    collectionsTargetObject.collections[count].extent.spatial.bbox[0]=[xmin, ymin, xmax, ymax];
    collectionsTargetObject.collections[count].extent.spatial.crs=crs;            
// Need to know the number of axes in addition to the horizontal/ 1 would be time and 2 time and vertical                      
    var dimensionsObject=collectionIdMultiObject.multidimensionalInfo.variables[0];
//
// This piece of code takes the dimension name default 
// If there is one dimension it is assumed to be StdTime
// If there are two dimensions then the second is vertical. In most cases the vertical dimension
//  name is the first dimension, but that may not always be the case.
//
let dimensionsObject1=collectionIdMultiObject.multidimensionalInfo.variables[0].dimensions;
let number_of_dimensions:number=dimensionsObject1.length; // only counts Z and T
    if (number_of_dimensions== 1) {  //  This is just surface data
      var temporal_dimensions_index=0;
      var vertical_dimensions_index=-1;
      var vertical_dimension_flag=false;
    } else //  There is a vertical dimension
        if (dimensionsObject1[0].name=="StdTime") {   //  Is the time dimension is first
          var temporal_dimensions_index=0;  // The temporal index is second
          var vertical_dimensions_index=1;   // The vertical dimenions is first
          var vertical_dimension_flag=true;
         } 
        else {  //  The vertical dimension is first
         var temporal_dimensions_index=1;  
         var vertical_dimensions_index=0;
         var vertical_dimension_flag=true;
       }     

    var tmin = dimensionsObject1[temporal_dimensions_index].extent[0];
    var tmax = dimensionsObject1[temporal_dimensions_index].extent[1];
    var interval=dimensionsObject1[temporal_dimensions_index].interval;
    var intervalUnit=dimensionsObject1[temporal_dimensions_index].intervalUnit;
    intervalUnit="Hours";
    if(intervalUnit=="Hours"){
      interval="PT"+interval+"H"
    }
    else{
      const message = `The time interval needs to be in hours`;
    throw new Error(message);
    }
    var numberOfTimes=dimensionsObject1[temporal_dimensions_index].values.length;
    var startTimeIso = new Date(tmin).toISOString();
    var endTimeIso =   new Date(tmax).toISOString();
    var timeRange=startTimeIso+"/"+endTimeIso;
    //  Example time format for repeating intervals R82/2022-01-18T06:00:00Z/PT3H
    collectionsTargetObject.collections[count].extent.temporal={};
   // collectionsTargetObject.collections[count].extent.temporal.interval=[timeRange];
   var timeRepeat="R"+numberOfTimes+"/"+startTimeIso+"/"+interval
   // collectionsTargetObject.collections[count].extent.temporal.interval=[timeRange];
    collectionsTargetObject.collections[count].extent.temporal.interval=[];
    collectionsTargetObject.collections[count].extent.temporal.interval[0]=[startTimeIso,endTimeIso];
   

    collectionsTargetObject.collections[count].extent.temporal.values=[];
    collectionsTargetObject.collections[count].extent.temporal.values[0]=timeRepeat;
    collectionsTargetObject.collections[count].extent.temporal.trs="TIMECRS[\"DateTime\",TDATUM[\"Gregorian Calendar\"],CS[TemporalDateTime,1],AXIS[\"Time (T)\",future]";

    if ( vertical_dimensions_index!=-1) {  //  There is a vertical index
    var verticalObject=dimensionsObject1[vertical_dimensions_index];
    } 

    if (vertical_dimension_flag){  //  start of vertical dimension flag
      var lowerBound:number=+verticalObject.extent[0];
      lowerBound=500.1;
      let upperBound=Number(verticalObject.extent[1]);
      collectionsTargetObject.collections[count].extent.vertical={};
  //    collectionsTargetObject.collections[count].extent.vertical.interval=[lowerBound,upperBound];
      collectionsTargetObject.collections[count].extent.vertical.interval=[];
      let numberOfLevels=verticalObject.values.length;
      collectionsTargetObject.collections[count].extent.vertical.interval[0]=[lowerBound,upperBound];
      collectionsTargetObject.collections[count].extent.vertical.values=[];
      for (let k = 0; k < numberOfLevels; k++) { 
        collectionsTargetObject.collections[count].extent.vertical.values[k]=verticalObject.values[k];
      }
      collectionsTargetObject.collections[count].extent.vertical.vrs=verticalObject.description;
     }   //  End of vertical dimension flag  
    collectionsTargetObject.collections[count].data_queries={};

    let service:string=callingURL+"/"+collectionId+"/position";
    let text="EPSG:4326";
    let WKT="GEOGCS[\"WGS 84\",DATUM[\"WGS_1984\",SPHEROID[\"WGS 84\",6378137,298.257223563,AUTHORITY[\"EPSG\",\"7030\"]],AUTHORITY[\"EPSG\",\"6326\"]],PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",\"8901\"]],UNIT[\"degree\",0.01745329251994328,AUTHORITY[\"EPSG\",\"9122\"]],AUTHORITY[\"EPSG\",\"4326\"]]"

    collectionsTargetObject.collections[count].data_queries.position={}
    collectionsTargetObject.collections[count].data_queries.position.link={href:service,hreflang:"en",rel:"data"}
    collectionsTargetObject.collections[count].data_queries.position.link.variables={}
    collectionsTargetObject.collections[count].data_queries.position.link.variables.title="Position query"
    collectionsTargetObject.collections[count].data_queries.position.link.variables.query_type="position"
    collectionsTargetObject.collections[count].data_queries.position.link.variables.output_formats=[];
    collectionsTargetObject.collections[count].data_queries.position.link.variables.output_formats[0]="CoverageJson";
    collectionsTargetObject.collections[count].data_queries.position.link.variables.default_output_format="CoverageJSON"
    collectionsTargetObject.collections[count].data_queries.position.link.variables.crs_details=[];
    collectionsTargetObject.collections[count].data_queries.position.link.variables.crs_details[0]={crs:"EPSG:4326",wkt:WKT};
    
    collectionsTargetObject.collections[count].data_queries.radius={}
    collectionsTargetObject.collections[count].data_queries.radius.link={href:service,hreflang:"en",rel:"data"}
    collectionsTargetObject.collections[count].data_queries.radius.link.variables={}
    collectionsTargetObject.collections[count].data_queries.radius.link.variables.title="radius"
    collectionsTargetObject.collections[count].data_queries.radius.link.variables.query_type="radius"
    collectionsTargetObject.collections[count].data_queries.radius.link.variables.output_formats=[];
    collectionsTargetObject.collections[count].data_queries.radius.link.variables.output_formats[0]="CoverageJson";
    collectionsTargetObject.collections[count].data_queries.radius.link.variables.default_output_format="CoverageJSON"
    collectionsTargetObject.collections[count].data_queries.radius.link.variables.crs_details=[];
    collectionsTargetObject.collections[count].data_queries.radius.link.variables.crs_details[0]={crs:"EPSG:4326",wkt:WKT};

    collectionsTargetObject.collections[count].data_queries.area={}
    collectionsTargetObject.collections[count].data_queries.area.link={href:service,hreflang:"en",rel:"data"}
    collectionsTargetObject.collections[count].data_queries.area.link.variables={}
    collectionsTargetObject.collections[count].data_queries.area.link.variables.title="Area query"
    collectionsTargetObject.collections[count].data_queries.area.link.variables.query_type="area"
    collectionsTargetObject.collections[count].data_queries.area.link.variables.output_formats=[];
    collectionsTargetObject.collections[count].data_queries.area.link.variables.output_formats[0]="CoverageJson";
    collectionsTargetObject.collections[count].data_queries.area.link.variables.default_output_format="CoverageJSON"
    collectionsTargetObject.collections[count].data_queries.area.link.variables.crs_details=[];
    collectionsTargetObject.collections[count].data_queries.area.link.variables.crs_details[0]={crs:"EPSG:4326",wkt:WKT};   
    
    collectionsTargetObject.collections[count].crs=[];
    collectionsTargetObject.collections[count].crs[0]=text;
   // collectionsTargetObject.collections[count].crs[0]={name:text,WKT:WKT};
   // collectionsTargetObject.collections[count].distanceunits=[];
   // collectionsTargetObject.collections[count].distanceunits[0]="miles";
   // collectionsTargetObject.collections[count].distanceunits[1]="km";

    collectionsTargetObject.collections[count].output_formats=[];
    collectionsTargetObject.collections[count].output_formats[0]="CoverageJSON";
   // collectionsTargetObject.collections[count].output_formats[1]={name:"GeoJSON"};
    collectionsTargetObject.collections[count].parameter_names={};

    let levelType=collectionIdMultiObject.multidimensionalInfo.variables[0].description;
    if (typeof(levelType) == "undefined") {
        levelType="Hybrid";
    }
    let ESRI_variableSurfaceDescription=levelType;
    let ESRI_parameterTerm=[];
// For this folderId extract all the parameters with the property of name
// This is passed into extractObject
    for (let k=0 ; k <numberOfParameters; k++) {
        ESRI_parameterTerm[k]=collectionIdMultiObject.multidimensionalInfo.variables[k].name;
    }
//  This function is called for each collectinonID
     let metadataObject=[];
     let useEsriNameFlag:any = process.env.useEsriNameFlag;
//  extractObject is called for every collection (Surfaces type)and returns the WMO metadata 
//  for each variable for that surface type.
//  The description of this collection (in particular the surface type) is passed 
//  ESRI_parameterTerm (An array) contains the ESRI names of the variables in the collection for that surfacet type.
//  ESRI_parameterTerm contains the ESRI names of the variables in the collection i.e for that surfacet type.
//  ESRI_variableSurfaceDescription is the level type in the esri multidimensional object description property.
//  The output metadataObject holds a set of esri variable names keys with WMO properties for this collection.
//  useEsriNameFlag is set to true if esri aliases are tobe used 
//  
     extractObject(useEsriNameFlag,ESRI_variableSurfaceDescription,ESRI_parameterTerm,metadataObject); 
      /**
     * A typical call to the ESRI server starts:- 
     * @param useEsriNameFlagInput if true this returns esri names (as in image server). If false the WMO equivalents
     * @param ESRI_variableSurfaceDescription Input The GRIB2 surface type  the parameter uses
     * @param ESRI_parameterTerm Input (An array) contains the ESRI names of the variables in the collection.
     * @param metadataObject output as the full list of metadata for each paramete in the collection.
     */
// Add the metadata object to the parameter key in the collections document
    for (let k=0 ; k <numberOfParameters; k++) {  // Number of parameters in the collection
       let  parameterKeyArray=Object.keys(metadataObject[k]);
        collectionsTargetObject.collections[count].parameter_names[parameterKeyArray[0]]=metadataObject[k][parameterKeyArray[0]];
    }
    let metadataObjectstring = JSON.stringify(metadataObject);
 //   let fileName=collectionId+".txt"
    let fileName="Harry.txt"
    fs.writeFileSync(fileName, metadataObjectstring);
    /////////////////////////////////////////////////////////////
} //   end of function createJsonObject
export default createJsonObjectCollections;