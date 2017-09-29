import * as Router from 'koa-router';

import * as jwt from 'jsonwebtoken';

import * as util from 'util';

import { auth } from '../middleware/auth';
import { cJWT } from '../middleware/cJWT';

import { chatroomNodeConfig } from '../util/configLoader';
const secret = chatroomNodeConfig.secret;

const verify = util.promisify(jwt.verify) // 解密

const router = new Router();

router
.post('/login', async (ctx, next) => {
    auth(ctx);
})
.get('/info', cJWT, async (ctx) => {
    const token = ctx.header.authorization  // 获取jwt
    let payload;
    if (token) {
        payload = await verify(token.split(' ')[1], secret)  // // 解密，获取payload
        ctx.body = {
            payload
        }
    } else {
        ctx.body = {
            message: 'token 错误',
            code: -1
        }
    }
})

export const user: Router =  router;