import { Router, NextFunction, Request, Response } from 'express';
import { parseForResponse } from '../../../shared/utilities/helpers';
import { ErrorExceptionHandler } from '../../../shared/errors-and-exceptions/error-exception-handler';
import { AssignmentNotFoundException, StudentAssignmentNotFoundException, StudentNotFoundException } from '../../../shared/errors-and-exceptions/exceptions';
import StudentAssignmentIdDto from '../view/student-assignment-id.dto';
import SubmitStudentAssignmentDto from '../view/submit-student-assignment.dto';
import AssignmentGradeIdDto from '../view/grade-assignment.dto';
import AssignmentsService from '../../assignments/service/assignments.service';
import AssignmentIdDto from '../../assignments/view/assignment-id.dto';
import StudentService from '../../students/service/student.service';
import StudentIdDto from '../../students/view/student-id.dto';
import StudentAssignmentService from '../service/student-assignment.service';


class StudentAssignmentController {
    private router: Router;
    constructor(
        private readonly studentService: StudentService,
        private readonly assignmentsService: AssignmentsService,
        private readonly studentAssignmentService: StudentAssignmentService,
        private readonly errorExceptionHandler: ErrorExceptionHandler) {
            this.router = Router();
            this.routes();
            this.setupErrorHandler();
        }

    getRouter() {
        return this.router;
    }
    
    private setupErrorHandler() {
        this.router.use(this.errorExceptionHandler.handle);
    }
    // baseUrl will be /student-assignement
    private routes() {
        this.router.post("/", (req, res, next) => this.addAssignmentToStudent(req, res, next));
        this.router.post("/submit", (req, res, next) => this.submitAssignment(req, res, next));
        this.router.post('/grade', (req, res, next) => this.gradeAssignment(req, res, next));
    }
    
    private async addAssignmentToStudent(req: Request, res: Response, next: NextFunction) {
        try {

            const dto = StudentAssignmentIdDto.fromRequest(req.body);

            const student = await this.studentService.getStudent(
                StudentIdDto.fromRequest({ id: dto.studentId })
            );

            if (!student) {
                throw new StudentNotFoundException;
            }

            const assignment = await this.assignmentsService.getAssignment(
                AssignmentIdDto.fromRequest({ id: dto.assignmentId })
            );

            if (!assignment) {
                throw new AssignmentNotFoundException;
            }

            const studentAssignment = await this.studentAssignmentService.assignAssignment(dto);

            res.status(201).json({ error: undefined, data: parseForResponse(studentAssignment), success: true });
        } catch (error) {
            next(error);
        }
    
    }
    
    private async submitAssignment(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = SubmitStudentAssignmentDto.fromRequest(req.body);

            const studentAssignment = await this.studentAssignmentService.getStudentAssignmentById(dto.id);
    
            if (!studentAssignment) {
                throw new StudentAssignmentNotFoundException;
            }
    
            const studentAssignmentUpdated = await this.studentAssignmentService.submitAssignment(dto.id);
    
            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
        } catch (error) {
            next(error);
        }
    }


    private async gradeAssignment(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = AssignmentGradeIdDto.fromRequest(req.body);

            const studentAssignment = await this.studentAssignmentService.getStudentAssignmentById(dto.assignmentId);

            if (!studentAssignment) {
                throw new StudentAssignmentNotFoundException;
            }

            const studentAssignmentUpdated = await this.studentAssignmentService.getStudentGrades(dto.assignmentId, dto.grade);

            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
        } catch (error) {
            next(error);
        }
    }
}

export default StudentAssignmentController;