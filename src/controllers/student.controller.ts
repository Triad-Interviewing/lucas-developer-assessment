import { studentRepo } from "../repos/student.repo";
import { logRepo } from "../repos/assessmentLog.repo";
import { Student, Institution, Assessment } from "../../__tests__/models/Student";
import { AssessmentLog } from "../../__tests__/models/AssessmentLog";

// Routes

/* NOTE:
 * Because of the modification to esModuleInterop in 
 * /tsconfig.json to now be false, a different means
 * of importing Koa is necessary.
 * More info: https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-class-d-ts.html
*/
import Koa = require('koa');
import Router = require('koa-router');
import { close } from "fs";

interface _error {
    error: string;
}

/* DESCRIPTION:
 * Assumes that student,
 * and only student,
 * is identifiable with the following combination of attributes:
 *      - email
 *      - school_id
 *      - institution
 *      - assessments
*/
function validateStudentData(student: Object): boolean{
    if(student === undefined) return false;

    if(student.hasOwnProperty('email') &&
        student.hasOwnProperty('school_id') &&
        student.hasOwnProperty('institution') &&
        student.hasOwnProperty('assessments')){
        return true;
    }
    return false;
}

/* DESCRIPTION:
 * Assumes that assessmentLog,
 * and only assessmentLog,
 * is identifiable with the following combination of attributes:
 *      - is_complete
 *      - total_correct
 *      - build_seed
 *      - assessment
*/
function validateAssessmentLogData(assessmentLog: Object[]): boolean{
    if(assessmentLog === undefined) return false;
    

    if(assessmentLog.length > 0 && 
        assessmentLog[0].hasOwnProperty('is_complete') &&
        assessmentLog[0].hasOwnProperty('total_correct') &&
        assessmentLog[0].hasOwnProperty('build_seed') &&
        assessmentLog[0].hasOwnProperty('assessment')){
        return true;
    }
    return false;
}

/* MORE DETAILS: 
 *  filter for:
 *      open time > current time
*/
// Sort by current time - open time
function processForUpcoming(student: Student): Assessment[] {
    let upcomingAssessments: Assessment[] = [];
    const currentTime: Date = new Date();
    
    const assessments = student.assessments;
    for(const assessment of assessments) {
        const open: Date = new Date(assessment.open_time);
        if(open.getTime() > currentTime.getTime()) {
            upcomingAssessments.push(assessment);
        }
    }

    // Sort by soonest-upcoming
    upcomingAssessments.sort(sortByCurrentTimeProximityToOpenTime());
    return upcomingAssessments;
}

/* MORE DETAILS: 
 *  filter for:
 *      open time >= current time
 *      &&
 *      close time <= current time
*/
// sort by open_time
function processForOpen(student: Student): Assessment[] {
    let openAssessments: Assessment[] = [];
    const currentTime: Date = new Date();
    
    const assessments = student.assessments;
    for(const assessment of assessments) {
        const open: Date = new Date(assessment.open_time);
        const close: Date = new Date(assessment.close_time);
        
        if(currentTime.getTime() >= open.getTime() &&
            currentTime.getTime() <= close.getTime()) {
            openAssessments.push(assessment);
        }
    }
    
    // Sorts by time most recently opened
    openAssessments.sort(sortByCurrentTimeProximityToOpenTime());
    return openAssessments;
}

/* ASSUMPTIONS:
 * - Assumes student can submit assessment at current time
*/
/* MORE DETAILS: 
 *  filter for:
 *      close time < current time
 *      ||
 *      ((assessmentLog.assessment === id 
 *      &&
 *      assessmentLog.student === student.id)
 *      &&
 *      close time - assessmentLog.start_time > time limit
 *      )
*/
function processForExpired(student: Student, logs: AssessmentLog[]): Assessment[] {
    let expiredAssessments: Assessment[] = [];

    const assessments = student.assessments;
    for(const assessment of assessments) {
        const close: Date = new Date(assessment.close_time);
        // convert time_limit from minutes to milliseconds
        const timeLimit: number = parseInt(assessment.time_limit) * 60 * 1000;
        const id = assessment.id;
        const currentTime = new Date();
        
        for(const log of logs) {
            const startTime: Date = new Date(log.start_time);
            
            if(close.getTime() < currentTime.getTime() || (
                log.assessment === id && 
                log.student === student.id && 
                (close.getTime() - startTime.getTime()) > timeLimit
            )) {
                let alreadyExists = false;
                for(const a of expiredAssessments) {
                    if(a.id === id) alreadyExists = true;
                }
                if(!alreadyExists){
                    expiredAssessments.push(assessment);
                }
            }
        }
    }
    
    // sorts by most recently expired
    expiredAssessments.sort(sortByTimeStarted(student, logs));

    return expiredAssessments;
}

/* ASSUMPTIONS:
 * - Assumes student can submit assessment at close time
*/
/* MORE DETAILS: 
 *  filter for:
 *      open time <= current time
 *      && 
 *      close time > current time
 *      &&
 *      ((assessmentLog.assessment === id 
 *      &&
 *      assessmentLog.student === student.id)
 *      && 
 *      assessmentLog.is_complete === false
 *      &&
 *      close time - assessmentLog.start_time <= time limit
 *      )
*/
function processForInprogress(student: Student, logs: AssessmentLog[]): Assessment[] {
    let inprogressAssessments: Assessment[] = [];
    const currentTime = new Date();

    const assessments = student.assessments;
    for(const assessment of assessments) {
        const open: Date = new Date(assessment.open_time);
        const close: Date = new Date(assessment.close_time);
        // convert time_limit from minutes to milliseconds
        const timeLimit: number = parseInt(assessment.time_limit) * 60 * 1000;
        const id: number = assessment.id;

        for(const log of logs) {
            const logStart: Date = new Date(log.start_time);

            if(open.getTime() <= currentTime.getTime() && 
                close.getTime() > currentTime.getTime() &&
                (log.assessment === id &&
                log.student === student.id &&
                log.is_complete === false &&
                (currentTime.getTime() - logStart.getTime()) <= timeLimit)) {
                    let alreadyExists = false;
                    for(const a of inprogressAssessments) {
                        if(a.id === id) alreadyExists = true;
                    }
                    if(!alreadyExists){
                        inprogressAssessments.push(assessment);
                    }
            }
        }
    }
    
    inprogressAssessments.sort(sortByTimeLeft(student, logs));

    return inprogressAssessments;
}


/* MORE DETAILS: 
 *  filter for:
 *      ((assessmentLog.assessment === id 
 *      &&
 *      assessmentLog.student === student.id)
 *      && 
 *      assessmentLog.is_complete === true)
*/    
function processForCompleted(student: Student, logs: AssessmentLog[]): Assessment[] {
    let completedAssessments: Assessment[] = [];
    
    const assessments = student.assessments;
    for(const assessment of assessments) {
        const id = assessment.id;

        for(const log of logs) {
            if(log.assessment === id &&
                log.student === student.id &&
                log.is_complete === true) {
                let alreadyExists = false;
                for(const a of completedAssessments) {
                    if(a.id === id) alreadyExists = true;
                }
                if(!alreadyExists){
                    completedAssessments.push(assessment);
                }
            }
        }
    }
    
    // Most recently completed
    completedAssessments.sort(sortByCompletion(student, logs));
    
    return completedAssessments;
}

/* DESCRIPTION:
 * Function designed to be passed into sort().
 * Sorts by time opened among all assessments.
*/
function sortByCurrentTimeProximityToOpenTime(){
    return (a: Assessment, b: Assessment) =>{
        const timeOpenedA: number = (new Date(a.open_time)).getTime();
        const timeOpenedB: number = (new Date(b.open_time)).getTime();
        const currentTime: number = (new Date()).getTime();

        let timeFromOpenA = Math.abs(timeOpenedA - currentTime);
        let timeFromOpenB = Math.abs(timeOpenedB - currentTime);

        if(timeFromOpenA < timeFromOpenB) {
            return -1;
        } else {
            return 1;
        }
    }
}

/* DESCRIPTION:
 * Function designed to be passed into sort().
 * Sorts by time started in active/non-completed assessment.
*/
function sortByTimeStarted(student: Student, logs: AssessmentLog[]){
    return (a: Assessment, b: Assessment) =>{
        const logARes: AssessmentLog | undefined = fetchAssessmentLog(a, student, logs);
        if(logARes === undefined) return 0;
    
        const logBRes: AssessmentLog | undefined = fetchAssessmentLog(b, student, logs);
        if(logBRes === undefined) return 0;
    
        const logA: AssessmentLog = logARes as AssessmentLog;
        const logB: AssessmentLog = logBRes as AssessmentLog;

        const timeStartedA: number = (new Date(logA.start_time)).getTime();
        const timeStartedB: number = (new Date(logB.start_time)).getTime();

        if(timeStartedA > timeStartedB) {
            return -1;
        } else {
            return 1;
        }
    }
}

/* DESCRIPTION:
 * Function designed to be passed into sort().
 * Sorts by time left in active/non-completed assessment.
*/
function sortByTimeLeft(student: Student, logs: AssessmentLog[]){
    // time left = assessment.close_time - (log.start_time + log.total_time)
    return (a: Assessment, b: Assessment) =>{
        const logARes: AssessmentLog | undefined = fetchAssessmentLog(a, student, logs);
        if(logARes === undefined) return 0;
    
        const logBRes: AssessmentLog | undefined = fetchAssessmentLog(b, student, logs);
        if(logBRes === undefined) return 0;
    
        const logA: AssessmentLog = logARes as AssessmentLog;
        const logB: AssessmentLog = logBRes as AssessmentLog;

        const startTimeA: number = (new Date(logA.start_time)).getTime();
        const totalTimeA: number = (new Date(logA.total_time)).getTime();
        const closeTimeA: number = (new Date(a.close_time)).getTime();
        const startTimeB: number = (new Date(logB.start_time)).getTime();
        const totalTimeB: number = (new Date(logB.total_time)).getTime();
        const closeTimeB: number = (new Date(b.close_time)).getTime();
        
        const timeLeftA = closeTimeA - (startTimeA + totalTimeA);
        const timeLeftB = closeTimeB - (startTimeB + totalTimeB);

        if(timeLeftA < timeLeftB) {
            return -1;
        } else {
            return 1;
        }
    }
}

/* DESCRIPTION:
 * Function designed to be passed into sort().
 * Sorts by completion time/date.
*/
function sortByCompletion(student: Student, logs: AssessmentLog[]){
    // completion = log.start_time + log.total_time
    return (a: Assessment, b: Assessment) =>{
        const logARes: AssessmentLog | undefined = fetchAssessmentLog(a, student, logs);
        if(logARes === undefined) return 0;
    
        const logBRes: AssessmentLog | undefined = fetchAssessmentLog(b, student, logs);
        if(logBRes === undefined) return 0;
    
        const logA: AssessmentLog = logARes as AssessmentLog;
        const logB: AssessmentLog = logBRes as AssessmentLog;

        const startTimeA: number = (new Date(logA.start_time)).getTime();
        // convert minutes to milliseconds
        const totalTimeA: number = parseInt(logA.total_time) * 60 * 1000;
        const startTimeB: number = (new Date(logB.start_time)).getTime();
        // convert minutes to milliseconds
        const totalTimeB: number = parseInt(logB.total_time) * 60 * 1000;
        
        const completionTimeA: number = startTimeA + totalTimeA;
        const completionTimeB: number = startTimeB + totalTimeB;
        if(completionTimeA < completionTimeB) {
            return -1;
        } else {
            return 1;
        }
    }
}

/* DESCRIPTION:
 * Dependency for sortByCompletion, fetches AssessmentLog
 * based on assessment and student
*/
function fetchAssessmentLog(assessment: Assessment, student: Student, logs:  AssessmentLog[]): AssessmentLog | undefined {
    for(const log of logs) {
        if(log.assessment === assessment.id &&
            log.student === student.id) {
            return log;
        }
    }
    return undefined;
}

class StudentController {
    /* DESCRIPTION:
     * Displaying student data by the following sorted groupings:
     * upcomming, open, expired, inprogress, and completed
    */
    async display(ctx: Koa.Context, next: Koa.Next) {
        // Work starts here/.
        let studentData: Object = {};
        let studentLogData: Object[] | Object = {};
        await studentRepo.getLogsByStudent(parseInt(ctx.params.studentid)).then((student) => {
            studentData = student;
        });
        await logRepo.getLogsByStudent(parseInt(ctx.params.studentid)).then((logs) => {
            studentLogData = logs;
        });
        
        /* NOTE:
         * This assumes that every student, 
         * regardless of if they've taken an assessment,
         * has assessment log data
        */
        if(studentData.hasOwnProperty('error') || studentLogData.hasOwnProperty('error')){
            ctx.response.status = 404;
            ctx.body = (studentData as _error).error;
        }
        // studentData and studentLogData must both be valid
        else if(validateStudentData(studentData) && validateAssessmentLogData(studentLogData as Object[])){
                const student: Student = studentData as Student;
                const assessmentLogs: AssessmentLog[] = studentLogData as AssessmentLog[];
                
                let upcoming = processForUpcoming(student);
                let open = processForOpen(student);
                let expired = processForExpired(student, assessmentLogs);
                let inprogress = processForInprogress(student, assessmentLogs);
                let completed = processForCompleted(student, assessmentLogs);

                ctx.response.status = 200;
                ctx.body = {
                    upcoming: upcoming,
                    open: open,
                    expired: expired,
                    inprogress: inprogress,
                    completed: completed,
                };
        } else{
            ctx.response.status = 500;
            ctx.body = "Error: Internal Server Error";
        }
        next();
    }
}
const studentController = new StudentController();

//
// Simple routing logic
//
const router = new Router();
router.get('/', async (ctx: Koa.Context) => {
    ctx.status = 200;
    ctx.body = "hello world!";
});
router.get('/students/display/:studentid', studentController.display);
const StudentRouters = router;


export { studentController, StudentRouters };
