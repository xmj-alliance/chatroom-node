import * as Router from 'koa-router';

import * as jwt from 'jsonwebtoken';

import * as util from 'util';

import { auth } from '../util/auth';
import { cJWT } from '../middleware/cJWT';

import { chatroomNodeConfig } from '../util/configLoader';
import { characters, getUserInfo } from '../util/characterLoader';
const secret = chatroomNodeConfig.secret;

const verify = util.promisify(jwt.verify) // 解密

const router = new Router();

router
.post('/login', async (ctx, next) => {
    await auth(ctx);
})
.get('/info/:name', async (ctx) => {
  const name = ctx.params.name;
  const user = getUserInfo(name);
  if (user) {
    const avatar = user.avatarActive;
    const nameDisplay = user.nameDisplay;
    const role = user.role;

    ctx.status = 200;
    ctx.body = {
      name,
      avatar,
      nameDisplay,
      role
    }
  } else {
    ctx.status = 404;
    ctx.body = {
      message: "Error! User not found."
    }
  }
})
// .get('/info', cJWT, async (ctx) => {
//     const token = ctx.header.authorization  // 获取jwt
//     if (token) {
//         let payload = await verify(token.split(' ')[1], secret)  // 解密，获取payload
//         ctx.body = {
//             payload
//         }
//     } else {
//         ctx.status = 401;
//         ctx.body = {
//             message: 'token error'
//         }
//     }
// })

export const user: Router =  router;