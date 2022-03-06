import { studentController, StudentRouters } from './student.controller';
import server from '../index';


/* Justification for import:
 * Provides easy testing functionality for network requests
*/
const request = require('supertest');

test('should return false given external link', () => {
    expect(studentController.display).toBeTruthy()
});

describe('/students/display/1', () => {
    let studentRequest: Object;

    it('Successful fetch to student with id 1', async () => {
        const response = await request(server)
            .get("/student/display/1");

        expect(response.status).toEqual(200);

        studentRequest = JSON.parse(response.body);
    });

    it(`Student with id 1 has the expected model-defining/unique attributes`, async () => {
        // This assumes no other data model will have this combination of attributes
        expect(studentRequest).toHaveProperty('email');
        expect(studentRequest).toHaveProperty('school_id');
        expect(studentRequest).toHaveProperty('institution');
        expect(studentRequest).toHaveProperty('assessments');

        // For additional validation, we ensure they don't have properties that other
        // data models have, which would not make sense for this data model to have
        // Assessment Log:
        expect(studentRequest).not.toHaveProperty('is_complete');
        expect(studentRequest).not.toHaveProperty('total_correct');
        expect(studentRequest).not.toHaveProperty('build_seed');
    });

    // TODO: We would continue for nested attributes, such as Institution, and Assessments
})