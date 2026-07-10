import { PrismaClient } from "@prisma/client";

interface StudentAssignmentPersistence {
    assignAssignment(studentId: string, assignmentId: string): any
    getStudentAssignmentById(id: string): any;
    submitAssignment(id: string): any;
    gradeAssignment(id: string, grade: string): any
}

class StudentAssignmentRepository implements StudentAssignmentPersistence {
    constructor(private readonly db: PrismaClient) {}

    async assignAssignment(studentId: string, assignmentId: string) {
        return await this.db.studentAssignment.create({
            data: {
                studentId,
                assignmentId,
            }
        });
    }

    async getStudentAssignmentById(id: string) {
        return await this.db.studentAssignment.findUnique({
            where: {
                id,
            }
        });
    }

    async submitAssignment(id: string) {
        return await this.db.studentAssignment.update({
			where: {
				id
			},
			data: {
				status: 'submitted'
			}
		});
    }

    async gradeAssignment(id: string, grade: string) {
        return await this.db.studentAssignment.update({
            where: {
                id
            },
            data: {
                grade,
            }
        });
    }
}

class StudentAssignmentDatabase {
    public readonly studentAssignment: StudentAssignmentPersistence;

    constructor(private readonly db: PrismaClient) {
        this.studentAssignment = new StudentAssignmentRepository(db);
    }
}

export default StudentAssignmentDatabase;
