import { Request, Response } from 'express';
import { prisma } from '../../../database';
import { isMissingKeys, parseForResponse } from '../../../helpers/helpers';

const Errors = {
    ValidationError: 'ValidationError',
    ServerError: 'ServerError',
};

class StudentController {
    constructor() {}

    private async createStudent(req: Request, res: Response) {
        try {
            if (isMissingKeys(req.body, ['name'])) {
                return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
            }
    
            const { name } = req.body;
    
            // persistance layer
            const student = await prisma.student.create({
                data: {
                    name
                }
            });
    
            res.status(201).json({ error: undefined, data: parseForResponse(student), success: true });
        } catch (error) {
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }
    }
}