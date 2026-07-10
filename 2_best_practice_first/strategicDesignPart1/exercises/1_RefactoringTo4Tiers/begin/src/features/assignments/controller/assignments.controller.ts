import { Router, NextFunction, Request, Response } from 'express';
import { parseForResponse } from '../../../shared/utilities/helpers';
import { ErrorExceptionHandler } from '../../../shared/errors-and-exceptions/error-exception-handler';
import CreateAssignmentDto from '../view/create-assignment.dto';
import AssignmentsService from '../service/assignments.service';
import AssignmentIdDto from '../view/assignment-id.dto';
import { AssignmentNotFoundException } from '../../../shared/errors-and-exceptions/exceptions';


class AssignmentsController {
    private router: Router;
    constructor(
        private readonly assignmentsService: AssignmentsService,
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
    // baseUrl will be /assignements
    private routes() {
       this.router.post("/", (req, res, next) => this.createAssignment(req, res, next));
       this.router.post("/:id", (req, res, next) => this.getAssignment(req, res, next));
    }
    
    private async createAssignment(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = CreateAssignmentDto.fromRequest(req.body);
        
            const assignment = this.assignmentsService.createAssignment(dto);
        
            res.status(201).json({ error: undefined, data: parseForResponse(assignment), success: true });
        } catch (error) {
            next(error);
        }
    
    }

    private async getAssignment(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = AssignmentIdDto.fromRequest(req.params)
            const assignment = this.assignmentsService.getAssignment(dto)
        
            if (!assignment) {
                throw new AssignmentNotFoundException;
            }
        
            res.status(200).json({ error: undefined, data: parseForResponse(assignment), success: true });
        } catch (error) {
            next(error);
        }
    }
    
}

export default AssignmentsController;