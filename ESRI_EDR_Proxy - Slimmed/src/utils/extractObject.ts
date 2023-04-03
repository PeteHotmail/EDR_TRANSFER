export function extractObject(useEsriNameFlag:string,ESRI_variableDescription,ESRI_parameterTerm,metadataObject){
    var fs = require('fs');
/** 
 * @param useEsriNameFlagInput if true this returns esri names (as in image server). If false the WMO equivalents
 * @param ESRI_variableSurfaceDescription Input The GRIB2 surface type  the parameter uses
 * @param ESRI_parameterTerm Input (An array) contains the ESRI names of the variables in the collection.
 * @param metadataObject output as the full list of metadata for each paramete in the collection.
 */    
//  This function is called for Every Collection and takes as input the WMO surface type
//  The output is a set of metadata for each parameter in that collection, either using the ESRI name or the
//  fully qualified WMO name. The translation layer and holder of the WMO metadata is in a file metaDataObjectChanged
//
    var propertyKeyArray;
    var metaDataObject_Parsed;
    var sourceOfObject = {};
    var parameterName=[];
    var count=0;
    var defaultObject={
        type: "Parameter",
        description: {
          en: "This has not yet been set",
        },
        unit: {
          label: {
            en: "This has not yet been set",
          },
          symbol: {
            value: "This has not yet been set",
            type: "This has not yet been set",
          },
        },
        observedProperty: {
          id: "This has not yet been set",
          label: {
            en: "This has not yet been set",
          },
        },
        measurementType: {
          method: "This has not yet been set",
          period: "This has not yet been set",
        },
      }
    const data = fs.readFileSync('metaDataObjectChangedV25.json', 
                {encoding:'utf8', flag:'r'}); 
    let jsonData = data;
    processFile();
//  The array metaDataObject_Parsed holds the WMO surface definitions and the ESRI equivalent
//  and for each surface type there is a list of WMO parameter names and their ESRI equivalent
//
//  The array surfaceKeyArray holds only a list of WMO surface types and their equivalent ERI description.
//  The array ESRI_Surface_Types holds the just the ESRI surface types (filtered from the surfacekeyArray)
    function processFile()  {
        var metaDataObject_Parsed = JSON.parse(jsonData);  
        let surfaceKeyArray=Object.keys(metaDataObject_Parsed)  
        let ESRI_Surface_Types=surfaceKeyArray.map(extractText); 
        let verticalSurfaceFoundFlag:boolean=false;  // Set to false

//  Is the target ESRI surface type within ESRI_Surface_Types and if so where? 
        for (var i = 0; i < ESRI_Surface_Types.length; i++) {  // Loop over the ESRI_Surface_Types
            let searchString=ESRI_Surface_Types[i]; // Select an ESRI surface type  
            let condition=ESRI_variableDescription.includes(searchString);  // does description property contain master
            if (condition) { 
                verticalSurfaceFoundFlag=true;
                break }  //  A ESRI surface types is found in the master array.
        }  //  The value of i holds the postion of the in the master array
//  If the index is greater than ESRI_Surface_Types.length then use the default surface type
        let searchTermKey:string;
        if(verticalSurfaceFoundFlag) {
          searchTermKey= surfaceKeyArray[i]
        }
        else{
          searchTermKey="WMO_alias=Default level:ESRI_alias=Default?"
        }
// Having found the index of the surface type need to try and match up with the named parameter
// The propertyKeyArray holds a text arraay of WMO parameter names for that surface and where set, the ESRI equivalent.
            let propertyKeyArray=Object.keys(metaDataObject_Parsed[searchTermKey]) 
            let loopLength=ESRI_parameterTerm.length;
            var count:number=0;
            for (var m =0; m <loopLength; m++) { 
// This is the name in the esri parameter name 
              let textEnd:number=ESRI_parameterTerm[m].indexOf("_");
              let searchEsriParameter=ESRI_parameterTerm[m].slice(0,textEnd);  // Remove the suffix from parameter if present
              let index=propertyKeyArray.findIndex(searchText,searchEsriParameter) // 
//
// The Javascript Array.findIndex() method is used to return the first index of the element 
// in a given array that satisfies the provided testing function (passed in by the user while calling).
//  Otherwise, if no data is found then the value of -1 is returned.
//
              if (index !==-1) {  // Found the parameter in the WMO parameter list at the index 
                let parameterName=propertyKeyArray[index];  //  Now have the correct parmater name for the surface type
    //  using the search index i.e. Index Extract the WMO parameter Name
                var temp_metadataObject={};
                let valueTextEnd=parameterName.indexOf(":");  //  Find the end position for each elment
                let stringLength=parameterName.length;
                let WMOparameter:string=parameterName.slice(0,valueTextEnd);  //  This is the WMO paramter name
                let ESRIparameter=parameterName.slice(valueTextEnd+12,stringLength-1);  //  This is the WMO paramter name
                var defaultName='default'
                sourceOfObject=metaDataObject_Parsed[searchTermKey][propertyKeyArray[index]];
                var esriFlag = useEsriNameFlag == "true";
                if (esriFlag) {
                    temp_metadataObject[ESRIparameter]={};                
                    temp_metadataObject[ESRIparameter]=sourceOfObject;
                }
                else {
                    temp_metadataObject[WMOparameter]={};                
                    temp_metadataObject[WMOparameter]=sourceOfObject;
                }
                metadataObject[count]=temp_metadataObject;
                count++;
              }
              else {
                temp_metadataObject={};
                temp_metadataObject[ESRI_parameterTerm[m]]={};
                temp_metadataObject[ESRI_parameterTerm[m]]=defaultObject;
                console.log("Miss",ESRI_parameterTerm[m]);
                metadataObject[count]=temp_metadataObject;
                count++
              }
            }  //  End of loop The metadataObject holds the WMO metadata for each esri variable
        } // End of function processFile
    }
    function extractText (text) {
        // extractText is a function to extract the ESRI surface type for each member of the surfaceKeyArray used in map function
            let valueTextStart=text.indexOf("ESRI_alias="); //  Find the start position for each element
            let valueTextEnd=text.indexOf("?");  //  Find the end position for each elment
            let valueTestSlice=text.slice(valueTextStart+11,valueTextEnd)  //  Slice out for each element the alias name
        return valueTestSlice
    }
       
    const searchText = function(element) {  //  This function is called for each element of the array
        return element.includes(this);  //  Does the array element contain the search term and if it does 
    }  //  End of function searchText 