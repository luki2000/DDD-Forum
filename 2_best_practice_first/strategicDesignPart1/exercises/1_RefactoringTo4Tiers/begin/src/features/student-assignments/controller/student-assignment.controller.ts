import { Router, NextFunction, Request, Response } from 'express';
import { parseForResponse } from '../../../shared/utilities/helpers';
import { ErrorExceptionHandler } from '../../../shared/errors-and-exceptions/error-exception-handler';
import { AssignmentNotFoundException, StudentNotFoundException } from '../../../shared/errors-and-exceptions/exceptions';
import StudentAssignmentIdDto from '../view/student-assignment-id.dto';
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
        // this.router.post("/submit", (req, res, next) => this.submitAssignment(req, res, next));
        // this.router.post('/grade', (req, res, next) => this.gradeAssignment(req, res, next));
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
    /*
    private async getAllStudents(req: Request, res: Response, next: NextFunction) {
        try {
            const students = await this.studentService.getAllStudents();
            res.status(200).json({ error: undefined, data: parseForResponse(students), success: true });
        } catch (error) {
            next(error);
        }
    }

    private async getStudentById(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = StudentIdDto.fromRequest(req.params);
            const student = await this.studentService.getStudent(dto);
        
            if (!student) {
                throw new StudentNotFoundException;
            }
            res.status(200).json({ error: undefined, data: parseForResponse(student), success: true });
        } catch (error) {
            next(error);
        }
    }

    private async getAllStudentSubmittedAssignments(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = StudentIdDto.fromRequest(req.params);
            const student = await this.studentService.getStudent(dto);
    
            if (!student) {
                throw new StudentNotFoundException;
            }
    
            const studentAssignments = await this.studentService.getStudentAssignment(dto);
        
            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
        } catch (error) {
            next(error);
        }
    }

    private async getAllStudentGrades(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = StudentIdDto.fromRequest(req.params);
            const student = await this.studentService.getStudent(dto);
    
            if (!student) {
                throw new StudentNotFoundException;
            }
    
            const studentAssignments = await this.studentService.getStudentGrades(dto);
        
            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
        } catch (error) {
            next(error);
        }
    }*/
}

export default StudentAssignmentController;