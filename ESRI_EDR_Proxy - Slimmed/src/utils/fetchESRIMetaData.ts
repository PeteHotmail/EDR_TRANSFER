import fetch from 'node-fetch';
import dotenv from "dotenv";
import assembleCollection from "../routes/collections/collectionId/assembleCollection"; 
export async function fetchESRIMetaData() {
//   first thing to do is to establish if the targetServer is pointing to a sevice or a folder
//   Thus examine the URL for the term "ImageServer" 
//   This was ammended to include the token at the end of the url   
const targetServer1:string = process.env.TARGET_SERVER
const token=process.env.TOKEN 
let indexhttps:number = targetServer1.indexOf("https")
let indexArcgis:number = targetServer1.indexOf("/arcgis")
let baseURL:string=targetServer1.slice(indexhttps, indexArcgis-0)
let str = targetServer1+token;

var urlArray:any = [];
   let substr = 'ImageServer';
   const mode:string = process.env.MODE
   if (mode=='Folders'){
      const response = await fetch(targetServer1);  // The html response from the straight call to the server.
        if (!response.ok) {
        const message = `An error has occured please check target server url: ${response.status}`;
        throw new Error(message);
      }
      const folders = await response.text();  //  The landing page for the target server.
      if (folders.includes('error')) { 
        throw Error(folders.error.message)
      }
        var splittext = folders.split("href");  // create an array of the complete response split by href
        function containsText(element, index, array) 
        {  
           return element.includes("ImageServer")
        }    
        
        function extractText(element1, index, array) 
        {  
            var indexServices = element1.indexOf("/")
            var indexImageServer = element1.indexOf("ImageServer")
            var tempvar=element1.slice(indexServices, indexImageServer)
            return tempvar.includes("services");
        }         

  // This section creates an array of the URLs to call each folder service 
        var value = splittext.filter(containsText); // Creates an array of service links for each folder
        value.forEach(function(item, index, array)  {  // Create an array for the URLS for each folder links
            let indexServices:number = item.indexOf("/")
            let indexImageServer:number = item.indexOf("ImageServer")
            urlArray.push(baseURL+item.slice(indexServices, indexImageServer+11) +"?f=json"+token);
            urlArray.push(baseURL+item.slice(indexServices, indexImageServer+11) +"/multiDimensionalInfo?f=json"+token);
        });
        console.log(value);
        console.log(urlArray); // The array of urls pointing to the parent and multidimensional server endpoints
        console.log("text")
    }  //  End of conditional block
    else {
  // Given there are no folders the url Array is simply the URL for the service
      console.log ("no folders");

      let indexImageServer:number = targetServer1.indexOf("ImageServer")
      urlArray.push(targetServer1.slice(0,+indexImageServer+11)+"?f=json");
      urlArray.push(targetServer1.slice(0,+indexImageServer+11)+"/multiDimensionalInfo?f=json");
    }

// This section sets up the array pArray. This is an array of the promises to be sent to the server.
// It is created by mapping across for each url
// 
// const array1 = [1, 4, 9, 16];
// pass a function to map
// const map1 = array1.map(x => x * 2);
// console.log(map1);
// expected output: Array [2, 8, 18, 32]
//
  let serviceURLArray=urlArray;
  let PeteName="Fred";
  let sayHi = function(PeteName,aa,bb) { // (1) create
    console.log(PeteName);
    return aa+bb
  };
  let AA=5;
  let BB=10;
  let answer=sayHi(PeteName,AA,BB)
  console.log("Answer  ",answer)
  const pArray = serviceURLArray.map(async userId => {
    const response = await fetch(userId);
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    return response.json();
  });

//
// This section takes the url array pArray and calls the ESRI server for each url. They are in pairs:- the first 
// is the parent and second the multidimensinal info. The object array esriMetadata is returned. 
// pArray 
//

  const esriMetadata:any = await Promise.all(pArray); 
  if ("error" in esriMetadata[0]) {
    let error1=esriMetadata[0].error.message
    throw Error(error1)
  }  
  return esriMetadata
   
} //  end of Async function
export default fetchESRIMetaData;