import * as koaJWT from "koa-jwt";

import { chatroomNodeConfig } from '../util/configLoader';

const secret = chatroomNodeConfig.secret;

export const cJWT = koaJWT({
    secret: secret, // Should not be hardcoded
  })


