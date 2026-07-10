import { Router, NextFunction, Request, Response } from 'express';
import { parseForResponse } from '../../../shared/utilities/helpers';
import { ErrorExceptionHandler } from '../../../shared/errors-and-exceptions/error-exception-handler';
import { ClassNotFoundException } from '../../../shared/errors-and-exceptions/exceptions';
import ClassIdDto from '../view/class-id.dto';
import ClassesService from '../service/classes.service';


class ClassesController {
    private router: Router;
    constructor(
        private readonly classesService: ClassesService,
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
    // baseUrl will be /classes
    private routes() {
       this.router.get('/:id/assignments', (req, res, next) => this.getAllClassAssignments(req, res, next));
    }
    
    

    private async getAllClassAssignments(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = ClassIdDto.fromRequest(req.params);
            const cls = await this.classesService.getClassById(dto);
    
            if (!cls) {
                throw new ClassNotFoundException(dto.classId);
            }
            const assignments = await this.classesService.getAllAssignmentsByClassId(dto);
            res.status(200).json({ error: undefined, data: parseForResponse(assignments), success: true });
        } catch (error) {
            next(error);
        }
    }
}

export default ClassesController;