import { InvalidRequestBodyException } from "../../../shared/errors-and-exceptions/exceptions";
import { isMissingKeys } from "../../../shared/utilities/helpers";

class StudentAssignmentIdDto {
    constructor(public studentId: string, public assignmentId: string) {}

    static fromRequest(body: unknown) {
       const requiredKeys = ['studentId', 'assignmentId'];
       const isRequestValid = 
            body 
            && typeof body === 'object' 
            && !isMissingKeys(body, requiredKeys) 
       if(!isRequestValid) {
            throw new InvalidRequestBodyException(requiredKeys);
       }
       const { studentId, assignmentId } = body as { studentId: string, assignmentId: string };
       return new StudentAssignmentIdDto(studentId, assignmentId);
    }
}

export default StudentAssignmentIdDto;
