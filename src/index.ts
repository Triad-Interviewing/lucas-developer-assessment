// Super basic Koa app for running the assessment
// You shouldn't need to change anything in this file
import * as Koa from 'koa';

import { StudentRouters } from './controllers/student.controller';

const app = new Koa()

app.use( async (ctx, next) => {
    try {
        await next()
    } catch(err) {
        console.log(err.status)
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
})

app.use(StudentRouters.routes())
   .use(StudentRouters.allowedMethods())

app.listen(1234, () => console.log('running on port 1234'))