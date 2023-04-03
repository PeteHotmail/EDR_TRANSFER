import { Router } from "express";

interface RouteBaseInterface {
    protocol: string;
    target: string;
    route: Router ;
    isValidQuery(input: object, requiredParams: string[]): any;
}


class RouteBase implements RouteBaseInterface {
    protocol: string;
    target: string;
    route: Router ;

    /**
     * validates that the input has the required keys
     * returns false if key is not in object.
     * @param input 
     * @param params 
     */
    isValidQuery(input: object, requiredParams: string[]): any {
        const keys: string[] = [];
        const valid = false;
        const response = {valid, keys};

        // look over input and push any keys which are missing
        // to an array. 
        for (const param of requiredParams) {
            if (!(param in input)){
                keys.push(param);
            }
        }

        // if there are no missing keys return "isValid" = true
        if (keys.length <= 0) {
            response.valid = true;
        } else {
            throw (new Error("Missing required parameters - " + response.keys));
        }
    }


}

export default RouteBase;