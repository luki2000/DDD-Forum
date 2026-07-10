import StudentDatabase from '../persistance/student.database';
import CreateStudentDto from '../view/create-student.dto';
import StudentIdDto from '../view/student-id.dto';

class StudentService {
    constructor(private db: StudentDatabase) {}

    async createStudent(student: CreateStudentDto) {
        return await this.db.students.save(student.name);
    }

    async getAllStudents(){
        return await this.db.students.getAll();
    }

    async getStudent(student: StudentIdDto){
        return await this.db.students.getById(student.studentId);
    }

    async getStudentAssignment(student: StudentIdDto){
        return await this.db.students.getAssignments(student.studentId);
    }

    async getStudentGrades(student: StudentIdDto){
        return await this.db.students.getGrades(student.studentId);
    }
}

export default StudentService;