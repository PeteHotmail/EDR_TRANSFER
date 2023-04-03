interface MultidemisnionalParameter1 {
    variableName: string;
    dimensionName: string;
    values:number[]|number[][]|string[]|string[][];
    isSlice: boolean;
}
interface collectionIdObject{
    id:string;
    title:string;
    description:string;
    keywords:string[];
    links:string[];
    extent:extentType;
    data_queries:data_queriesType;
    crs:string[];
    ouput_formats:string[];
    parameter_names:parameterNameType;

};

interface parameterNameType{
    nameObject:{
        type:string;
        description:{en:string};
        unit:{label:{en:string},symbol:{value:string,type:string}};
        observedProperty:{
            id:string,
            label:{
                en:string
            }
        }
        measurementType:{
            method:string,
            period:string
        }
    }
}
interface parameterNameType2{
        type:string;
        description:{en:string};
        unit:{label:{en:string},symbol:{value:string,type:string}};
        observedProperty:{
            id:string,
            label:{
                en:string
            }
        }
        measurementType:{
            method:string,
            period:string
        }
    }



interface data_queriesType{
    position:positionType;
    radius:radiusType;
    area:areaType
}

interface radiusType{
    radius:{
        link:{
            href:string;
            hreflang:string;
            rel:string;
            variables:{
                title:string;
                description:string;
                query_type:string;
                output_formats:string[];
                default_output_format:string;
                within_limits:string[];
                crs_details:string[];
            };
        }

    }
};
interface areaType{
    area:{
        link:{
            href:string;
            hreflang:string;
            rel:string;
            variables:{
                title:string;
                description:string;
                query_type:string;
                output_formats:string[];
                default_output_format:string;
                within_limits:string[];
                crs_details:string[];
            };
        }

    }
};
interface positionType{
    position:{
        link:{
            href:string;
            hreflang:string;
            rel:string;
            variables:{
                title:string;
                description:string;
                query_type:string;
                output_formats:string[];
                default_output_format:string;
                crs_details:string[];
            };
        }

    }
};
interface extentType{
    spatial:{
        bbox:number[],
        crs:string
    },temporal:{
        interval:string[],
        trs:string
    },vertical?:{
        interval:string[],
        vrs:string 
    }
}
interface esriSampleDataType {
samples:[SampleType]
}
interface SampleType {
    location: {
        x:number;
        y:number;
        spatialReference:{wkid:number,latestWkid:number}
    };
    locationId: number;
    value:string;
    rasterId:number;
    resolution:number;
    attributes :attributeObjectType;
}



interface attributeObjectType {
    [someKey: string]: any;
    Variable:string;
    Dimensions:string
}

interface attributeObjectTypeOld {
    [name: string]: boolean | number | string;
    StdTime: number,
    StdTime_Max: number,
    StdPressure: number,
    StdPressure_Max: number,
    Variable1: string,
    Dimensions: string,
}

//         Definition of the covJson object

interface covJsonType {
    "type":string;
    "domain":domainType;
    parameters:parametersType;
    ranges:rangesType
}
interface domainType {
     "type":string;
     domainType:string;
     axes:{
        x:{values:number[]};
        y:{values:number[]};
        z?:{values:number[]}
        t:{values:number[]|string[]};
    };
     referencing:[][]
 }
interface referencingTypeXY{
    coordinates:[string,string]|[string],
    system:{
        type:string;
        id:string
    }
}

interface referencingTypeCal{
    coordinates:[string,string]|[string],
    system:{
        type:string;
        calendar:string
    }
}

interface referencingTypeZ{
    coordinates:[string,string]|[string],
    system:{
        type:string;
        cs:{
            csAxes:[{
                name:{
                    en:string,
                },
                direction:string,
                unit:{
                    symbol:string
                },
            }]
        }
    }
}
//  [name: string]: boolean | number | string
 interface parametersType{
    [parameterName: string]:{
        type:string,
        description:{en:string},
        unit:{
            label:{en:string},
            symbol:{value:string,type:string}},
            observedProperty:{id:string,label:{en:string}}
   }
 }
 

/*interface rangesType{
    [parameterName:string]:{type:string,
        dataType:string,
        values:number[]}
}
*/
interface rangesType{
    [parameterName:string]:{type:string,
        dataType:string,axisNames?:string[],shape?:number[],
        values:number[]}
}
export {
    collectionIdObject,
    esriSampleDataType,
    covJsonType,
    rangesType,
    parametersType,
    parameterNameType2,
    referencingTypeXY,
    referencingTypeCal,
    referencingTypeZ,
    SampleType
  }