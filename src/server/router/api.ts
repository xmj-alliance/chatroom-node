import * as Router from 'koa-router';

import { user } from './user';
import { file } from './file';

const router = new Router();

/* GET api listing. */
router.get('/', async (ctx, next) => {
  ctx.body="api works finally!"
});

router
.use('/user', user.routes(), user.allowedMethods())
.use('/file', file.routes(), file.allowedMethods())
;

export const api: Router = router;