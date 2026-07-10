import express, { Express } from 'express';
import StudentController from './features/students/controller/student.controller';
import AssignmentsController from './features/assignments/controller/assignments.controller';
import StudentAssignmentController from './features/student-assignments/controller/student-assignment.controller';
import ClassesController from './features/classes/controller/classes.controller';
import ClassEnrollementsController from './features/class-enrollements/controller/class-enrollements.controller';
const cors = require('cors');

class Server {
    private app: Express;

    constructor(
        private readonly studentController: StudentController,
        private readonly assignmentsController: AssignmentsController,
        private readonly studentAssignmentController: StudentAssignmentController,
        private readonly classesController: ClassesController,
        private readonly classEnrollementsController: ClassEnrollementsController) {
            this.app = express();
            this.setupMiddleware();
            this.setupRoutes();
    }

    private setupMiddleware() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    private setupRoutes() {
        this.app.use('/students', this.studentController.getRouter());
        this.app.use('/assignments', this.assignmentsController.getRouter());
        this.app.use('/student-assignments', this.studentAssignmentController.getRouter());
        this.app.use('/classes', this.classesController.getRouter());
        this.app.use('/class-enrollements', this.classEnrollementsController.getRouter());
    }

    start(port: number) {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

export default Server;
