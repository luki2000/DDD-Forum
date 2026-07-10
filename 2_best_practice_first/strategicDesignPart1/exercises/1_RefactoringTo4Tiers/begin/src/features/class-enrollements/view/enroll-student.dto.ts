import { InvalidRequestBodyException } from "../../../shared/errors-and-exceptions/exceptions";
import { isMissingKeys } from "../../../shared/utilities/helpers";

class EnrollStudentDto {
    constructor(public studentId: string, public classId: string) {}

    static fromRequest(body: unknown) {
       const requiredKeys = ['studentId', 'classId'];
       const isRequestValid = 
            body 
            && typeof body === 'object' 
            && !isMissingKeys(body, requiredKeys) 
       if(!isRequestValid) {
            throw new InvalidRequestBodyException(requiredKeys);
       }
       const { studentId, classId } = body as { studentId: string, classId: string };
       return new EnrollStudentDto(studentId, classId);
    }
}

export default EnrollStudentDto;
