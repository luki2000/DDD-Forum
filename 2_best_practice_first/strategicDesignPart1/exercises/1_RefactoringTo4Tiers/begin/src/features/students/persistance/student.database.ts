import { PrismaClient } from "@prisma/client";

interface StudentPersistence {
    save(name: string): any;
    getAll(): any;
    getById(id: string): any;
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

    async getAll() {
        return await this.db.student.findMany({
            include: {
                classes: true,
                assignments: true,
                reportCards: true
            }, 
            orderBy: {
                name: 'asc'
            }
        });
    }

    async getById(id: string) {
        return await this.db.student.findUnique({
            where: {
                id
            },
            include: {
                classes: true,
                assignments: true,
                reportCards: true
            }
        });
    }
}

class Database {
    public readonly students: StudentPersistence;

    constructor(private readonly db: PrismaClient) {
        this.students = new StudentRepository(db);
    }
}

export default Database;
