
/**
 * fetchESRICollectionIdMetaData
 */

import fetch from 'node-fetch';
import dotenv from "dotenv";
import assembleCollection from "../routes/collections/collectionId/assembleCollection"; 
export async function fetchESRICollectionIdMetaData(collectionIdPath) {
//   first thing to do is to establish if the targetServer is pointing to a sevice or a folder
//   Thus examine the URL for the term "ImageServer"  
  console.log(collectionIdPath);
  const targetServer1:string = process.env.TARGET_SERVER  
  let indexCollections:number = collectionIdPath.indexOf("collections")
  let collectionIdName=collectionIdPath.slice(indexCollections+12,targetServer1.length)
  let indexhttps:number = targetServer1.indexOf("https")
  let indexArcgis:number = targetServer1.indexOf("arcgis")
  let baseURL:string=targetServer1.slice(indexhttps, indexArcgis-1)
  let str = targetServer1;
// The standard and multidimenstional info are both needed.
  var urlArray:any = [];
    let substr = 'ImageServer';
    const mode:string = process.env.MODE
  
    // Given there are no folders the url Array is simply the URL for the service
    if (mode!=='Folders'){    //  No folders
      console.log ("no folders");

      let indexImageServer:number = targetServer1.indexOf("ImageServer")
      urlArray.push(targetServer1.slice(0,+indexImageServer+11)+"?f=json");
      urlArray.push(targetServer1.slice(0,+indexImageServer+11)+"/multiDimensionalInfo?f=json");
    }
    else{
      let lengthText=targetServer1.length;
      let serviceUrl=targetServer1.slice(0,lengthText)+"/"+collectionIdName;
      urlArray.push(serviceUrl+"/ImageServer?f=json");
      urlArray.push(serviceUrl+"/ImageServer/multiDimensionalInfo?f=json");
    }

  // This section takes the url array and calls the ESRI server for each url. They are in pairs:- the first 
  // is the parent and second the multidimensinal info. The object array esriMetadata is returned. 
  // pArray   
    let serviceURLArray=urlArray;
    const pArray = serviceURLArray.map(async userId => {
      const response = await fetch(userId);
      if (!response.ok) {
        const message = `An error has occured in getting collectionId: ${response.status}`;
        throw new Error(message);
      }
      return response.json();
    });

    const esriMetadata:any = await Promise.all(pArray);
    if ("error" in esriMetadata[0]) {
      let error1=esriMetadata[0].error.message
      throw Error(error1)
    }  
    return esriMetadata
   
} //  end of Async function
export default fetchESRICollectionIdMetaData;