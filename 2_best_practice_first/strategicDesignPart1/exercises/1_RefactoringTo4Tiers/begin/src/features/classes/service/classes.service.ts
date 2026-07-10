import ClassesDatabase from "../persistance/classes.database";
import ClassIdDto from "../view/class-id.dto";

class ClassesService {
    constructor(private db: ClassesDatabase) {}

    async getClassById(ClassIdDto: ClassIdDto) {
        return await this.db.classes.getClassById(ClassIdDto.classId);
    }

    async getAllAssignmentsByClassId(ClassIdDto: ClassIdDto){
        return await this.db.classes.getAssignmentsByClassId(ClassIdDto.classId);
    }
}

export default ClassesService;