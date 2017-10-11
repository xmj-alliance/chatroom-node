import * as path from 'path';

import * as send from 'koa-send';
import * as Router from 'koa-router';

const staticPath = path.join(__dirname, "./static")
//  note: __dirname is dist/server because webpack packs everything in 1 file.

const router = new Router();

router
.get('/images/avatars/:username', async (ctx) => {
  // e.g. /api/file/images/avatars/catbon?filename=meowwww.jpg
  const username: string = ctx.params.username;
  const filename = ctx.query.filename;
  const userAvatarFolder = path.join(staticPath, `./images/avatars/${username}`);
  await send(ctx, path.join(userAvatarFolder, filename), { root: '/' });
})

export const file: Router =  router;