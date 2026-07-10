import ClassEnrollementsDatabase from "../persistance/class-enrollements.database";

class ClassEnrollementsService {
    constructor(private db: ClassEnrollementsDatabase) {}

    async enrollStudentToClass(studentId: string, classId: string) {
        return await this.db.ClassEnrollements.enrollStudentToClass(studentId, classId)
    }

    async getStudentInClass(studentId: string, classId: string){
        return await this.db.ClassEnrollements.getStudentInClass(studentId, classId);
    }
}

export default ClassEnrollementsService;