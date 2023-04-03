
// Routine ImageServer
// Invoked from the module position/
// This builds the Mosaic Rule that is part of the ImageServer request
// The returned rule is an object
/** interface for Multidemisnional Parameter used in definition */
//  Use the appropriatea interface either for a set of values or a range of values that need a 2D array.


interface MultidemisnionalParameter1 {
    variableName: string;
    dimensionName: string;
    values:number[]|number[][]|string[]|string[][];
    isSlice: boolean;
}
const dateAS = import('date-and-time');
/** a representation of a mosiac rule used in image server */
class MosaicRule {  // Only used in this module and called by Mosaic

    mosaicMethod = "esriMosaicNone";
    sortField = "*";
    ascending = true;
    mosaicOperation = "MT_FIRST"
    multidimensionalDefinition: Array<MultidemisnionalParameter1>;  // Interface Array

    constructor (multidimensionalDefinition1: Array<MultidemisnionalParameter1>,level_Hierarchy:boolean) {  // mdp array is an argument
        this.multidimensionalDefinition = multidimensionalDefinition1;
        this.ascending=level_Hierarchy
    }
}


/** represets a mosaic and is used as a builder */
//  This invoked from Position etc as the buildURL method in CLASS Route (defined in Position)
class Mosaic {
    static createMosaicRule (rawCollectionIdObject,parametername: string[],time:string[],z:string[],crs:string): MosaicRule {
        const mdpArray: MultidemisnionalParameter1[] = [];
        var numberOfDimensions=rawCollectionIdObject[1].multidimensionalInfo.variables[0].dimensions.length
        if(numberOfDimensions>1){
            var temp1=rawCollectionIdObject[1].multidimensionalInfo.variables[0].dimensions[0].name
            var temp2=rawCollectionIdObject[1].multidimensionalInfo.variables[0].dimensions[1].name
            if(temp1=="StdTime"){
                var timeDimensionName:string=temp1;
                var verticalDimensionName:string=temp2;
            }
            else{
                var timeDimensionName:string=temp2;;
                var verticalDimensionName:string=temp1;
            }
        }
        else{
            var timeDimensionName:string=rawCollectionIdObject[1].multidimensionalInfo.variables[0].dimensions[0].name;
        }

//  Need to work out the dimension names.
        if (time[0].includes('/'))
        {
        var timeRange:boolean=true; 
        }
        else{
            var timeRange:boolean=false
        }

        if (!timeRange) {  //  Time is deliminated list
            var timeValue:string[]=[];
            for (let i = 0; i < time.length; i++) {
                timeValue[i]=time[i];
            }
            var timeValueNum:number[]=[];
            timeValueNum=timeValue.map(isoTime);
            const mdpT: MultidemisnionalParameter1 = {
                variableName: parametername[0],
                dimensionName: "StdTime",
                values: timeValueNum,
                isSlice: false
            };
            mdpArray.push(mdpT);
        }
        else {  //  There is a time range
            const timeArray: string[] = time[0].split("/");
            var timeRangeNum:number[][]=[];
            timeRangeNum[0]=timeArray.map(isoTime);
            const mdpT: MultidemisnionalParameter1 = {
                variableName: parametername[0],
                dimensionName: timeDimensionName,
                values: timeRangeNum,
                isSlice: false
            };
            mdpArray.push(mdpT);
        }  

        if (!(z[0]===undefined)) {  //  Is there a z dimension?
            if (z[0].includes('/')){
                var zRrange:boolean=true; 
        }
        else {
                var zRrange:boolean=false;  // No z dimension
        }

        if (zRrange) {
            var zValueRange:string[][]=[];
            zValueRange[0]=[];
            const zArray: string[] = z[0].split("/");
    //  Note that the zvalues for a range must go from low to high
            let temp1:number=+zArray[0]
            let temp2:number=+zArray[1]
            if((temp1 < temp2) ){
 //           if((zArray[0] < zArray[1]) ){
                var whichWayUp:boolean=true; // Ascending
                zValueRange[0][0]=zArray[0];
                zValueRange[0][1]=zArray[1];
            }
            else{
                var whichWayUp:boolean=false;
                zValueRange[0][0]=zArray[1];
                zValueRange[0][1]=zArray[0];
            };

            const mdpZ: MultidemisnionalParameter1 = {
                variableName: parametername[0],
                dimensionName: verticalDimensionName,
                values: zValueRange,
                isSlice: false
            };
            mdpArray.push(mdpZ);
        }  
            else {
                var zValue:string[]=[];
                for (let i = 0; i < z.length; i++) {
                    zValue[i]=z[i];
                }
                const mdpZ: MultidemisnionalParameter1 = {
                    variableName: parametername[0],
                    dimensionName: verticalDimensionName,
                    values: zValue,
                    isSlice: false
                };
            mdpArray.push(mdpZ);
            }  //  End of the if(zRange if block)
        } // End of  "if (!(z[0]===undefined)"
        const rule = new MosaicRule(mdpArray,whichWayUp);
        return rule;
        function isoTime(pete)
        {
            let epochTime:number;
            return epochTime=new Date(pete).getTime();
        }
    }  //  End of static method.
}   //  End of Class declaration
export default Mosaic;
export {Mosaic, MosaicRule}; 