import { InvalidGradeException, InvalidRequestBodyException } from "../../../shared/errors-and-exceptions/exceptions";
import { isMissingKeys } from "../../../shared/utilities/helpers";

const VALID_GRADES = ['A', 'B', 'C', 'D'] as const;

class AssignmentGradeIdDto {
    constructor(public assignmentId: string, public grade: string) {}

    static fromRequest(body: unknown) {
       const requiredKeys = ['assignmentId', 'grade'];

       if (!body || typeof body !== 'object' || isMissingKeys(body, requiredKeys)) {
            throw new InvalidRequestBodyException(requiredKeys);
       }

       const { assignmentId, grade } = body as { assignmentId: string; grade: string };

       if (!VALID_GRADES.includes(grade as typeof VALID_GRADES[number])) {
            throw new InvalidGradeException();
       }

       return new AssignmentGradeIdDto(assignmentId, grade);
    }
}

export default AssignmentGradeIdDto;
