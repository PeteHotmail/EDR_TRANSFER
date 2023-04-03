
/**
 * fetchESRIGetSample
 */

import fetch from 'node-fetch';
import dotenv from "dotenv";
import assembleCollection from "../routes/collections/collectionId/assembleCollection"; 
export async function fetchESRIGetSample(collectionIdPath) {
//   first thing to do is to establish if the targetServer is pointing to a sevice or a folder
//   Thus examine the URL for the term "ImageServer"  
console.log(collectionIdPath);
const response = await fetch(collectionIdPath);
if (!response.ok) {
  const message = `An error has occured in getting collectionId: ${response.status}`;
  throw new Error(message);
}
return response.json();

} //  end of Async function
export default fetchESRIGetSample;