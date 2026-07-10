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
import ClassesDatabase from './features/classes/persistance/classes.database';
import ClassesService from './features/classes/service/classes.service';
import ClassesController from './features/classes/controller/classes.controller';
import ClassEnrollementsDatabase from './features/class-enrollements/persistance/class-enrollements.database';
import ClassEnrollementsService from './features/class-enrollements/service/class-enrollements.service';
import ClassEnrollementsController from './features/class-enrollements/controller/class-enrollements.controller';
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

const studentDatabase = new StudentDatabase(prisma);
const studentService = new StudentService(studentDatabase);
const errorExceptionHandler = new ErrorExceptionHandler();
const studentController = new StudentController(studentService, errorExceptionHandler);
app.use('/students', studentController.getRouter());

const assignmentsDatabase = new AssignmentsDatabase(prisma);
const assignmentService = new AssignmentsService(assignmentsDatabase);
const assignmentController = new AssignmentsController(assignmentService, errorExceptionHandler);
app.use('/assignments', assignmentController.getRouter());

const studentAssignmentDatabase = new StudentAssignmentDatabase(prisma);
const studentAssignmentService = new StudentAssignmentService(studentAssignmentDatabase);
const studentAssignmentController = new StudentAssignmentController(
    studentService,
    assignmentService,
    studentAssignmentService,
    errorExceptionHandler
);
app.use('/student-assignments', studentAssignmentController.getRouter());

const classesDatabase = new ClassesDatabase(prisma);
const classesService = new ClassesService(classesDatabase);
const classesController = new ClassesController(classesService, errorExceptionHandler);
app.use('/classes', classesController.getRouter());

const classEnrollementsDatabase = new ClassEnrollementsDatabase(prisma);
const classEnrollementsService = new ClassEnrollementsService(classEnrollementsDatabase);
const classEnrollementsController = new ClassEnrollementsController(
    classesService,
    studentService,
    classEnrollementsService,
    errorExceptionHandler);
app.use('/class-enrollements', classEnrollementsController.getRouter());



const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
