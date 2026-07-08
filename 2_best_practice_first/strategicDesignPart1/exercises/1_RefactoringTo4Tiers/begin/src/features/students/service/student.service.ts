import Database from '../persistance/student.database';
import CreateStudentDto from '../view/create-student.dto';
import StudentIdDto from '../view/student-id.dto';

class StudentService {
    constructor(private db: Database) {}

    async createStudent(student: CreateStudentDto) {
        return await this.db.students.save(student.name);
    }

    async getAllStudents(){
        return await this.db.students.getAll();
    }

    async getStudent(student: StudentIdDto){
        return await this.db.students.getById(student.id);
    }

    async getStudentAssignment(student: StudentIdDto){
        return await this.db.students.getById(student.id);
    }
}

export default StudentService;