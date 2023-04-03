
interface IsValidResponse {
    valid: boolean;
    keys: string[];
}

/**
 * A class responsible for validating input params
 */
class Validation {

    /**
     * validates that the input has the required keys
     * returns false if key is not in object.
     * @param input 
     * @param params 
     */
    static isValid(input: object, requiredParams: string[]): IsValidResponse {
        const keys: string[] = [];
        const valid = false;
        const response: IsValidResponse = {valid, keys};

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
        }

        return response;
    }

}

export default Validation;