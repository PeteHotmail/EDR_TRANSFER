//  This is function Assemble
//  Called from collectionMetadata after the call of fetchData that collects all the esri metadata
//  The input esriMetadata is an object array: Change
//  with each odd memeber holding the parent esri doc and the even holding the multidimensional data
//  This set of metadata is quality controlled to get rid of incomplete entries.
//  For each "pair of metadata or collection" the function createJsonObjectCollections is called.
//      This is a test edit to validate the git hub actions on 23/3/2023 at 09:46

//import { memory } from "console";
import {createJsonObjectCollections} from "../../../utils/createJsonObjectCollections"
import {validateMetadata} from "../../../utils/validateMetadata"
import reorderMetadata from "./../../../utils/reorderMetadata"

export function Assemble(esriMetadata,collectionIdPath,hostName) {
        const mode:string = process.env.MODE
        var fs = require('fs');
 //       const dateAS = require('date-and-time');
 //       callingURL=req.headers.host+req.url+"?f=json";
 //
 //  The call to esriMetadataQ is necessary to ensure any incomplete descriptions in 
 //  the esriMetadata are deleted.
        let esriMetadataQ=validateMetadata(esriMetadata);
// the purpose of reorderMetadata is to ensure that the esriMetadata is order such
// that all the variables within a multidimensional object all share the same
// vertical coordinate. It is only used if there are no folders
        if (mode=='Folders') {        
                
                var reorderd_Data=esriMetadataQ
                console.log(reorderd_Data)
        }
        else{
                reorderd_Data=reorderMetadata(esriMetadataQ);
        }
        let stringP = JSON.stringify(reorderd_Data);
        let fileName_esriMetadataR="reorderd_Data";
        fs.writeFileSync(fileName_esriMetadataR, stringP);
 //       var numberOfParameters=reorderd_Data[1].multidimensionalInfo.variables.length;
 //       let esriMetadataQLength=reorderd_Data.length;
        var callingURL=hostName+collectionIdPath;

        var collectionsTargetObject= {
                links:[],
                collections:[]
                }
 
        collectionsTargetObject.links.push({});
        collectionsTargetObject.links[0]['href'] = callingURL;
        collectionsTargetObject.links[0]['hreflang'] = "en";
        collectionsTargetObject.links[0]['rel'] = 'self';
        collectionsTargetObject.links[0]['type'] = 'application/json';


//
//  Loop over each collectionId to put them all into collecions object one positiopn for each Id
//  
        let numberOfArrayElements:number=reorderd_Data.length; //  The number of collections
        let collectionLength:number=numberOfArrayElements/2;  //  The number of collections

        for (let i = 0; i < collectionLength; i++) {  // Loop over each collection
        let p1:number= i*2;
        let p2:number= i*2+1;
          let collectionIdObject = reorderd_Data[p1];
          let collectionIdMultiObject = reorderd_Data[p2];
          let serviceDescription=collectionIdObject.serviceDescription;      
          let lengthVar:number=(collectionIdMultiObject.multidimensionalInfo.variables.length);  
// This is the number of parameters for this collectionId             
// It is assumed that there is a unique number of dimensions for each collection.
// The dimensions are listed for each parameter in the collection, but only the first parameter is used.
// collectionsTargetObject will hold the final collections object. 
// collectionIdObject will hold the parent documemnt for each collection
// collectionIdMultiObject will hold the multidimensional object fore each collectionsw
//
        let kount=i;
        createJsonObjectCollections(collectionsTargetObject,kount,collectionIdObject,collectionIdMultiObject,callingURL);
        }  // End of the loop over collections.

//  

        let string2 = JSON.stringify(collectionsTargetObject);
        let fileName="Harry.Collections.txt";
        fs.writeFileSync(fileName, string2);
        return collectionsTargetObject;
            console.log("file has been saved.");
        };  // End of function call

 // end of function Assemble
export default Assemble;