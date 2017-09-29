import * as Router from 'koa-router';
import * as jwt from 'jsonwebtoken';

import { chatroomNodeConfig } from './configLoader';

const secret = chatroomNodeConfig.secret;

export const auth = async (ctx: Router.IRouterContext) => {
  const user = ctx.request.body;

  if (user && user.password === 'password') {
    ctx.status = 200;
    ctx.body = {
      token: jwt.sign({ role: 'admin' }, secret, {expiresIn: '1h'}), 
      message: "Successfully logged in!"
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      message: "Authentication failed"
    };
  }
  return ctx;
}