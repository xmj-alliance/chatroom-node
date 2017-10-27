import * as Router from 'koa-router';
import * as jwt from 'jsonwebtoken';

import { chatroomNodeConfig } from './configLoader';
import { characters, getUserInfo } from './characterLoader';

const secret = chatroomNodeConfig.secret;

export const auth = async (ctx: Router.IRouterContext) => {
  const userIn = ctx.request.body;

  // eg. userIn
	// {
	// 	name: "catbon",
	// 	password: "catbon"
	// }

  let user = getUserInfo(userIn.name);

  if (user && user.password === userIn.password) {
    ctx.status = 200;
    ctx.body = {
      token: jwt.sign(
        { 
          role: user.role,
          name: user.name,
          nameDisplay: user.nameDisplay
         }
        , secret, {expiresIn: '1h'}
      ), 
      status: "SUCCESS"
    };
  } else if(user.password !== userIn.password) {
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