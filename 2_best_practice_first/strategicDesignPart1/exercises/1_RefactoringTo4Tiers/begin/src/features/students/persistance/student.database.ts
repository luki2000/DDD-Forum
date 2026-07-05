import { PrismaClient } from "@prisma/client";

interface StudentPersistence {
    save(name: string): any;
    // getAll(): any;
    // getById(id: string): any;
    // getAssignments(id: string): any;
    // getGrades(id: string): any;
  }

class Database {
    public students: StudentPersistence;
    
    constructor(private readonly db: PrismaClient) {
        this.students = this.buildStudentPersistence();
    }

    private buildStudentPersistence(): StudentPersistence {
        return {
          save: this.saveStudent.bind(this),
         // getAll: this.getAllStudents,
         // getById: this.getStudentById,
         // getAssignments: this.getStudentAssignments,
         // getGrades: this.getStudentGrades,
        };
      }

    private async saveStudent(studentName: string) {
        return await this.db.student.create({
            data: {
                name: studentName
            }
        });
    }
}

export default Database;
