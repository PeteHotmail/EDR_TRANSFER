//  AssembleCollectionId
//  This is invoked from collectionIdMetadata
//  The purpose of this function is to create the collectionId object.
//  The inputs are the serviceMetadata and the multidimensional metadata
import {extractObject} from "../../../utils/extractObject"
import {validateMetadata} from "../../../utils/validateMetadata"
import reorderMetadata from "../../../utils/reorderMetadata"
import dotenv from "dotenv";
//  collected from the ESRI metadata.

export function AssembleCollectionId(esriMetadata,collectionIdPath,hostName) {
const mode:string = process.env.MODE
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


return sourceData;
}
export default AssembleCollectionId;