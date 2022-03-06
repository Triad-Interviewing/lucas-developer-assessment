// Feel free to change values or add more examples as needed (You cannot change the model)
// Assume this is essentially a call to the database

const log1 = [
    {
        id: 7,
        is_complete: true,
        start_time: "2020-07-24T16:36:37.000Z",
        total_time: "183297",
        total_correct: 5,
        build_seed: null,
        version_number: null,
        assessment: 1,
        student: 1,
        created_at: "2020-07-24T16:36:37.000Z",
        updated_at: "2020-07-24T16:39:41.000Z",
        created_by: null,
        updated_by: null
    },
    {
        id: 8,
        is_complete: true,
        start_time: "2020-07-20T16:49:59.000Z",
        total_time: "267049636",
        total_correct: 2,
        build_seed: null,
        version_number: null,
        assessment: 2,
        student: 1,
        created_at: "2020-07-12T16:49:59.000Z",
        updated_at: "2020-07-12T19:00:49.000Z",
        created_by: null,
        updated_by: null
    },
    {
        id: 12,
        is_complete: true,
        start_time: "2020-07-23T20:41:55.000Z",
        total_time: "6435786",
        total_correct: 5,
        build_seed: null,
        version_number: null,
        assessment: 4,
        student: 1,
        created_at: "2020-07-27T20:41:55.000Z",
        updated_at: "2020-07-27T22:29:11.000Z",
        created_by: null,
        updated_by: null
    },
    {
        id: 15,
        is_complete: false,
        start_time: "2022-03-03T12:00:00.000Z", // Mark this with todays data and time for an examle of an open exam
        total_time: null,
        total_correct: null,
        build_seed: null,
        version_number: null,
        assessment: 3,
        student: 1,
        created_at: "2020-08-06T15:42:57.000Z",
        updated_at: "2020-08-06T15:43:00.000Z",
        created_by: null,
        updated_by: null
    },
    {
        id: 16,
        is_complete: false,
        start_time: "2022-03-03T12:00:00.000Z", // Mark this with todays data and time for an examle of an open exam
        total_time: null,
        total_correct: null,
        build_seed: null,
        version_number: null,
        assessment: 7,
        student: 1,
        created_at: "2020-08-06T16:42:57.000Z",
        updated_at: "2022-03-05T21:20:00.000Z",
        created_by: null,
        updated_by: null
    }
]


const log2 = [
    {
        id: 7,
        is_complete: true,
        start_time: "2020-07-24T16:36:37.000Z",
        total_time: "183297",
        total_correct: 5,
        build_seed: null,
        version_number: null,
        assessment: 1,
        student: 1,
        created_at: "2020-07-24T16:36:37.000Z",
        updated_at: "2020-07-24T16:39:41.000Z",
        created_by: null,
        updated_by: null
    }
]


//*************************************** */
// Do not change anything between these lines
class LogRepo {

    // Assume this is essentially a call to the database
    getLogsByStudent = async (studentID: number) => {
        if (studentID === 1) {
            return await log1
        } else if (studentID === 2) {
            return await log2
        } else {
            return { error: 'No student found' }
        }
    }
}
export const logRepo = new LogRepo();
// Do not change anything between these lines
//*************************************** */