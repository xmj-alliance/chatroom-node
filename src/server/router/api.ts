import * as Router from 'koa-router';

const router = new Router();

/* GET api listing. */
router.get('/', function* (): any {
  this.body = "api works";
});

export const api: Router = router;