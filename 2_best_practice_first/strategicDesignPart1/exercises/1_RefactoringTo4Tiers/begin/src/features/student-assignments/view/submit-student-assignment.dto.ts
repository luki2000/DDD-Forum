import { InvalidRequestBodyException } from "../../../shared/errors-and-exceptions/exceptions";
import { isMissingKeys, isUUID } from "../../../shared/utilities/helpers";

class SubmitStudentAssignmentDto {
    constructor(public id: string) {}

    static fromRequest(body: unknown) {
       const requiredKeys = ['id'];
       const isRequestValid = 
            body 
            && typeof body === 'object' 
            && !isMissingKeys(body, requiredKeys) 
            && isUUID((body as { id: string }).id);
       if(!isRequestValid) {
            throw new InvalidRequestBodyException(requiredKeys);
       }
       const { id } = body as { id: string };
       return new SubmitStudentAssignmentDto(id);
    }
}

export default SubmitStudentAssignmentDto;
