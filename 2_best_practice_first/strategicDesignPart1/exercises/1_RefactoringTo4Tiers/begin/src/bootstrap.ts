import Server from './server';
import { prisma } from './database';
import { ErrorExceptionHandler } from './shared/errors-and-exceptions/error-exception-handler';

import StudentDatabase from './features/students/persistance/student.database';
import StudentService from './features/students/service/student.service';
import StudentController from './features/students/controller/student.controller';

import AssignmentsDatabase from './features/assignments/persistance/assignments.database';
import AssignmentsService from './features/assignments/service/assignments.service';
import AssignmentsController from './features/assignments/controller/assignments.controller';

import StudentAssignmentDatabase from './features/student-assignments/persistance/student-assignment.database';
import StudentAssignmentService from './features/student-assignments/service/student-assignment.service';
import StudentAssignmentController from './features/student-assignments/controller/student-assignment.controller';

import ClassesDatabase from './features/classes/persistance/classes.database';
import ClassesService from './features/classes/service/classes.service';
import ClassesController from './features/classes/controller/classes.controller';

import ClassEnrollementsDatabase from './features/class-enrollements/persistance/class-enrollements.database';
import ClassEnrollementsService from './features/class-enrollements/service/class-enrollements.service';
import ClassEnrollementsController from './features/class-enrollements/controller/class-enrollements.controller';

const errorExceptionHandler = new ErrorExceptionHandler();

const studentDatabase = new StudentDatabase(prisma);
const studentService = new StudentService(studentDatabase);
const studentController = new StudentController(studentService, errorExceptionHandler);

const assignmentsDatabase = new AssignmentsDatabase(prisma);
const assignmentsService = new AssignmentsService(assignmentsDatabase);
const assignmentsController = new AssignmentsController(assignmentsService, errorExceptionHandler);

const studentAssignmentDatabase = new StudentAssignmentDatabase(prisma);
const studentAssignmentService = new StudentAssignmentService(studentAssignmentDatabase);
const studentAssignmentController = new StudentAssignmentController(
    studentService,
    assignmentsService,
    studentAssignmentService,
    errorExceptionHandler
);

const classesDatabase = new ClassesDatabase(prisma);
const classesService = new ClassesService(classesDatabase);
const classesController = new ClassesController(classesService, errorExceptionHandler);

const classEnrollementsDatabase = new ClassEnrollementsDatabase(prisma);
const classEnrollementsService = new ClassEnrollementsService(classEnrollementsDatabase);
const classEnrollementsController = new ClassEnrollementsController(
    classesService,
    studentService,
    classEnrollementsService,
    errorExceptionHandler
);

const server = new Server(
    studentController,
    assignmentsController,
    studentAssignmentController,
    classesController,
    classEnrollementsController
);

export default server;
