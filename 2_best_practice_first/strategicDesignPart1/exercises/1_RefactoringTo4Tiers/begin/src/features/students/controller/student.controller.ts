import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../../database';
import { isMissingKeys, parseForResponse } from '../../../shared/utilities/helpers';
import StudentService from '../service/student.service';
import { ErrorExceptionHandler } from '../../../shared/errors-and-exceptions/error-exception-handler';


class StudentController {
    constructor(
        private readonly studentService: StudentService,
        private readonly errorExceptionHandler: ErrorExceptionHandler) {}

    private async createStudent(req: Request, res: Response, next: NextFunction) {
        try {
    
            const { name } = req.body;
    
            const student = this.studentService.createStudent(name);
    
            res.status(201).json({ error: undefined, data: parseForResponse(student), success: true });
        } catch (error) {
            next(error);
        }
    }
}