import { Router, NextFunction, Request, Response } from 'express';
import { parseForResponse } from '../../../shared/utilities/helpers';
import StudentService from '../service/student.service';
import { ErrorExceptionHandler } from '../../../shared/errors-and-exceptions/error-exception-handler';


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
        this.router.post("/", this.createStudent);
        /*this.router.get("/:id", this.assignStudent);
        this.router.post("/submit", this.submitAssignment);
        this.router.post("/grade", this.gradeAssignment);*/
    }

    private async createStudent(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body;
            const student = this.studentService.createStudent(name);
            res.status(201).json({ error: undefined, data: parseForResponse(student), success: true });
        } catch (error) {
            next(error);
        }
    }
/*
    // GET all students
app.get('/students', async (req: Request, res: Response) => {
    try {
        const students = await prisma.student.findMany({
            include: {
                classes: true,
                assignments: true,
                reportCards: true
            }, 
            orderBy: {
                name: 'asc'
            }
        });
        res.status(200).json({ error: undefined, data: parseForResponse(students), success: true });
    } catch (error) {
        res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
    }
});

// GET a student by id
app.get('/students/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if(!isUUID(id)) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }
        const student = await prisma.student.findUnique({
            where: {
                id
            },
            include: {
                classes: true,
                assignments: true,
                reportCards: true
            }
        });
    
        if (!student) {
            return res.status(404).json({ error: ErrorExceptionType.StudentNotFound, data: undefined, success: false });
        }
    
        res.status(200).json({ error: undefined, data: parseForResponse(student), success: true });
    } catch (error) {
        res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
    }
});

    // GET all student submitted assignments
app.get('/student/:id/assignments', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if(!isUUID(id)) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        // check if student exists
        const student = await prisma.student.findUnique({
            where: {
                id
            }
        });

        if (!student) {
            return res.status(404).json({ error: ErrorExceptionType.StudentNotFound, data: undefined, success: false });
        }

        const studentAssignments = await prisma.studentAssignment.findMany({
            where: {
                studentId: id,
                status: 'submitted'
            },
            include: {
                assignment: true
            },
        });
    
        res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
    } catch (error) {
        res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
    }
});

// GET all student grades
app.get('/student/:id/grades', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if(!isUUID(id)) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        // check if student exists
        const student = await prisma.student.findUnique({
            where: {
                id
            }
        });

        if (!student) {
            return res.status(404).json({ error: ErrorExceptionType.StudentNotFound, data: undefined, success: false });
        }

        const studentAssignments = await prisma.studentAssignment.findMany({
            where: {
                studentId: id,
                status: 'submitted',
                grade: {
                    not: null
                }
            },
            include: {
                assignment: true
            },
        });
    
        res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
    } catch (error) {
        res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
    }
})*/
}

export default StudentController;