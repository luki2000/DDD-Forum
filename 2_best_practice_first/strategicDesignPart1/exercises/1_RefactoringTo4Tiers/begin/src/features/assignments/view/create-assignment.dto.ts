import { InvalidRequestBodyException } from "../../../shared/errors-and-exceptions/exceptions";
import { isMissingKeys } from "../../../shared/utilities/helpers";

class CreateAssignmentDto {
    constructor(public classId: string, public title: string) {}

    static fromRequest(body: unknown) {
       const requiredKeys = ['classId', 'title'];
       const isRequestValid = 
            body 
            && typeof body === 'object' 
            && !isMissingKeys(body, requiredKeys) 
       if(!isRequestValid) {
            throw new InvalidRequestBodyException(requiredKeys);
       }
       const { classId, title } = body as { classId: string, title: string };
       return new CreateAssignmentDto(classId, title);
    }
}

export default CreateAssignmentDto;
