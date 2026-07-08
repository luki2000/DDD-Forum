import { InvalidRequestBodyException } from "../../../shared/errors-and-exceptions/exceptions";
import { isMissingKeys, isUUID } from "../../../shared/utilities/helpers";

class StudentIdDto {
    constructor(public id: string) {}

    static fromRequest(params: unknown) {
       const requiredKeys = ['id'];
       const isRequestValid = 
            params 
            && typeof params === 'object' 
            && !isMissingKeys(params, requiredKeys) 
            && isUUID((params as { id: string }).id);
       if(!isRequestValid) {
            throw new InvalidRequestBodyException(requiredKeys);
       }
       const {id} = params as { id: string };
       return new StudentIdDto(id);
    }
}

export default StudentIdDto;
