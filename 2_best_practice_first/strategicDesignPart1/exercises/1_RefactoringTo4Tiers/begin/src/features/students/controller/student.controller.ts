import { Router, NextFunction, Request, Response } from 'express';
import { parseForResponse } from '../../../shared/utilities/helpers';
import StudentService from '../service/student.service';
import { ErrorExceptionHandler } from '../../../shared/errors-and-exceptions/error-exception-handler';
import CreateStudentDto from '../view/create-student.dto';
import StudentIdDto from '../view/student-id.dto';
import { StudentNotFoundException } from '../../../shared/errors-and-exceptions/exceptions';


class StudentController {
    private router: Router;
    constructor(
        private readonly studentService: StudentService,
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
    // baseUrl will be /students
    private routes() {
        this.router.post("/", (req, res, next) => this.createStudent(req, res, next));
        this.router.get("/", (req, res, next) => this.getAllStudents(req, res, next));
        this.router.get('/:id',(req, res, next) => this.getStudentById(req, res, next));
        this.router.get('/:id/assignments', (req, res, next) => this.getAllStudentSubmittedAssignments(req, res, next));
        this.router.get('/:id/grades', (req, res, next) => this.getAllStudentGrades(req, res, next))
    }
    
    private async createStudent(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = CreateStudentDto.fromRequest(req.body);
            const student = await this.studentService.createStudent(dto);
            res.status(201).json({ error: undefined, data: parseForResponse(student), success: true });
        } catch (error) {
            next(error);
        }
    }

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
    }
}

export default StudentController;