import * as path from 'path';

import * as Koa from 'koa';
import * as Router from 'koa-router';
// import * as favicon from 'serve-favicon';
// import * as logger from 'morgan';
// import * as cookieParser from 'cookie-parser';
// import * as bodyParser from 'body-parser';
// import * as cors from 'cors';

// routes
//import { api } from './router/api';

let app = new Koa();
let router = new Router();

// root route and sub route settings
router.get("/", function* (ctx, next): any {
  ctx.body = "Hello world!";
  yield "xxx";
});
//router.get("/api", api.routes());

app.use(router.routes());

app.listen(3000);

export default app;