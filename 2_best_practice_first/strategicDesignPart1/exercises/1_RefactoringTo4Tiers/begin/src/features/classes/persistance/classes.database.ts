import { PrismaClient } from "@prisma/client";

interface ClassesPersistence {
    getClassById(id: string): any;
    getAssignmentsByClassId(classId: string): any;
}

class ClassesRepository implements ClassesPersistence {
    constructor(private readonly db: PrismaClient) {}

    async getClassById(id: string) {
        return await this.db.class.findUnique({
            where: {
                id
            }
        });
    }

    async getAssignmentsByClassId(classId: string) {
        return await this.db.assignment.findMany({
            where: {
                classId,
            },
            include: {
                class: true,
                studentTasks: true
            }
        });
    }
}

class ClassesDatabase {
    public readonly classes: ClassesPersistence;

    constructor(private readonly db: PrismaClient) {
        this.classes = new ClassesRepository(db);
    }
}

export default ClassesDatabase;
