import * as path from 'path';

import * as Koa from 'koa';
import * as Router from 'koa-router';
// import * as favicon from 'serve-favicon';
import * as logger from 'koa-logger';
// import * as cookieParser from 'cookie-parser';
// import * as bodyParser from 'body-parser';
// import * as cors from 'cors';

// routes
import { api } from './router/api';

let app = new Koa();
let router = new Router();

app.use(logger());

// root route and sub route settings
router.get('/', async (ctx, next) => {
  ctx.body="root"
});
router.use('/api', api.routes(), api.allowedMethods())

app.use(router.routes())
    .use(router.allowedMethods());

// listen
app.listen(3000, () => {
  console.log("** koa started on port 3000. **");
});

export default app;