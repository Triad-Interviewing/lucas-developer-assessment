// Super basic Koa app for running the assessment
// You shouldn't need to change anything in this file

/* NOTE:
 * Because of the modification to esModuleInterop in 
 * /tsconfig.json to now be false, a different means
 * of importing Koa is necessary.
 * More info: https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-class-d-ts.html
*/
import Koa = require('koa');

import { StudentRouters } from './controllers/student.controller';

const app = new Koa();

app.use(StudentRouters.routes())
   .use(StudentRouters.allowedMethods())

const server = app
    .listen(1234, () => {
        console.log('running on port 1234');
    })
    .on("error", err => {
        console.error(err);
    });

export default server;