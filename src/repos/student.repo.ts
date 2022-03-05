// Feel free to change values or add more examples as needed (You cannot change the model)
// Assume this is essentially a call to the database

const student1 = {
    id: 1,
    name: "Zack",
    email: "zack.bessler@triadhq.com",
    school_id: "99999999",
    created_at: "2020-06-30T21:42:04.000Z",
    updated_at: "2020-07-23T15:41:14.000Z",
    institution: {
        id: 1,
        name: "Testing Institute of Test",
        created_at: "2020-06-30T21:41:43.000Z",
        updated_at: "2020-06-30T21:41:43.000Z",
        created_by: null,
        updated_by: null
    },
    created_by: null,
    updated_by: null,
    assessments: [
        {
            id: 1,
            name: "Silly-Questions set 1",
            description: "Fun-Questions:Silly-Questions set 1",
            open_time: "2020-06-05T00:00:00.000Z",
            close_time: "2029-06-05T00:00:00.000Z",
            time_limit: "20",
            version_number: 0,
            version_name: null,
            parent_assessment: null,
            type: null,
            is_locked: false,
            created_at: "2020-07-21T04:19:38.000Z",
            updated_at: "2020-07-21T04:19:38.000Z",
            created_by: null,
            updated_by: null
        },
        {
            id: 2,
            name: "Silly-Questions set 2",
            description: "Fun-Questions:Silly-Questions set 2",
            open_time: "2019-06-05T00:00:00.000Z",
            close_time: "2019-06-05T00:00:00.000Z",
            time_limit: "20",
            version_number: 0,
            version_name: null,
            parent_assessment: null,
            type: null,
            is_locked: false,
            created_at: "2020-07-21T04:19:38.000Z",
            updated_at: "2020-07-21T04:19:38.000Z",
            created_by: null,
            updated_by: null
        },
        {
            id: 3,
            name: "Exam-2",
            description: "NCE-2020:Exam-2",
            open_time: "2020-06-05T00:00:00.000Z",
            close_time: "2029-06-05T00:00:00.000Z",
            time_limit: "100",
            version_number: 0,
            version_name: null,
            parent_assessment: null,
            type: null,
            is_locked: false,
            created_at: "2020-07-21T04:19:42.000Z",
            updated_at: "2020-07-21T04:19:42.000Z",
            created_by: null,
            updated_by: null
        },
        {
            id: 4,
            name: "Exam-3",
            description: "NCE-2020:Exam-3",
            open_time: "2020-06-05T00:00:00.000Z",
            close_time: "2029-06-05T00:00:00.000Z",
            time_limit: "100",
            version_number: 0,
            version_name: null,
            parent_assessment: null,
            type: null,
            is_locked: false,
            created_at: "2020-07-21T04:19:43.000Z",
            updated_at: "2020-07-21T04:19:43.000Z",
            created_by: null,
            updated_by: null
        },
        {
            id: 5,
            name: "Exam-4",
            description: "NCE-2020:Exam-4",
            open_time: "2020-06-05T00:00:00.000Z",
            close_time: "2029-06-05T00:00:00.000Z",
            time_limit: "100",
            version_number: 0,
            version_name: null,
            parent_assessment: null,
            type: null,
            is_locked: false,
            created_at: "2020-07-21T04:19:44.000Z",
            updated_at: "2020-07-21T04:19:44.000Z",
            created_by: null,
            updated_by: null
        },
        {
            id: 6,
            name: "Exam-AE",
            description: "NCE-2020:Exam-AE",
            open_time: "2020-06-05T00:00:00.000Z",
            close_time: "2029-06-05T00:00:00.000Z",
            time_limit: "100",
            version_number: 0,
            version_name: null,
            parent_assessment: null,
            type: null,
            is_locked: false,
            created_at: "2020-07-21T04:19:44.000Z",
            updated_at: "2020-07-21T04:19:44.000Z",
            created_by: null,
            updated_by: null
        }
    ]
}

const student2 = {
    id: 1,
    name: "Jane Smith",
    email: "jane.smith@gemail.com",
    school_id: "1234567890",
    created_at: "2020-06-30T21:42:04.000Z",
    updated_at: "2020-07-23T15:41:14.000Z",
    institution: {
        id: 1,
        name: "Testing Institute of Test",
        created_at: "2020-06-30T21:41:43.000Z",
        updated_at: "2020-06-30T21:41:43.000Z",
        created_by: null,
        updated_by: null
    },
    created_by: null,
    updated_by: null,
    assessments: [
        {
            id: 1,
            name: "Silly-Questions set 1",
            description: "Fun-Questions:Silly-Questions set 1",
            open_time: "2020-06-05T00:00:00.000Z",
            close_time: "2029-06-05T00:00:00.000Z",
            time_limit: "20",
            version_number: 0,
            version_name: null,
            parent_assessment: null,
            type: null,
            is_locked: false,
            created_at: "2020-07-21T04:19:38.000Z",
            updated_at: "2020-07-21T04:19:38.000Z",
            created_by: null,
            updated_by: null
        },
        {
            id: 2,
            name: "Silly-Questions set 2",
            description: "Fun-Questions:Silly-Questions set 2",
            open_time: "2019-06-05T00:00:00.000Z",
            close_time: "2019-06-05T00:00:00.000Z",
            time_limit: "20",
            version_number: 0,
            version_name: null,
            parent_assessment: null,
            type: null,
            is_locked: false,
            created_at: "2020-07-21T04:19:38.000Z",
            updated_at: "2020-07-21T04:19:38.000Z",
            created_by: null,
            updated_by: null
        },
        {
            id: 4,
            name: "Exam-3",
            description: "NCE-2020:Exam-3",
            open_time: "2020-06-05T00:00:00.000Z",
            close_time: "2029-06-05T00:00:00.000Z",
            time_limit: "100",
            version_number: 0,
            version_name: null,
            parent_assessment: null,
            type: null,
            is_locked: false,
            created_at: "2020-07-21T04:19:43.000Z",
            updated_at: "2020-07-21T04:19:43.000Z",
            created_by: null,
            updated_by: null
        },
        {
            id: 6,
            name: "Exam-AE",
            description: "NCE-2020:Exam-AE",
            open_time: "2020-06-05T00:00:00.000Z",
            close_time: "2029-06-05T00:00:00.000Z",
            time_limit: "100",
            version_number: 0,
            version_name: null,
            parent_assessment: null,
            type: null,
            is_locked: false,
            created_at: "2020-07-21T04:19:44.000Z",
            updated_at: "2020-07-21T04:19:44.000Z",
            created_by: null,
            updated_by: null
        }
    ]
}



//*************************************** */
// Do not change anything between these lines
class StudentRepo {

    // Assume this is essentially a call to the database
    getLogsByStudent = async (studentID: number) => {
        if (studentID === 1) {
            return await student1
        } else if (studentID === 2) {
            return await student2
        } else {
            return { error: 'No student found' }
        }
    }
}
export const studentRepo = new StudentRepo();
// Do not change anything between these lines
//*************************************** */