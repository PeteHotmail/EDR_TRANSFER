export function reorderMetadata(esriMetadata){
  // The purpose of this function is to transoform the raw esriMetadata into collections.
  // The input data is simply a set of variables each with its own set of dimensions. The 
  // purpose of this function is to group variables that share a vertical dimension into groups
  // or collections.
  // Input object esriMetadata has two object properties the i.e the service metadata and then the 
  // multidimensional metadata order by each variable contained in the multidimensional object.
  // In this version only a simple esriMetadata is deconstructed i.e. it has only one service description.
  // The returned object will be ordered into collections. Each collection has two objects. The first
  // is the service metadata the second the multidimensional data.

  var fs = require('fs');
  var numberOfParameters:number=esriMetadata[1].multidimensionalInfo.variables.length;
    var matrix= [];
    var transfer;
    let iMax2 = numberOfParameters;
    let jMax2 = numberOfParameters;
    let count2 = 0;
    let surfaceDescriptionArray2=[];
    for (let i = 0; i < iMax2; i++) { // Create an array of surface types for each variable in esriMetadata 
        let description=esriMetadata[1].multidimensionalInfo.variables[i].name
        let pete=description.length;
        let indexDescription:number = description.indexOf("@")
        let indexFinish:number = pete-indexDescription;
        let surfaceDescription=description.slice(indexDescription+1,+pete);
        surfaceDescriptionArray2[i]=surfaceDescription;
    }

// Start of Alternative code
    let surfaceDescriptionArray3=[];
    for (let i = 0; i < iMax2; i++) { // Create an array of surface types for each variable in esriMetadata 
      let dimensionObject1=esriMetadata[1].multidimensionalInfo.variables[i].dimensions;
      surfaceDescriptionArray3[i]=JSON.stringify(dimensionObject1);
  }
    //  Create a 2D array that indicates which variables share the same surface description.

    for (let i = 0; i < iMax2; i++) {  //  Loop over each variable 
      matrix[i] = [];
      let description=JSON.stringify(esriMetadata[1].multidimensionalInfo.variables[i].dimensions);  //  The surface type for that specific variable
      for (let j = 0; j < jMax2; j++) {   //  Loop over each surface type to find a match for a variable
        let objectDescription=surfaceDescriptionArray3[j];
        if (description==objectDescription){ //  Does This variable description match the sfc type
          matrix[i][j] = j;
        }
        else{
        matrix[i][j] = -1;
        }
      }
    }
// End of alternative code

    //  Create a 2D array that indicates which variables share the same surface description.
    //  End of 
/*
    for (let i = 0; i < iMax2; i++) {  //  Loop over each variable 
      matrix[i] = [];
      let description=surfaceDescriptionArray2[i]  //  The surface type for that specific variable
      for (let j = 0; j < jMax2; j++) {   //  Loop over each surface type to find a match for a variable
        if (description==surfaceDescriptionArray2[j]){ //  Does This variable description match the sfc type
          matrix[i][j] = j;
        }
        else{
        matrix[i][j] = -1;
        }
      }
    }
*/
    //
    var uniques = [];
    var itemsFound = {};
  // Get rid of duplicate rows, but are they?
    for(var i = 0, l = matrix.length; i < l; i++) {
        var stringified = JSON.stringify(matrix[i]); // Create a string for each row of the matrix
        if(itemsFound[stringified]) { continue; }
        uniques.push(matrix[i]);
        itemsFound[stringified] = true;
    }
  // ItemsFound is an object 
    let row2=[];
    let new_ESRI_Metadata=[];
    let variables=[];
  // The uniques is an array with a row for each surface type that his shared by all variables
  // The columns hold the index of the variables array held in multidimensional object.
    var ServiceDescription=esriMetadata[0].serviceDescription; // adding p1 instead of 0
    for(var i = 0, l = uniques.length; i < l; i++) { //  Loop over collection
      let row=uniques[i];
      let p1=i*2
      let p2=p1+1  //  The p2 counts through the multidimensional metadata for each collection.

      const transfer = JSON.parse(JSON.stringify(esriMetadata[0]));
      let transferDesc=transfer.serviceDescription;
      new_ESRI_Metadata[p1]=transfer;  //  Copy across the service metadata.
      let surfaceType=surfaceDescriptionArray2[i];
      new_ESRI_Metadata[p1].serviceDescription=transferDesc+"@"+surfaceType;  //  Copy across the service metadata.
      let result=row.filter(word => word !==-1); // Result holds the positons of the variable in multi

      new_ESRI_Metadata[p2]={};
      new_ESRI_Metadata[p2].multidimensionalInfo={};
      new_ESRI_Metadata[p2].multidimensionalInfo.variables=[];
        for(var m = 0, mm=result.length; m < mm; m++){ //  Loop over the variables in the 
            let index=result[m];
            let pete =esriMetadata[1].multidimensionalInfo.variables[index];
            new_ESRI_Metadata[p2].multidimensionalInfo.variables[m]=pete;
        };
    }  //  loop over multidimensionallet


    console.log("new_ESRI_Metadata");

let stringP = JSON.stringify(new_ESRI_Metadata);
let fileName = "new_ESRI_Metadata";
fs.writeFileSync(fileName, stringP);
//  Now need to check for each interim collection

//  Create the surface types for each interim collection.

let numberOfVariables:number=new_ESRI_Metadata[7].multidimensionalInfo.variables.length;
let surfaceDescriptionArrayInterim=[];
for (let i = 0; i < numberOfVariables; i++) { // Create an array of surface types for each variable in esriMetadata 
  let description=new_ESRI_Metadata[3].multidimensionalInfo.variables[i].name
  let pete=description.length;
  let indexDescription:number = description.indexOf("@")
  let indexFinish:number = pete-indexDescription;
  let surfaceDescription=description.slice(indexDescription+1,+pete);
  surfaceDescriptionArrayInterim[i]=surfaceDescription;
}
var matrixInterim= [];
for (let i = 0; i < numberOfVariables; i++) {  //  Loop over each variable in the minicollection
  matrixInterim[i] = [];
  let description=surfaceDescriptionArrayInterim[i]  //  The surface type for that specific variable
  for (let j = 0; j < numberOfVariables; j++) {   //  Loop over each surface type to find a match for a variable
    if (description==surfaceDescriptionArrayInterim[j]){ //  Does This variable description match the sfc type{ //  Does This variable description match the sfc type
      matrixInterim[i][j] = j;
    }
    else{
      matrixInterim[i][j] = -1;
    }
  }
}
var uniquesInterim = [];
var itemsFoundInterim = {};
// Get rid of duplicate rows, but are they?
for(var i = 0, l = matrixInterim.length; i < l; i++) {
    var stringified = JSON.stringify(matrixInterim[i]); // Create a string for each row of the matrix
    if(itemsFoundInterim[stringified]) { continue;
    }
      uniquesInterim.push(matrixInterim[i]);
      itemsFoundInterim[stringified] = true;
}
let numberOfNewCollections=uniquesInterim.length;
// Effectively the one collection is now three collections (in this example) and new_ESRI_Metadata needs to be updated


let activities = [
  ['Work', 9,6],
  ['Eat', 1,8],
  ['Commute', 2, 56],
  ['Play Game', 1,5],
  ['Sleep', 7,3]
];

console.log(activities[0][0]);
console.log(activities[0][1]);
console.log(activities[0][2]);
console.table(activities);
//  activities.splice(1, 0, ['Programming', 2, 9])
console.table(activities);
activities.splice(3,1);

return new_ESRI_Metadata;
}  //  End of function
function deleteRow(arr, row) {
  arr = arr.slice(0); // make copy
  arr.splice(row - 1, 1);
  return arr;
}
export default reorderMetadata;