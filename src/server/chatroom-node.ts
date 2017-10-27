import * as path from 'path';
import * as http from 'http';

import * as Koa from 'koa';
import * as Router from 'koa-router';
// import * as favicon from 'serve-favicon';
import * as logger from 'koa-logger';
import * as send from 'koa-send';
import * as serve from 'koa-static';
// import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'koa-bodyparser';
// import * as cors from 'cors';
import * as socket from 'socket.io';

// routes
import { api } from './router/api';

let app = new Koa();
let router = new Router();

const clientPath = path.join(__dirname, "../client");

app.use(logger());
app.use(bodyParser());

app.use(serve(clientPath));

// root route and sub route settings

router.use('/api', api.routes(), api.allowedMethods())
router.get('/*', async (ctx, next) => {
  await send(ctx, path.join(clientPath, 'index.html'), { root: '/' });
});

app.use(router.routes())
    .use(router.allowedMethods());

// koa listen
const server = http.createServer(app.callback());

server.listen(3000, () => {
  console.log("** koa started on port 3000. **");
});


// io
const io = socket(app);
io.listen(server);
// io.origins("*:3000");
io.on('connection', (socket) => {

  console.log(`socket ${socket.id} connected`);

  socket.on('joinroom', (room) => {
    console.log(`whateverroom: ${room}`);
    socket.join('public');

    socket.on('chat-public', (msg) => {
      socket.broadcast.to('public').emit('chat-public', msg);
    });

  })

  socket.on('leaveroom', function(room) {  
    console.log(`leaving room: ${room}`);
    socket.leave(room); 
  })


});

// io.sockets.on('connection', (socket) => {
//   socket.join('public');
//   socket.emit('', rooms, 'room1');
// });

export default app;

