import { PrismaClient } from "@prisma/client";

interface ClassEnrollementsPersistence {
    enrollStudentToClass(studentId: string, classId: string): any;
    getStudentInClass(studentId: string, classId: string): any;
}

class ClassEnrollementRepository implements ClassEnrollementsPersistence {
    constructor(private readonly db: PrismaClient) {}

    async getStudentInClass(studentId: string, classId: string) {
        return await this.db.classEnrollment.findFirst({
            where: {
                studentId,
                classId
            }
        });
    }

    async enrollStudentToClass(studentId: string, classId: string) {
        return await this.db.classEnrollment.create({
            data: {
                studentId,
                classId
            }
        });
    }
}

class ClassEnrollementsDatabase {
    public readonly ClassEnrollements: ClassEnrollementsPersistence;

    constructor(private readonly db: PrismaClient) {
        this.ClassEnrollements = new ClassEnrollementRepository(db);
    }
}

export default ClassEnrollementsDatabase;
