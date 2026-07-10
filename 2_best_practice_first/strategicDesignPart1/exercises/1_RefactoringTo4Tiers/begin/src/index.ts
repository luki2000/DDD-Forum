import express, { Request, Response } from 'express';
import { prisma } from './database';
import { isMissingKeys, parseForResponse, isUUID } from './shared/utilities/helpers';
import StudentController from './features/students/controller/student.controller';
import StudentService from './features/students/service/student.service';
import { ErrorExceptionHandler } from './shared/errors-and-exceptions/error-exception-handler';
import AssignmentsService from './features/assignments/service/assignments.service';
import AssignmentsDatabase from './features/assignments/persistance/assignments.database';
import StudentDatabase from './features/students/persistance/student.database';
import AssignmentsController from './features/assignments/controller/assignments.controller';
import StudentAssignmentController from './features/student-assignments/controller/student-assignment.controller';
import StudentAssignmentService from './features/student-assignments/service/student-assignment.service';
import StudentAssignmentDatabase from './features/student-assignments/persistance/student-assignment.database';
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

export const ErrorExceptionType = {
    ValidationError: 'ValidationError',
    StudentNotFound: 'StudentNotFound',
    ClassNotFound: 'ClassNotFound',
    AssignmentNotFound: 'AssignmentNotFound',
    StudentAssignmentNotFound: 'StudentAssignmentNotFound',
    ServerError: 'ServerError',
    ClientError: 'ClientError',
    StudentAlreadyEnrolled: 'StudentAlreadyEnrolled'
}

// API Endpoints

const studentDatabase = new StudentDatabase(prisma);
const studentService = new StudentService(studentDatabase);
const errorExceptionHandler = new ErrorExceptionHandler();
const studentController = new StudentController(studentService, errorExceptionHandler);
app.use('/students', studentController.getRouter());

const assignmentsDatabase = new AssignmentsDatabase(prisma);
const assignmentService = new AssignmentsService(assignmentsDatabase);
const AssignmentController = new AssignmentsController(assignmentService, errorExceptionHandler);
app.use('/assignments', AssignmentController.getRouter());

const studentAssignmentDatabase = new StudentAssignmentDatabase(prisma);
const studentAssignmentService = new StudentAssignmentService(studentAssignmentDatabase);
const studentAssignmentController = new StudentAssignmentController(
    studentService,
    assignmentService,
    studentAssignmentService,
    errorExceptionHandler
);
app.use('/student-assignments', studentAssignmentController.getRouter());

app.post('/class-enrollments', async (req: Request, res: Response) => {
    try {
        if (isMissingKeys(req.body, ['studentId', 'classId'])) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }
    
        const { studentId, classId } = req.body;
    
        // check if student exists
        const student = await prisma.student.findUnique({
            where: {
                id: studentId
            }
        });
    
        if (!student) {
            return res.status(404).json({ error: ErrorExceptionType.StudentNotFound, data: undefined, success: false });
        }
    
        // check if class exists
        const cls = await prisma.class.findUnique({
            where: {
                id: classId
            }
        });

        // check if student is already enrolled in class
        const duplicatedClassEnrollment = await prisma.classEnrollment.findFirst({
            where: {
                studentId,
                classId
            }
        });

        if (duplicatedClassEnrollment) {
            return res.status(400).json({ error: ErrorExceptionType.StudentAlreadyEnrolled, data: undefined, success: false });
        }
    
        if (!cls) {
            return res.status(404).json({ error: ErrorExceptionType.ClassNotFound, data: undefined, success: false });
        }
    
        const classEnrollment = await prisma.classEnrollment.create({
            data: {
                studentId,
                classId
            }
        });
    
        res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
    } catch (error) {
        res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
    }
 
});

// POST student submitted assignment
app.post('/student-assignments/submit', async (req: Request, res: Response) => {
	try {
		if (isMissingKeys(req.body, ['id'])) {
			return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
		}

		const { id } = req.body;
		
		// check if student assignment exists
		const studentAssignment = await prisma.studentAssignment.findUnique({
			where: {
				id
			}
		});

		if (!studentAssignment) {
			return res.status(404).json({ error: ErrorExceptionType.AssignmentNotFound, data: undefined, success: false });
		}

		const studentAssignmentUpdated = await prisma.studentAssignment.update({
			where: {
				id
			},
			data: {
				status: 'submitted'
			}
		});

		res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
	} catch (error) {
		res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
	}
});

// POST student assignment graded
app.post('/student-assignments/grade', async (req: Request, res: Response) => {
    try {

        if (isMissingKeys(req.body, ['id', 'grade'])) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }
    
        const { id, grade } = req.body;
    
        // validate grade
        if (!['A', 'B', 'C', 'D'].includes(grade)) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }
        
        // check if student assignment exists
        const studentAssignment = await prisma.studentAssignment.findUnique({
            where: {
                id
            }
        });
    
        if (!studentAssignment) {
            return res.status(404).json({ error: ErrorExceptionType.AssignmentNotFound, data: undefined, success: false });
        }
    
        const studentAssignmentUpdated = await prisma.studentAssignment.update({
            where: {
                id
            },
            data: {
                grade,
            }
        });
    
        res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
    } catch (error) {
        res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
    }
});

// GET all assignments for class
app.get('/classes/:id/assignments', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if(!isUUID(id)) {
            return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
        }

        // check if class exists
        const cls = await prisma.class.findUnique({
            where: {
                id
            }
        });

        if (!cls) {
            return res.status(404).json({ error: ErrorExceptionType.ClassNotFound, data: undefined, success: false });
        }

        const assignments = await prisma.assignment.findMany({
            where: {
                classId: id
            },
            include: {
                class: true,
                studentTasks: true
            }
        });
    
        res.status(200).json({ error: undefined, data: parseForResponse(assignments), success: true });
    } catch (error) {
        res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
    }
});




const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
