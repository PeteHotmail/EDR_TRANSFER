export function validateMetadata(esriMetadata){
// This function ensures that any incomplete values in the esriMetadata are deleted. 
// A typical example would be the absence of a description propery in the variable object
let numberOfServices:number=esriMetadata.length; //  The number of collections
let collectionLength:number=numberOfServices/2;
var tempEsriMetadata=[];
for (let i = 0; i < collectionLength; i++) {  // Loop over each collection
    let p1:number= i*2;
    let p2:number= i*2+1;
      tempEsriMetadata[p1]=esriMetadata[p1]; //  Load the part1
      let collectionIdMultiObject = esriMetadata[p2]; // Part2 for each collection
      let variables=collectionIdMultiObject.multidimensionalInfo.variables;  //The variables object from part2
      let variableLoopLength:number=variables.length;  // Number of variables in this collection
      let varCount=0
      let variableMetadata=[];
      for (let k = 0; k < variableLoopLength; k++) {  // Loop over each variable in the collection.
        let description:string=collectionIdMultiObject.multidimensionalInfo.variables[k].description;
        if (description==undefined){
          console.log("We have a problem Houston");
          description="undefined";
        }
        if (description.includes('undefined')){
                console.log("We have a problem Houston");
        }
        else{
          variableMetadata[varCount]=variables[k];
          varCount++;
          console.log("Test");
        }
      } // end of the loop over variables in a given collection
      //  At this stage any variables without a description have been deleted. 
      
        tempEsriMetadata[p2]={};
        tempEsriMetadata[p2].multidimensionalInfo={};
        tempEsriMetadata[p2].multidimensionalInfo.variables=[];
        tempEsriMetadata[p2].multidimensionalInfo.variables=variableMetadata;
        console.log("We");
    }    //  Loop over each collection 
    // Need to check that all collectoins contain at least one variable. 
    let collectionCount:number=0;
    let tempEsriMetadata1=[];
    for (let i = 0; i < collectionLength; i++) {  // Loop over each collection
      let p1:number= i*2;
      let p2:number= i*2+1;
      let c1:number= collectionCount*2;
      let c2:number= collectionCount*2+1;
      let collectionIdMultiObject = tempEsriMetadata[p2];
      let description:string=collectionIdMultiObject.multidimensionalInfo.variables;
      let numberOfVariables:number=description.length;
      if (numberOfVariables!==0){
        tempEsriMetadata1[c1]=tempEsriMetadata[p1];
        tempEsriMetadata1[c2]=tempEsriMetadata[p2];
        collectionCount++;
      }
    }  // Loop over each collection

// iterates over array elements
return tempEsriMetadata1;
        console.log("time for a break")
}  //  end of function
export default validateMetadata