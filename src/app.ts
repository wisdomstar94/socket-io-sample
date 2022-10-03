import dotenv from 'dotenv';
import { createServer } from "http";
import createError from 'http-errors';
import { Server } from "socket.io";
import express from "express";
import { instrument } from "@socket.io/admin-ui";
import socketJwtCheck from './middlewares/socket-jwt-check.middleware';
import expressErrorHandler from './middlewares/express-error-handler.middleware';
import Logger from './librarys/winston-logger/winston-logger.library';
import setRequestUUID from './middlewares/set-request-uuid.middleware';
import setLogging from './middlewares/set-logging.middleware';
import testRouter from './routes/test.router';
import disconnectionCallback from './sockets-callbacks/default/disconnect.callback';
import connectCallback from './sockets-callbacks/default/connect.callback';
import connectingCallback from './sockets-callbacks/default/connecting.callback';
import connectFailedCallback from './sockets-callbacks/default/connect-failed.callback';
import errorCallback from './sockets-callbacks/default/error.callback';
import messageCallback from './sockets-callbacks/default/message.callback';
import connectionCallback from './sockets-callbacks/default/connection.callback';
import reconnectCallback from './sockets-callbacks/default/reconnect.callback';
import reconnectingCallback from './sockets-callbacks/default/reconnecting.callback';
import reconnectFailedCallback from './sockets-callbacks/default/reconnect-failed.callback';
import 'source-map-support/register';
import eventOne from './sockets-callbacks/custom/event-one.callback';
import eventTwo from './sockets-callbacks/custom/event-two.callback';
import eventThree from './sockets-callbacks/custom/event-three.callback';
import { createAdapter } from "@socket.io/cluster-adapter";
import { setupWorker } from "@socket.io/sticky";
import 'dotenv/config';

// https://admin.socket.io/#/
// https://www.zerocho.com/category/NodeJS/post/57edfcf481d46f0015d3f0cd

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "https://admin.socket.io",
      "http://localhost:3000",
    ],
  },
});
io.adapter(createAdapter());
setupWorker(io);

// socket-io-admin-ui setting
instrument(io, {
  auth: false,
});

// socket
io
  // .use(socketJwtCheck)
  .on('connection', (socket) => {
    // default event callback
    connectionCallback({ io, socket });
    socket.on('connect', connectCallback({ io, socket }));
    socket.on('connecting', connectingCallback({ io, socket }));
    socket.on('disconnect', disconnectionCallback({ io, socket }));
    socket.on('connect_failed', connectFailedCallback({ io, socket }));
    socket.on('error', errorCallback({ io, socket }));
    socket.on('message', messageCallback({ io, socket }));
    socket.on('reconnect', reconnectCallback({io, socket }));
    socket.on('reconnecting', reconnectingCallback({ io, socket }));
    socket.on('reconnect_failed', reconnectFailedCallback({ io, socket }));

    // custom event callback
    socket.on('event-one', eventOne({ io, socket }));
    socket.on('event-two', eventTwo({ io, socket }));
    socket.on('event-three', eventThree({ io, socket }));
  });

// socket namespace 
const name1 = io.of('/name1');
name1.on('connection', (socket) => {
  Logger.info(`name1.connection!! ${socket.handshake.query.no}`);
});

// express middleware setting
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.raw());
app.use(express.text());
app.use(setRequestUUID);
app.use(setLogging);

// api setting
app.use('/api/test', testRouter({ io }));

// error handling
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(expressErrorHandler);

// server listening
server.listen(process.env.PORT, () => {
  Logger.info(`${process.env.PORT} 번 포트에서 소켓 대기중..`);
});
