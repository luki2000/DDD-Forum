import { PrismaClient } from '@prisma/client';
import CreateStudentDto from '../view/create-student.dto';
// retrieving resources
// dealing with resources being found, not found, in conflict
// passing off control to persistence
// returning or throwing exceptions (more on exceptions & errors later)
class StudentService {
    constructor(private readonly db: PrismaClient) {}

    async createStudent(student: CreateStudentDto) {
        return await this.db.student.create({
            data: {
                name: student.name
            }
        });
    }
}

export default StudentService;