
// Routine CovJson
// Invoked from the module position/
// This builds the CovJson Rule that is part of the ImageServer request
// The returned rule is an object
/** interface for Multidemisnional Parameter used in definition */
//  Use the appropriatea interface either for a set of values or a range of values that need a 2D array.

import {collectionIdObject,esriSampleDataType,covJsonType,
    referencingType,rangesType,parametersType,parameterNameType2} from "../utils/Interfaces"

//   referencing:<referencingType>
const dateAS = import('date-and-time');

//  This invoked from Position etc as the buildURL method in CLASS Route (defined in Position)
class CovJsonCreate {
    static createCovJsonRulePoint (esriSampleData:esriSampleDataType,domainType:string,collectionIdObject:collectionIdObject) {
    var xValues:number[]=[];
    xValues[0]=esriSampleData.samples[0].location.x;
    var yValues:number[]=[];
    yValues[0]=esriSampleData.samples[0].location.y;
    var tValues:number[]=[];
    tValues[0]=esriSampleData.samples[0].attributes.StdTime;

    //  Set up the referencing values that describe the axes coordinate systems. One for geospatial and one for time
    var referencingValues:referencingType[]=[];
        var mdpT: referencingType = {
        coordinates: ["x","y"],
        system: {
            type: "GeographicCRS",
            id: "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
        }
    };
    referencingValues.push(mdpT);

    mdpT = {
        coordinates: [
        "t"
        ],
        system: {
            type: "TemporalIRS",
            id: "Gregorian"
        }
    }
    referencingValues.push(mdpT);
    let parameterName:any=esriSampleData.samples[0].attributes.Variable;
//   
// the purpose of this section of code is to look through the keyword values in the collectionIdObject
// Once found then this can be used to locate the correct metadata from the collectionIdObject
// This is found at collectionIdObject.parameter_names
//
    let searchedArray:string[]= collectionIdObject.keywords;
    var objectToSearch=collectionIdObject.parameter_names;
    for (var i = 0; i < searchedArray.length; i++) {
        let searchString:string=searchedArray[i];
        let condition=searchString.includes(parameterName);
        if (condition) { break; }
        console.log("Condition",condition);
        console.log("searchString",searchString);
      }
    let keyWordPosition=i;
    let collectionIdparameter_names=collectionIdObject.parameter_names
// get the new key value for the ith property in the object.
    let keyArr = [];
    for (let keys in objectToSearch) {
        keyArr.push(keys)
    };
    let requiredKey:any=keyArr[keyWordPosition];
    let parameterObject:parameterNameType2=objectToSearch[requiredKey];
    let narrative=parameterObject.description.en;
//  Set up the parameter describption
    var parameterValues:parametersType={
        [requiredKey]: {
        type: "Parameter",
        description: {
            en: narrative
        },
        unit: {
            label: {
            en: "Degree Celsius"
            },
            symbol: {
            value: "Cel",
            type: "http://www.opengis.net/def/uom/UCUM/"
            }
        },
        observedProperty: {
            id: "http://vocab.nerc.ac.uk/standard_name/sea_water_potential_temperature/",
            label: {
            en: narrative
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

}   //  End of Class declaration
export default CovJsonCreate; 