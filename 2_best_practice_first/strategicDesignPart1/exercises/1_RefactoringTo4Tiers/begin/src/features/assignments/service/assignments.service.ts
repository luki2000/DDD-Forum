import AssignmentsDatabase from '../persistance/assignments.database';
import Database from '../persistance/assignments.database';
import AssignmentIdDto from '../view/assignment-id.dto';
import CreateAssignmentDto from '../view/create-assignment.dto';

class AssignmentsService {
    constructor(private db: AssignmentsDatabase) {}

    async createAssignment(createAssignmentDto: CreateAssignmentDto) {
        return await this.db.assignment.createAssignment(createAssignmentDto.classId, createAssignmentDto.title);
    }

    async getAssignment(assignmentIdDto: AssignmentIdDto){
        return await this.db.assignment.getAssignment(assignmentIdDto.assignmentID);
    }

    
}

export default AssignmentsService;