import { PrismaClient } from "@prisma/client";

interface AssignmentsPersistence {
    createAssignment(classId: string, title: string): any;
    getAssignment(id: string): any;
}

class AssignmentsRepository implements AssignmentsPersistence {
    constructor(private readonly db: PrismaClient) {}

    async createAssignment(classId: string, title: string) {
        return await this.db.assignment.create({
            data: {
                classId,
                title
            }
        })
    }

    async getAssignment(id: string) {
        return await this.db.assignment.findUnique({
            include: {
                class: true,
                studentTasks: true
            },
            where: {
                id
            }
        });
    }
}

class AssignmentsDatabase {
    public readonly assignment: AssignmentsPersistence;

    constructor(private readonly db: PrismaClient) {
        this.assignment = new AssignmentsRepository(db);
    }
}

export default AssignmentsDatabase;
