export function reorderMetadata(esriMetadata){
// The purpose of this function is to transoform the raw esriMetadata into collections.
// The input data (esriMetadata) is arranged in pairs. They alternate between the service description
// and the accompanying multidimensional data with its set of variables.
//
// In this version only a simple esriMetadata is deconstructed i.e. it has only one service description and one
// multidimensionalInfo.
// The returned object will be ordered into collections, but still in the same organisation as the input.
// Normally there will be new couplets, the first is the service metadata the second the multidimensional data.

var fs = require('fs');
//  How many variables are there in the orginal esriMetadata. For each variable extract the surface type.
//  The surface type is derived from the esri variable names in multidimensionalInfo
var numberOfParameters:number=esriMetadata[1].multidimensionalInfo.variables.length;
var matrix= [];
let iMax2 = numberOfParameters;
let jMax2 = numberOfParameters;
let surfaceDescriptionArray2=[];
let dimensionDescriptionArray=[];

for (let i = 0; i < iMax2; i++) { // Create an array of surface types for each variable in esriMetadata 
  let description=esriMetadata[1].multidimensionalInfo.variables[i].name
  let indexDescription:number = description.indexOf("@")
  let surfaceDescription=description.slice(indexDescription+1,+description.length);
  surfaceDescriptionArray2[i]=surfaceDescription;
}

// Create an array of all listed dimension objects as each variable has a dimension object
for (let i = 0; i < iMax2; i++) { // Create an array of surface types for each variable in esriMetadata 
  let dimensionObject1=esriMetadata[1].multidimensionalInfo.variables[i].dimensions;
  dimensionDescriptionArray[i]=JSON.stringify(dimensionObject1);
} 
//  Create a 2D array that indicates which variables share the same surface description.
//  Loop over each variable in the multidimensional info object to fine a match
for (let i = 0; i < iMax2; i++) {  //  Loop over each variable 
  matrix[i] = [];
  let description=JSON.stringify(esriMetadata[1].multidimensionalInfo.variables[i].dimensions);  //  The surface type for that specific variable
  for (let j = 0; j < jMax2; j++) {   //  Loop over each surface type to find a match for a variable
    let objectDescription=dimensionDescriptionArray[j];
    if (description==objectDescription){ //  Does This variable description match the sfc type
      matrix[i][j] = j;
    }
    else{
    matrix[i][j] = -1;
    }
  }
}
// There is a row for each variable and if no match then the value is set to -1. if the variable shares the same 
// dimension object as another row then the index of that variable is inserted.
// The index value in the array for the row indicates the position of the variables that is shares with.
var uniques = [];
var itemsFound = {};
// Get rid of duplicate rows.
for(var i = 0, l = matrix.length; i < l; i++) {
  var stringified = JSON.stringify(matrix[i]); // Create a string for each row of the matrix
  if(itemsFound[stringified]) { continue; }
  uniques.push(matrix[i]);
  itemsFound[stringified] = true;
}
// Have eliminated all dupoicate rows to uniques holds the number of collections and the indexes
// Each row represents a new collection and the index values in that row hold the postion of that variable
// in the orginal esriMetadata[1].multidimensionalInfo.variables array
// The uniques is an array with a row for each surface type that his shared by all variables
// The columns hold the index of the variables array held in multidimensional object.
// create a new array that holds the data as collections that are based on having the same geospatial 
// properties.  
//
// This section creates a new array "new_ESRI_Metadata" based on collections that are grouped by dimension type.
// This array is still organised by service/multidimensional paring. Each pair is in effect a collection. 
// Note the dimension type may have more than one dimension object.

let new_ESRI_Metadata=[];
for(var i = 0, l = uniques.length; i < l; i++) { //  loop over each "collection or "
  let row=uniques[i];
  let p1=i*2
  let p2=p1+1  //  The p2 counts through the multidimensional metadata for each collection.

  let transfer = JSON.parse(JSON.stringify(esriMetadata[0]));  // Service data.
  let transferDesc=transfer.serviceDescription;
  new_ESRI_Metadata[p1]=transfer;  //  Copy across the service metadata.
  new_ESRI_Metadata[p1].serviceDescription=transferDesc;  //  Copy service metadata and add surface type
  
  let result=row.filter(word => word !==-1); // Result holds the positons of the variable in multi
  new_ESRI_Metadata[p2]={};
  new_ESRI_Metadata[p2].multidimensionalInfo={};
  new_ESRI_Metadata[p2].multidimensionalInfo.variables=[];
  for(var m = 0, mm=result.length; m < mm; m++){ //  Loop over the variables in the "collection"
      let index=result[m];
      let pete =esriMetadata[1].multidimensionalInfo.variables[index];
      new_ESRI_Metadata[p2].multidimensionalInfo.variables[m]=pete;
  };
}  //  loop 
// The array new_ESRI_Metadata holds a pair of infor for each dimension type.
let stringP = JSON.stringify(new_ESRI_Metadata);
let fileName = "new_ESRI_Metadata";
fs.writeFileSync(fileName, stringP);


//  Now need to check the dimension object for each interim collection
//  Create the surface types for each interim collection.
//  This section tackles the next problem.
//  Even though the collections share the same domain surface type, they may actually be of different/
//  domain objects so need to further sub divide collections where there are different domain object
//  sharing the same domain surface type.
//
//********************    Phase 2   ************************************ */
//
//  First loop over each interim collection and find out how they should be split, if at all.
let numberOfCollections=new_ESRI_Metadata.length/2;
let collectionCount=0;
let final_ESRI_Metadata=[];

// Create an array of surface types for each variable in new_ESRI_Metadata
// The array uniquesInterim has a row for each unique surface type in the interim collection
// For each row (surface type) there is a set of indexes that point to the variables that belong
// to that surface type.

final_ESRI_Metadata=[];
let rootServiceName:string=new_ESRI_Metadata[0].serviceDescription;
let valueTextEnd:number=rootServiceName.indexOf("@");
rootServiceName=rootServiceName;
//  rootServiceName=rootServiceName.slice(0,valueTextEnd);
for (let m= 0; m < numberOfCollections; m++) { // Loop over each interim collection
  let p1=m*2;  //  These counters are used to index through interimCollections.
  let p2=p1+1;
  var uniquesInterim = [];
  let surfaceDescriptionArrayInterim=[];
// The array uniquesInterim is 2D. Each row represents a new collection.Each column has a value that represents
// the collection position in the original array new_ESRI_Metadata
    createUniqueMatrix(new_ESRI_Metadata[p2],uniquesInterim,surfaceDescriptionArrayInterim)
    let numberOfNewCollections=uniquesInterim.length;
// At this point some of the interim collections (based on domain surface type) may have extra collections based on the
// domain object rather than on the domains surfacee type. 
// Each row in the uniquesInterim array will point to a new collection, but may have multiple variables that share 
// the same domain object.
    for(var i = 0, l = numberOfNewCollections; i < l; i++) {  // Loop over the rows in the index araray
      let pointer1=collectionCount*2;  // A pointer to next collection in final_ESRI_Metadata 
      let row=uniquesInterim[i]; 
//  Copy across the service metadata from the orginal esriMetadata. 
      let transfer = JSON.parse(JSON.stringify(esriMetadata[0]));
      let transferDesc=transfer.serviceDescription; 
      final_ESRI_Metadata[pointer1]=transfer;  
      let surfaceType=surfaceDescriptionArray2[i];
//  Note pointer1 points to the service metadata in index in final_ESRI_Metadata
      final_ESRI_Metadata[pointer1].serviceDescription=transferDesc+"@"+surfaceType; // Copy service metadata and add surface type.
      let result=row.filter(word => word !==-1); // Result holds the positons of the variable in multi
      let pointer2=pointer1+1;  // pointer2 points to the multidimensional part in final_ESRI_Metadata
//  create the new multidimensional object (in this final_ESRI_Metadata)
      final_ESRI_Metadata[pointer2]={};
      final_ESRI_Metadata[pointer2].multidimensionalInfo={};
      final_ESRI_Metadata[pointer2].multidimensionalInfo.variables=[];
//  Note that p2 points to the original collection before being split by domain object
//  The result array holds the original index from new_ESRI_Metadata [result[0]] Given they must share the 
//  same surface description only need the first surface type hence index 0
      let surfaceTypeNew=new_ESRI_Metadata[p2].multidimensionalInfo.variables[result[0]].name;
      valueTextEnd=surfaceTypeNew.indexOf("@");
      surfaceTypeNew=surfaceTypeNew.slice(valueTextEnd,surfaceTypeNew.length);
//  Loop over  variables for this collection that share the same domain object
      for(var n = 0, mm=result.length; n < mm; n++){  
        let index=result[n];  // The position of the 
        let pete =new_ESRI_Metadata[p2].multidimensionalInfo.variables[index];
        let currentName=pete.name;
 //       pete.name=currentName+"_"+m;
        final_ESRI_Metadata[collectionCount*2+1].multidimensionalInfo.variables[n]=pete;
      };
      final_ESRI_Metadata[collectionCount*2].serviceDescription=rootServiceName+surfaceTypeNew+"_"+collectionCount;
      collectionCount++;
    console.log("interimCollectionCount",m);
    console.log("collectionCount",collectionCount);
  } // End of loop over each new collection
} // End of the loop over interim collections. 
let stringQ = JSON.stringify(final_ESRI_Metadata);
let fileName2 = "final_ESRI_Metadata";
fs.writeFileSync(fileName2, stringQ);

return final_ESRI_Metadata;
}  //  End of function
function deleteRow(arr, row) {
  arr = arr.slice(0); // make copy
  arr.splice(row - 1, 1);
  return arr;
}

export default reorderMetadata;

//  ********************************************************************************************
function createUniqueMatrix(esriMetadata,variableCollectionMap,surfaceDescriptionArray){
// **************** Create an array of surface types for each interim collection ****************
let numberOfVariablesInCollection:number=esriMetadata.multidimensionalInfo.variables.length;
for (let i = 0; i < numberOfVariablesInCollection; i++) {
  let description=esriMetadata.multidimensionalInfo.variables[i].name
  let pete=description.length;
  let indexDescription:number = description.indexOf("@")
  let indexFinish:number = pete-indexDescription;
  let surfaceDescription=description.slice(indexDescription+1,+pete);
  surfaceDescriptionArray[i]=surfaceDescription;
}
var matrixInterim= [];
for (let i = 0; i < numberOfVariablesInCollection; i++) {  //  Loop over each variable in the minicollection
  matrixInterim[i] = [];
  let description=surfaceDescriptionArray[i]  //  The surface type for that specific variable
  for (let j = 0; j < numberOfVariablesInCollection; j++) {   //  Loop over each surface type to find a match for a variable
    if (description==surfaceDescriptionArray[j]){ //  Does This variable description match the sfc type{ //  Does This variable description match the sfc type
      matrixInterim[i][j] = j;
    }
    else{
      matrixInterim[i][j] = -1;
    }
  }  // End of loop over surface types
}  // End Loop over each variable in the minicollection
var itemsFoundInterim = {};
for(var i = 0, l = matrixInterim.length; i < l; i++) { //  Loop over each row in the matrix
  var stringified = JSON.stringify(matrixInterim[i]); // Create a string for each row of the matrix
  if(itemsFoundInterim[stringified]) { continue;
  }
  variableCollectionMap.push(matrixInterim[i]);
  itemsFoundInterim[stringified] = true;
}
return variableCollectionMap;
}  // End of function