import { Router, NextFunction, Request, Response } from 'express';
import { parseForResponse } from '../../../shared/utilities/helpers';
import { ErrorExceptionHandler } from '../../../shared/errors-and-exceptions/error-exception-handler';
import { ClassNotFoundException, StudentAlreadyEnrolledException, StudentNotFoundException } from '../../../shared/errors-and-exceptions/exceptions';
import StudentService from '../../students/service/student.service';
import ClassEnrollementsService from '../service/class-enrollements.service';
import EnrollStudentDto from '../view/enroll-student.dto';
import ClassesService from '../../classes/service/classes.service';


class ClassEnrollementsController {
    private router: Router;
    constructor(
        private readonly classesService: ClassesService,
        private readonly studentService: StudentService,
        private readonly classEnrollementService: ClassEnrollementsService, 
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
    // baseUrl will be /classes-enrollements
    private routes() {
       this.router.get('/', (req, res, next) => this.enrollStudent(req, res, next));
    }    

    private async enrollStudent(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = EnrollStudentDto.fromRequest(req.params);
            const student = await this.studentService.getStudent(dto);
    
            if (!student) {
                throw new StudentNotFoundException;
            }
            const cls = await this.classesService.getClassById({classId: dto.classId})
            
            if(!cls) {
                throw new ClassNotFoundException(dto.classId);
            }

            const duplicatedClassEnrollment = await this.classEnrollementService.getStudentInClass(dto.studentId,dto.classId);

            if(duplicatedClassEnrollment) {
                throw new StudentAlreadyEnrolledException;
            }

            const classEnrollment = await this.classEnrollementService.enrollStudentToClass(dto.studentId, dto.classId);

            res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
        } catch (error) {
            next(error);
        }
    }
}

export default ClassEnrollementsController;