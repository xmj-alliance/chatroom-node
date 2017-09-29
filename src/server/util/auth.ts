import * as Router from 'koa-router';
import * as jwt from 'jsonwebtoken';

import { chatroomNodeConfig } from './configLoader';

const secret = chatroomNodeConfig.secret;

export const auth = async (ctx: Router.IRouterContext) => {
  const user = ctx.request.body;

  if (user && user.password === 'password') {
    ctx.status = 200;
    ctx.body = {
      token: jwt.sign(
        { 
          role: 'admin',
          username: user.name
         }
        , secret, {expiresIn: '1h'}
      ), 
      status: "SUCCESS"
    };
  } else if(user.password !== 'password') {
    ctx.status = 200;
    ctx.body = {
      token: null,
      status: "INCORRECT_CREDENTIALS"
    };
  } else {
    ctx.status = 500;
    ctx.body = {
      token: null,
      status: "SERVER_ERROR"
    };
  }
  return ctx;
}