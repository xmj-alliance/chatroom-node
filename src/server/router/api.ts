import * as Router from 'koa-router';

const router = new Router();

/* GET api listing. */
router.get('/api', async (ctx, next) => {
  ctx.body="api works finally!"
});

export const api: Router = router;