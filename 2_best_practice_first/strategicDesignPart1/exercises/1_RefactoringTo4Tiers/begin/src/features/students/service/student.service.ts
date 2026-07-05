import Database from '../persistance/student.database';
import CreateStudentDto from '../view/create-student.dto';
// retrieving resources
// dealing with resources being found, not found, in conflict
// passing off control to persistence
// returning or throwing exceptions (more on exceptions & errors later)
class StudentService {
    constructor(private db: Database) {}

    async createStudent(student: CreateStudentDto) {
        return await this.db.students.save(student.name);
    }
}

export default StudentService;