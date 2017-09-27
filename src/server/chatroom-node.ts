import * as path from 'path';

import * as Koa from 'koa';
import * as Router from 'koa-router';
// import * as favicon from 'serve-favicon';
// import * as logger from 'morgan';
// import * as cookieParser from 'cookie-parser';
// import * as bodyParser from 'body-parser';
// import * as cors from 'cors';

// routes
import { api } from './router/api';

let app = new Koa();
let router = new Router();

// root route and sub route settings
router.get('/', async (ctx, next) => {
  ctx.body="root"
});
router.get('/api', api.routes());

app.use(router.routes())
      .use(router.allowedMethods());
app.listen(3000, () => {
  console.log("koa started at 3000");
});

export default app;