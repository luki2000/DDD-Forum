import { PrismaClient } from "@prisma/client";

interface StudentPersistence {
    save(name: string): any;
    // getAll(): any;
    // getById(id: string): any;
    // getAssignments(id: string): any;
    // getGrades(id: string): any;
}

class StudentRepository implements StudentPersistence {
    constructor(private readonly db: PrismaClient) {}

    async save(name: string) {
        return await this.db.student.create({
            data: {
                name
            }
        });
    }
}

class Database {
    public readonly students: StudentPersistence;

    constructor(db: PrismaClient) {
        this.students = new StudentRepository(db);
    }
}

export default Database;
