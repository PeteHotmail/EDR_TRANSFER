
// Routine CovJsonPoint Invoked from the module Position/
// This builds the CovJson Object in response the requested format
/** interface for Multidemisnional Parameter used in definition */

//  Use the appropriatea interface either for a set of values or a range of values that need a 2D array.
import {collectionIdObject,esriSampleDataType,covJsonType,
    referencingTypeZ,rangesType,parametersType,parameterNameType2,
    referencingTypeXY,referencingTypeCal,SampleType} from "../utils/Interfaces"

const dateAS = import('date-and-time');

//  This invoked from Position etc as the buildURL method in CLASS Route (defined in Position)
class CovJsonCreate {
    static createCovJsonPoint (esriSampleData:esriSampleDataType,domainType:string,collectionIdObject:collectionIdObject) {
 /**
 * createCovJsonPoint. This method creates a covJson object for a point from esriSampleData
 * @param esriSampleData The raw data from the call to ImageServer
 * @param domainType The CovJSON domain type e.g. Point
 * @param collectionIdObject The metadata for the collectonId object
 */
// This section creates the CovJSON object for a domain type point
// To set up the CovJSON object the coordinates are extraced from the sample data
// The aim is to populate sampleCovJsonObject:covJsonType

        var xValues:number[]=[];
        xValues[0]=esriSampleData.samples[0].location.x;
        var yValues:number[]=[];
        yValues[0]=esriSampleData.samples[0].location.y;
        var tValues:number[]=[];
        tValues[0]=esriSampleData.samples[0].attributes.StdTime;

//  Set up the referencing values that describe the axes coordinate systems. One for geospatial
        var referencingValues:any[]=[];
        var mdXY: referencingTypeXY = {
        coordinates: ["x","y"],
        system: {
            type: "GeographicCRS",
            id: "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
            }
        };
            
 //  Set up the referencing values that describe the axes coordinate systems for time
        referencingValues.push(mdXY);
        var mdpTCal:referencingTypeCal = {
            coordinates: [
            "t"
            ],
            system: {
                type: "TemporalIRS",
                calendar: "Gregorian"
            }
        }
        referencingValues.push(mdpTCal);

//  collectMetadata takes information from the ColledId object and returns the metadata
//  for a specific parameter in the resultObject. The appropriate metadata for that parameter is extracted
        let parameterName:any=esriSampleData.samples[0].attributes.Variable;
        let resultObject:any =collectMetadata(collectionIdObject,parameterName)
        let unitLabel:any=resultObject.unitLabel
        let unitSymbolvalue:string=resultObject.unitSymbolvalue;
        let parameterDescription:any=resultObject.parameterDescription
        let requiredKey:any=resultObject.requiredKey

//  Set up the parameter object describption
        var parameterValues:parametersType={
            [requiredKey]: {type: "Parameter",description: {en: parameterDescription},
            unit: {label: {en: unitLabel},
            symbol: {value: unitSymbolvalue,type: "http://www.opengis.net/def/uom/UCUM/"}},
            observedProperty: {
            id: parameterDescription,
            label: {
            en: parameterDescription
            }
        }
    }
}
        var valueValues:number[]=[];
// the value of the parameter comes a string so convert to a
        let resultValue:number=+esriSampleData.samples[0].value;
        valueValues[0]=resultValue;

        var rangeValues:rangesType= {
            [requiredKey]: {
            type: "NdArray",
            dataType: "float",
            values: valueValues
            },
        }

        var sampleCovJsonObject:covJsonType={
                "type":"Coverage",
                "domain":{
                    "type":"Domain",
                    "domainType":domainType,
                    axes:{
                        x:{values:xValues},
                        y:{values:yValues},
                        t:{values:tValues},
                    },
                    referencing:referencingValues
                },
                parameters:parameterValues,
                ranges:rangeValues
            }
        return sampleCovJsonObject
    }  //  End of static method.

/////////////////////////////////////////////////////////////////////////////////////////////

    static createCovJsonVerticalProfile (esriSampleData:esriSampleDataType,domainType:string,collectionIdObject:collectionIdObject) {
/**
 * createVerticalProfile. This method creates a covJson object for a vertical profile created from esriSampleData
 * @param esriSampleData The raw data from the call to ImageServer
 * @param domainType The CovJSON domain type e.g. Point
 * @param collectionIdObject The metadata for the collectonId object
 */
// This section creates the CovJSON object for a domain type point
// To set up the CovJSON object the coordinates are extraced from the sample data
// The aim is to populate sampleCovJsonObject:covJsonType
        var xValues:number[]=[];
        xValues[0]=esriSampleData.samples[0].location.x;
        var yValues:number[]=[];
        yValues[0]=esriSampleData.samples[0].location.y;
        var tValues:number[]=[];
        tValues[0]=esriSampleData.samples[0].attributes.StdTime;

//  This section loops over each value of the z values.
//  First have to establish which order the coordinates are in the GetSample result set
        let verticalDimensionType=esriSampleData.samples[0].attributes.Dimensions;
        var dimensionArray= verticalDimensionType.split(",")
        for (var i = 0; i < dimensionArray.length; i++) {  // The dimensionArray is an array of dimension names
            let condition=dimensionArray[i].includes("StdTime");  // Find the indext of the one dimension name we are certain of
            if (condition) { break; }
        }
        if (i==0){
            var verticalPos=1;  // If index of StdTime is  zero then vertical had index 1
        }
        else{
            verticalPos=0
        }
        let verticalDimension=dimensionArray[verticalPos];  //  This is the name of the vertical dimension
        let numberOfSamples:number=esriSampleData.samples.length;  //  The number of sample points in the vertical
        var zValues:any[]=[];
        for (var i = 0; i < numberOfSamples; i++) {
            zValues[i]=esriSampleData.samples[i].attributes[verticalDimension];
        }
//
//  Set up the referencing values that describe the axes coordinate systems. One for geospatial and one for time
        var referencingValues:any[]=[];
            var mdXY: referencingTypeXY = {
            coordinates: ["x","y"],
            system: {
                type: "GeographicCRS",
                id: "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
            }
        };
        referencingValues.push(mdXY);

        var mdpTCal:referencingTypeCal = {
            coordinates: [
            "t"
            ],
            system: {
                type: "TemporalRS",
                calendar: "Gregorian"
            }
        }
        referencingValues.push(mdpTCal);
//  collectMetadata takes information from the ColledId object and returns the metadata
//  for a specific parameter in the resultObject. The appropriate metadata for that parameter is extracted
        let parameterName:any=esriSampleData.samples[0].attributes.Variable;
        let resultObject=collectMetadata(collectionIdObject,parameterName);  // The metadata for the specific parameter
        let unitLabel=resultObject.unitLabel
        let unitSymbolvalue=resultObject.unitSymbolvalue;
        let parameterDescription=resultObject.parameterDescription  //  The WMO parameter description
        let requiredKey=resultObject.requiredKey  //  The name of the parameter

// The vertical axis metadata is little more difficult and needs to be parsed. The vertical axis description
// is of the form 
//  \"PARAMETRICCRS['WMO standard atmosphere layer 0',PDATUM['Mean Sea Level',ANCHOR['101325 Pa at 15°C']],
// CS[parametric,1],AXIS['pressure (Pa)',up],PARAMETRICUNIT['Pascal',10000.0]]\"

        let vertialCRSDescription=resultObject.verticalCRSDescription
        let myArr = vertialCRSDescription.split("]"); // The array holds the parsed axis information
//   Look for the index of the term Axis. This holds the relevant information.
        for (var i = 0; i < myArr.length; i++) {
            let searchString:string=myArr[i];
            let condition=searchString.includes("AXIS");
            if (condition) { break; }
        }
        if (i==myArr.length){
            throw Error("CovJson the vertical coordinate description is badly formed");
        }
//  Set up the parameter description
        let axisPosition=i;  // This holds the postion of the axis info in the array
        let axisTextArray=myArr[axisPosition].split("[");  //  Holds the Axis name and if its up or down

        for (var i = 0; i < axisTextArray.length; i++) {
            let searchString:string=axisTextArray[i];
            let condition=searchString.includes("(");
            if (condition) { break; }
        }

        if (i==axisTextArray.length.length){
            throw Error("CovJson the vertical coordinate description is badly formed");
        }

//  Now slice and dice to find the appropriate parameters.
        let Position=i;
        let parsedArray=axisTextArray[Position].split("(");
        let index=parsedArray[1].indexOf(")")
        if (index==-1){
            throw Error("CovJson the vertical coordinate description is badly formed");
        }
        let verticalUnit:string=parsedArray[1].slice(0,index)
        let direction:string=parsedArray[1].slice(index+3,parsedArray[1].length)
        let verticalVariable:string=parsedArray[0].slice(1,parsedArray[0].length)  //  The name of the vertical variable

        var mdpZ:referencingTypeZ = {
            coordinates: ["z"],
            "system": {
                "type": "VerticalCRS",
                "cs": {
                "csAxes": [
                    {"name": {en: verticalVariable},"direction": direction,
                    "unit": {
                        "symbol": verticalUnit}
                    }]
                }
            }
        }
         referencingValues.push(mdpZ);

         var parameterValues:parametersType={
            [requiredKey]: {type: "Parameter",description: {en: parameterDescription},
            unit: {label: {en: unitLabel},
            symbol: {value: unitSymbolvalue,type: "http://www.opengis.net/def/uom/UCUM/"}},
            observedProperty: {
            id: parameterDescription,
            label: {
            en: parameterDescription
            }
        }
    }
}
    var valueValues:number[]=[];
// the value of the parameter comes a string so convert to a number
    let resultLength:number=esriSampleData.samples.length
    for (var i = 0; i < resultLength; i++) {
        var resultValue:number=+esriSampleData.samples[i].value;
        valueValues[i]=resultValue;
    }
  

    var rangeValues:rangesType= {
        [requiredKey]: {
        type: "NdArray",
        dataType: "float",
//        shape[0]=
        values: valueValues
        },
    }

    var sampleCovJsonObject:covJsonType={
            "type":"Coverage",
            "domain":{
                "type":"Domain",
                "domainType":domainType,
                axes:{
                    x:{values:xValues},
                    y:{values:yValues},
                    z:{values:zValues},
                    t:{values:tValues},
                },
                referencing:referencingValues
            },
            parameters:parameterValues,
            ranges:rangeValues
        }
    return sampleCovJsonObject
    }  //  End of static method.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    static createCovJsonTimeSeries (esriSampleData:esriSampleDataType,domainType:string,collectionIdObject:collectionIdObject) {
/**
 * createVerticalProfile. This method creates a covJson object for a vertical profile created from esriSampleData
 * @param esriSampleData The raw data from the call to ImageServer
 * @param domainType The CovJSON domain type e.g. PointSeries
 * @param collectionIdObject The metadata for the collectonId object
 */
// This section creates the CovJSON object for a domain type time series
// To set up the CovJSON object the coordinates are extraced from the sample data
// The aim is to populate sampleCovJsonObject:covJsonType
        var xValues:number[]=[];
        xValues[0]=esriSampleData.samples[0].location.x;
        var yValues:number[]=[];
        yValues[0]=esriSampleData.samples[0].location.y;
        var tValues:any[]=[];
        tValues[0]=esriSampleData.samples[0].attributes.StdTime;
        
        let dimensionType:string=esriSampleData.samples[0].attributes.Dimensions; //  Lists the dimension types other than x,y
        var dimensionArray= dimensionType.split(",")  //  Split into the dimension axes names
        verticalAxisPresent=false;
        if (dimensionArray.length > 1) {
            var verticalAxisPresent=true;  //  This assumes, understandably that one of the axisNames is StdTime
        }
    
        if (verticalAxisPresent){  //  There is an additional axis other than time
            for (var i = 0; i < dimensionArray.length; i++) {
                let condition=dimensionArray[i].includes("StdTime");
                if (condition) { break; }
            }
//  Establish which index holds the veryical dimension and time
            var verticalPos:number;
            var timePosition:number
            if (i==0){
                timePosition=0;
                verticalPos=1
            }
            else{
                timePosition=1
                verticalPos=0
            }
            let timeDimension=dimensionArray[timePosition];  //  StdTime
            let verticalDimension=dimensionArray[verticalPos]; // The vertical dimension name
            let numberOfSamples:number=esriSampleData.samples.length;  //  How many samples in tht time dimension
            
            for (var i = 0; i < numberOfSamples; i++) {
                tValues[i]=esriSampleData.samples[i].attributes[timeDimension];
            }
            console.log("numberOfSamples",numberOfSamples);
            var zValues:any[]=[];
            zValues[0]=esriSampleData.samples[0].attributes[verticalDimension]
        }
        else{  //  Just time and no vertical coordinate
            let numberOfSamples:number=esriSampleData.samples.length;
            for (var i = 0; i < numberOfSamples; i++) {
                tValues[i]=esriSampleData.samples[i].attributes["StdTime"];
            }
        }

    //  Set up the referencing values that describe the axes coordinate systems. One for geospatial and one for time
    var referencingValues:any[]=[];
            var mdpXY: referencingTypeXY = {
            coordinates: ["x","y"],
            system: {
                type: "GeographicCRS",
                id: "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
            }
        };
    referencingValues.push(mdpXY);

    var mdpTCal:referencingTypeCal = {
        coordinates: [
        "t"
        ],
        system: {
            type: "TemporalRS",
            calendar: "Gregorian"
        }
    }
    referencingValues.push(mdpTCal);
    let parameterName:any=esriSampleData.samples[0].attributes.Variable;
    let resultObject=collectMetadata(collectionIdObject,parameterName)
    let unitLabel=resultObject.unitLabel
    let unitSymbolvalue=resultObject.unitSymbolvalue;
    let parameterDescription=resultObject.parameterDescription
    let requiredKey=resultObject.requiredKey

//   
// the purpose of this section of code is to look through the keyword values in the collectionIdObject
// Once found then this can be used to locate the correct metadata from the collectionIdObject
// This is found at collectionIdObject.parameter_names
//
    if (verticalAxisPresent){
        let vertialCRSDescription=resultObject.verticalCRSDescription
        let myArr = vertialCRSDescription.split("]"); 
//   Look for the axis element in the array that has the term Axis
        for (var i = 0; i < myArr.length; i++) {
            let searchString:string=myArr[i];
            let condition=searchString.includes("AXIS");
            if (condition) { break; }
        }
        if (i==myArr.length){
            throw Error("CovJson the vertical coordinate description is badly formed");
        }
//  Set up the parameter description
    let axisPosition=i;
    let myArrNewArray=myArr[axisPosition].split("[");

    for (var i = 0; i < myArrNewArray.length; i++) {
        let searchString:string=myArrNewArray[i];
        let condition=searchString.includes("(");
        if (condition) { break; }
    }

    if (i==myArrNewArray.length.length){
        throw Error("CovJson the vertical coordinate description is badly formed");
    }

//  Now slice and dice to find the appropriate parameters.
    let Position=i;
    let myArrNewNewArray=myArrNewArray[Position].split("(");
    let index=myArrNewNewArray[1].indexOf(")")
    if (index==-1){
        throw Error("CovJson the vertical coordinate description is badly formed");
    }
    let verticalUnit:string=myArrNewNewArray[1].slice(0,index)
    let direction:string=myArrNewNewArray[1].slice(index+3,myArrNewNewArray[1].length)
    let verticalVariable:string=myArrNewNewArray[0].slice(1,myArrNewNewArray[0].length)

    var mdpZ:referencingTypeZ = {
        coordinates: [
        "z"
        ],
        "system": {
            "type": "VerticalCRS",
            "cs": {
              "csAxes": [
                {"name": {en: verticalVariable},
                  "direction": direction,
                  "unit": {
                    "symbol": verticalUnit
                  }
                }
              ]
            }
          }
        }
    referencingValues.push(mdpZ);
    }
    var parameterValues:parametersType={
        [requiredKey]: {
        type: "Parameter",
        description: {
            en: parameterDescription
        },
        unit: {
            label: {
            en: unitLabel
            },
            symbol: {
            value: unitSymbolvalue,
            type: "http://www.opengis.net/def/uom/UCUM/"
            }
        },
        observedProperty: {
            id: parameterDescription,
            label: {
            en: parameterDescription
            }
        }
    }
    }
    var valueValues:number[]=[];
// the value of the parameter comes a string so convert to a
    let resultLength:number=esriSampleData.samples.length
    for (var i = 0; i < resultLength; i++) {
        var resultValue:number=+esriSampleData.samples[i].value;
        valueValues[i]=resultValue;
    }
  
    var shapeValue:number[]=[];
    shapeValue[0]=resultLength;
    var axisNamesValue:string[]=[];
    axisNamesValue[0]="t";
    var rangeValues:rangesType= {
        [requiredKey]: 
        {
        type: "NdArray",
        dataType: "float",
        axisNames:axisNamesValue,
        shape:shapeValue,
        values: valueValues
        }
    }
    if (verticalAxisPresent){
        var axisObject:any={
            x:{values:xValues},
            y:{values:yValues},
            z:{values:zValues},
            t:{values:tValues},
        }
    }
    else{
        var axisObject:any={
        x:{values:xValues},
        y:{values:yValues},
        t:{values:tValues},
    }}
    var sampleCovJsonObject:covJsonType={
            "type":"Coverage",
            "domain":{
                "type":"Domain",
                "domainType":domainType,
                axes:axisObject,
                referencing:referencingValues
            },
            parameters:parameterValues,
            ranges:rangeValues
        }
    return sampleCovJsonObject
    }  //  End of static method.

//
//  createCovJsonArea
//
    static createCovJsonArea (esriSampleData:esriSampleDataType,domainType:string,collectionIdObject:collectionIdObject) {
        var xValuesString:string[]=[];
        var xValuesNumber:number[]=[];
        var xArray:number[]=[];
        var yArray:number[]=[];
        var yValuesString:string[]=[];
        var yValuesNumber:number[]=[];
        var tValuesNumber:number[]=[];
        var tValuesString:string[]=[];
        var zValuesNumber:number[]=[];
        var zValuesString:string[]=[];
        
        let dimensionType=esriSampleData.samples[0].attributes.Dimensions;
        var dimensionArray= dimensionType.split(",")
        verticalAxisPresent=false;
        if (dimensionArray.length > 1) {  //  There is always a time dimension.
            var verticalAxisPresent=true
        }
        if (dimensionArray[0]=="StdTime"){
            var VertDimensionName=dimensionArray[1]
        }
        else{
            var VertDimensionName=dimensionArray[0]
        }

//  This section finds the range of x and y points and number of locations are there
        var numberOfSamples=esriSampleData.samples.length  // The number of 
//  Establish the x and y positions for all points.
        for (var k=0; k<numberOfSamples;k++){
            xArray[k]=esriSampleData.samples[k].location.x;
            yArray[k]=esriSampleData.samples[k].location.y;
        }
//  Now establish the unique x and y positions. This is used later
        const xCounts = {};
        for (const num of xArray) {
            xCounts[num] = xCounts[num] ? xCounts[num] + 1 : 1;
        }
        xValuesString=Object.keys(xCounts)
        xValuesNumber=xValuesString.map(x => Number(x));
        xValuesNumber.sort(function(a, b){return a - b});
        xValuesNumber=xValuesNumber.map(function(x:any){
            return x.toFixed(4)
        });
        xValuesNumber=xValuesNumber.map(x => Number(x));

        const yCounts = {};
        for (const num of yArray) {
            yCounts[num] = yCounts[num] ? yCounts[num] + 1 : 1;
        }
        yValuesString=Object.keys(yCounts)
        yValuesNumber=yValuesString.map(y => Number(y));
        yValuesNumber.sort(function(a, b){return a - b});
        yValuesNumber=yValuesNumber.map(function(y:any){
            return y.toFixed(4)
        });
        yValuesNumber=yValuesNumber.map(y => Number(y));

// This section  stores the levels )if there are any
        if (verticalAxisPresent){ 
            for (var i = 0; i < dimensionArray.length; i++) {
                let condition=dimensionArray[i].includes("StdTime");
                if (condition) { break; }
            }
            var verticalPos:number;
            var timePosition:number
//  What order are the two dimensions?
            if (i==0){  //  StdTime is first
                timePosition=0;
                verticalPos=1
            }
            else{  //  StdTime is second and level is first
                timePosition=1
                verticalPos=0
            }
            var verticalDimensionName:string=dimensionArray[verticalPos];
            var levelArray:any[]=[];
            for (var k=0; k<numberOfSamples;k++){  //  Extract ever possible level 
                levelArray[k]=esriSampleData.samples[k].attributes[verticalDimensionName];
            }
            const counts = {};
            for (const num of levelArray) {
              counts[num] = counts[num] ? counts[num] + 1 : 1;
            }
            zValuesString=Object.keys(counts)  // Now have a list of all unique levels
            zValuesNumber=zValuesString.map(x => Number(x));
        }
        else{
            timePosition=0;
        }
//  The time dimesion is always present
        let timeDimensionName=dimensionArray[timePosition];
        var timeArray:any[]=[];
        for (var k=0; k<numberOfSamples;k++){
            timeArray[k]=esriSampleData.samples[k].attributes[timeDimensionName];
        }
        const counts = {};
        for (const num of timeArray) {
          counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
        tValuesString=Object.keys(counts)
        tValuesNumber=tValuesString.map(x => Number(x));
        let epochTime:string = new Date(tValuesNumber[0]).toISOString();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////// This is a polygon so will not be square. A way of making life easy is to create a rectangular grid and 
// fill the spaces between polygon and square
        var newXValues:number[]=[];
        var newYValues:number[]=[];
        newXValues=xValuesNumber;
        newYValues=yValuesNumber;
 
// Create the target sample object that re=orgainises the data/
// Use the x and y from the existing sample, but ensure the target grid is rectangular

//  Need to loop over X,Y,T,Z(If present)
//  Loop first over levels
//  Loop over time
//  Loop over x
//  Loop ovee y

   
//  Create a new set of sampples with null values. This will be our target samples array
//  CovJSON is happies with a rectangular grid so the new samples array is a proper rectangle that
//  will enclose the chosen polygon

var resolution=esriSampleData.samples[0].resolution;
    let parameterNames=collectionIdObject.keywords[0];
    var newSamplesArray:any[]=[];

    if(verticalAxisPresent){
        let count=0;
            for (var t=0; t<tValuesNumber.length;t++){
                for (var lvl=0; lvl<zValuesNumber.length;lvl++){
                    for (var y=0; y<yValuesNumber.length;y++){
                        for (var x=0; x<xValuesNumber.length;x++){
                        var newSample:SampleType= {
                            location: {
                                x: xValuesNumber[x],
                                y: yValuesNumber[y],
                                spatialReference: {
                                    wkid: 4326,
                                    latestWkid: 4326,
                                },
                            },
                                locationId: 0,
                                value: "Null",
                                rasterId: 0,
                                resolution: resolution,
                                attributes: {
                                [parameterNames]: "Null",
                                [timeDimensionName]: tValuesNumber[t],
                                [timeDimensionName+"_Max"]: tValuesNumber[t],
                                [VertDimensionName]: zValuesNumber[lvl],
                                [VertDimensionName+"_Max"]: zValuesNumber[0],
                                Variable: parameterNames,
                                Dimensions: timeDimensionName,VertDimensionName
                                },
                                
                        }
                        newSamplesArray.push(newSample);
                    }
                }
            }
        }
    }
    else{
        let count=0;
        for (var t=0; t<tValuesNumber.length;t++){
                for (var y=0; y<yValuesNumber.length;y++){
                    for (var x=0; x<xValuesNumber.length;x++){
                    var newSample:SampleType= {
                        location: {
                            x: xValuesNumber[x],
                            y: yValuesNumber[y],
                            spatialReference: {
                                wkid: 4326,
                                latestWkid: 4326,
                            },
                        },
                            locationId: 0,
                            value: "Null",
                            rasterId: 0,
                            resolution: resolution,
                            attributes: {
                            [parameterNames]: "Null",
                            [timeDimensionName]: tValuesNumber[t],
                            [timeDimensionName+"_Max"]: tValuesNumber[t],
                            Variable: parameterNames,
                            Dimensions: timeDimensionName
                            },
                            
                    }
                    newSamplesArray.push(newSample);
                }
            }
        }     
    }
//  Loop over the samples array and for each sample create a unique signature, but omitting the value
if(verticalAxisPresent){
var numberSample=(yValuesNumber.length)*(xValuesNumber.length)*(zValuesNumber.length)*(tValuesNumber.length)
}
else{
    var numberSample=(yValuesNumber.length)*(xValuesNumber.length)*(tValuesNumber.length)  
}
for  (var sampleCount=0; sampleCount<numberSample;sampleCount++){
    var stringified:string = JSON.stringify(newSamplesArray[sampleCount]);
    var uniqueSearchString=unique(stringified,verticalDimensionName,verticalAxisPresent)
// Now loop over the orginal sample array. First work out how many samples there are in the orginal sample array
    for (var sampleKount=0; sampleKount<esriSampleData.samples.length;sampleKount++){ 
        var stringified1:string = JSON.stringify(esriSampleData.samples[sampleKount]);
        var tempObject=JSON.parse(stringified1);
        var tempX=tempObject.location.x
        tempX=Number(tempX.toFixed(4))

        var tempY:number=tempObject.location.y
        tempY=Number(tempY.toFixed(4))
        
        tempObject.location.x=tempX;
        tempObject.location.y=tempY;
        stringified1 = JSON.stringify(tempObject);
        var uniqueSearchString1=unique(stringified1,verticalDimensionName,verticalAxisPresent);
        if(uniqueSearchString==uniqueSearchString1){
            console.log("unique",sampleCount,sampleKount);
            newSamplesArray[sampleCount].value=esriSampleData.samples[sampleKount].value;

            break
        }
    }
}
epochTime = new Date(tValuesNumber[0]).toISOString();

//  The newSamplesArray is ready to be converted to CovJSON
//        let sampleCount:number=esriSampleData.samples.length


////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Set up the referencing values that describe the axes coordinate systems. One for geospatial and one for time

    var referencingValues:any[]=[];
            var mdpXY: referencingTypeXY = {
            coordinates: ["x","y"],
            system: {
                type: "GeographicCRS",
                id: "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
            }
        };
    referencingValues.push(mdpXY);

    var mdpTCal:referencingTypeCal = {
        coordinates: [
        "t"
        ],
        system: {
            type: "TemporalRS",
            calendar: "Gregorian"
        }
    }
    referencingValues.push(mdpTCal);


    let parameterName:any=esriSampleData.samples[0].attributes.Variable;
    let resultObject=collectMetadata(collectionIdObject,parameterName)
    let unitLabel=resultObject.unitLabel
    let unitSymbolvalue=resultObject.unitSymbolvalue;
    let parameterDescription=resultObject.parameterDescription
    let requiredKey=resultObject.requiredKey

//   
// the purpose of this section of code is to look through the keyword values in the collectionIdObject
// Once found then this can be used to locate the correct metadata from the collectionIdObject
// This is found at collectionIdObject.parameter_names
//
    if (verticalAxisPresent){
        let vertialCRSDescription=resultObject.verticalCRSDescription
        let myArr = vertialCRSDescription.split("]"); 
//   Look for the axis element in the array that has the term Axis
        for (var i = 0; i < myArr.length; i++) {
            let searchString:string=myArr[i];
            let condition=searchString.includes("AXIS");
            if (condition) { break; }
        }
        if (i==myArr.length){
            throw Error("CovJson the vertical coordinate description is badly formed");
        }
//  Set up the parameter description
    let axisPosition=i;
    let myArrNewArray=myArr[axisPosition].split("[");

    for (var i = 0; i < myArrNewArray.length; i++) {
        let searchString:string=myArrNewArray[i];
        let condition=searchString.includes("(");
        if (condition) { break; }
    }

    if (i==myArrNewArray.length.length){
        throw Error("CovJson the vertical coordinate description is badly formed");
    }

//  Now slice and dice to find the appropriate parameters.
    let Position=i;
    let myArrNewNewArray=myArrNewArray[Position].split("(");
    let index=myArrNewNewArray[1].indexOf(")")
    if (index==-1){
        throw Error("CovJson the vertical coordinate description is badly formed");
    }
    let verticalUnit:string=myArrNewNewArray[1].slice(0,index)
    let direction:string=myArrNewNewArray[1].slice(index+3,myArrNewNewArray[1].length)
    let verticalVariable:string=myArrNewNewArray[0].slice(1,myArrNewNewArray[0].length)

    var mdpZ:referencingTypeZ = {
        coordinates: [
        "z"
        ],
        "system": {
            "type": "VerticalCRS",
            "cs": {
              "csAxes": [
                {"name": {en: verticalVariable},
                  "direction": direction,
                  "unit": {
                    "symbol": verticalUnit
                  }
                }
              ]
            }
          }
        }
    referencingValues.push(mdpZ);
    }
    var parameterValues:parametersType={
        [requiredKey]: {
        type: "Parameter",
        description: {
            en: parameterDescription
        },
        unit: {
            label: {
            en: unitLabel
            },
            symbol: {
            value: unitSymbolvalue,
            type: "http://www.opengis.net/def/uom/UCUM/"
            }
        },
        observedProperty: {
            id: parameterDescription,
            label: {
            en: parameterDescription
            }
        }
     }
    }
    var valueValues:number[]=[];
// the value of the parameter comes a string so convert to a
//    let resultLength:number=esriSampleData.samples.length
//    for (var i = 0; i < resultLength; i++) {
//        var resultValue:number=+esriSampleData.samples[i].value;
//        valueValues[i]=resultValue;
//    }
  

//  newSamplesArray[sampleCount].value=esriSampleData.samples[sampleKount].value;
    let resultLength:number=newSamplesArray.length
    for (var i = 0; i < resultLength; i++) {
        var resultValue:number=+newSamplesArray[i].value;
        valueValues[i]=resultValue;
    }

    var shapeValue:number[]=[];
    if (verticalAxisPresent){
        shapeValue[0]=tValuesNumber.length;
        shapeValue[1]=zValuesNumber.length;
        shapeValue[2]=yValuesNumber.length;
        shapeValue[3]=xValuesNumber.length;
        var axisNamesValue:string[]=[];
        axisNamesValue[0]="t";
        axisNamesValue[1]="z";
        axisNamesValue[2]="y";
        axisNamesValue[3]="x";
    }
    else{
        shapeValue[0]=tValuesNumber.length;
        shapeValue[1]=yValuesNumber.length;
        shapeValue[2]=xValuesNumber.length;
        var axisNamesValue:string[]=[];
        axisNamesValue[0]="t";
        axisNamesValue[1]="y";
        axisNamesValue[2]="x";
    }
    var rangeValues:rangesType= {
        [requiredKey]: 
        {
        type: "NdArray",
        dataType: "float",
        axisNames:axisNamesValue,
        shape:shapeValue,
        values: valueValues
        }
    }

 //   new Date(tValuesNumber[0]).toISOString();
    tValuesString=tValuesNumber.map(function(t:any){
        return new Date(t).toISOString();
    });
    if (verticalAxisPresent){
        var axisObject:any={
            x:{values:xValuesNumber},
            y:{values:yValuesNumber},
            z:{values:zValuesNumber},
            t:{values:tValuesString},
        }
    }
    else{
        var axisObject:any={
        x:{values:xValuesNumber},
        y:{values:yValuesNumber},
        t:{values:tValuesString},
    }}
    var sampleCovJsonObject:covJsonType={
            "type":"Coverage",
            "domain":{
                "type":"Domain",
                "domainType":domainType,
                axes:axisObject,
                referencing:referencingValues
            },
            parameters:parameterValues,
            ranges:rangeValues
        }
    return sampleCovJsonObject
    }  //  End of static method.




}   //  End of Class declaration
export default CovJsonCreate; 

function unique(stringified,verticalDimensionName,verticalAxisPresent){
    var indexXValue = stringified.indexOf("x");
    var indexYValue = stringified.indexOf("y");
    var indexTimeValue = stringified.indexOf("StdTime");
    if(verticalAxisPresent){
        var indexVerticalValue1 = stringified.indexOf(verticalDimensionName);
        var indexVerticalValue2 = stringified.indexOf(verticalDimensionName,indexVerticalValue1+1);
    }
    var searchStringXValue=stringified.slice(indexXValue,indexXValue+15);
    var searchStringYValue=stringified.slice(indexYValue,indexYValue+15);
    var searchStringTimeValue=stringified.slice(indexTimeValue,indexTimeValue+24);
    if(verticalAxisPresent){
        var searchStringVerticalValue=stringified.slice(indexVerticalValue1,indexVerticalValue2);
        var uniqueSearchString:string=searchStringXValue+searchStringYValue+searchStringTimeValue+searchStringVerticalValue
    }
    else{
        var uniqueSearchString:string=searchStringXValue+searchStringYValue+searchStringTimeValue
    }
    return uniqueSearchString
}

function collectMetadata(collectionIdObject,parameterName){
//  This function takes information from the ColledId object and returns the metadata
//  for a specific paramter in the resultObject. The required parameter is passed as an argument
//  and is called parameterName.
	let searchedArray:string[]= collectionIdObject.keywords;  // Stored in the keyword property
        var objectToSearch=collectionIdObject.parameter_names;
        for (var i = 0; i < searchedArray.length; i++) {
            let searchString:string=searchedArray[i];
            let condition=searchString.includes(parameterName);
            if (condition) { break; }
        }
        if(i==searchedArray.length){
            const message = `The collectionId does not hold the paramter found in sample`;      
            throw new Error(message);
          };
        let keyWordPosition=i;
// get the new key value for the ith property in the object.
        let keyArr = [];
        for (let keys in objectToSearch) {
            keyArr.push(keys)
        };
        
        let requiredKey:any=keyArr[keyWordPosition];  //  This is the key word
        let parameterObject:parameterNameType2=objectToSearch[requiredKey];
        let parameterDescription=parameterObject.description.en;
        let unitLabel=collectionIdObject.parameter_names[requiredKey].unit.label.en;
        let unitSymbolvalue=collectionIdObject.parameter_names[requiredKey].unit.symbol.value;

        let keyArray = [];
        for (let keys in collectionIdObject.parameter_names[requiredKey]) {
            keyArray.push(keys)
        };
        if(i==searchedArray.length){
            const message = `The collectionId does not hold the paramter found in sample`;      
            throw new Error(message);
          };

        let stringToSearch="vert";
        for (var i = 0; i < keyArray.length; i++) {
            let searchString2:string=keyArray[i];
            let condition=searchString2.includes(stringToSearch);
            if (condition) { break; }
        }
        var resultObject:any
        if(i==keyArray.length){
                resultObject={parameterDescription:parameterDescription,unitLabel:unitLabel,unitSymbolvalue:unitSymbolvalue,
                requiredKey:requiredKey}
        }
          else{
            let verticalDescriptionKey=keyArray[i];
            let verticalCRSDescription=collectionIdObject.parameter_names[requiredKey][verticalDescriptionKey].vrs;
            resultObject={parameterDescription:parameterDescription,unitLabel:unitLabel,unitSymbolvalue:unitSymbolvalue,
                requiredKey:requiredKey,verticalCRSDescription:verticalCRSDescription}
          }

        return resultObject;
  }