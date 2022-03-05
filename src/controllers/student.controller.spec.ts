import { studentController } from './student.controller';

test('should return false given external link', () => {
    expect(studentController.display).toBeTruthy()
})