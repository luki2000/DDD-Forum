import StudentAssignmentDatabase from '../persistance/student-assignment.database';
import StudentAssignmentIdDto from '../view/student-assignment-id.dto';

class StudentAssignmentService {
    constructor(private db: StudentAssignmentDatabase) {}

    async assignAssignment(studentAssignmentIdDto: StudentAssignmentIdDto){
        return await this.db.studentAssignment.assignAssignment(studentAssignmentIdDto.studentId, studentAssignmentIdDto.assignmentId);
    }

    async getStudentAssignmentById(id: string){
        return await this.db.studentAssignment.getStudentAssignmentById(id);
    }

    async submitAssignment(id: string){
        return await this.db.studentAssignment.submitAssignment(id);
    }

    async getStudentGrades(id: string, grade: string) {
        return await this.db.studentAssignment.gradeAssignment(id, grade);
    }
}

export default StudentAssignmentService;