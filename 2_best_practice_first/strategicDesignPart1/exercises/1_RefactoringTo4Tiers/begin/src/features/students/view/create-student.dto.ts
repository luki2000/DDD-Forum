import { isMissingKeys } from "../../../shared/utilities/helpers";

class CreateStudentDto {
    constructor(public name: string) {}

    static fromRequest(body: unknown) {
        const requiredKeys = ['name'];
       const isRequestValid = !body || typeof body !== 'object' || isMissingKeys(body, requiredKeys);
       if(isRequestValid) {
        throw new Error('Invalid request');
       }
       const { name } = body as { name: string };
       return new CreateStudentDto(name);
    }
}

export default CreateStudentDto;