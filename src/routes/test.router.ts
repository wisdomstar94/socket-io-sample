import { Router } from 'express';
import Logger from '../librarys/winston-logger/winston-logger.library';
import { getCommonResponse, getErrorResponse } from '../commons/response-structure';
import { IReqRes } from '../interfaces/req-res.interface';
import { ICustomRouter } from '../interfaces/custom-router.interface';
import path from 'path';
const router = Router();

function testRouter(params: ICustomRouter.RouterParams) {
  const { io } = params;

  router.get('/', function(req: IReqRes.CustomRequest, res, next) {
    const angularIndexPath = path.join(__dirname, '..', 'views/') + 'test.html';
    return res.sendFile(angularIndexPath);
  });
  
  router.get('/clients', function(req: IReqRes.CustomRequest, res, next) {
    const socketIds: string[] = [];
    io.sockets.sockets.forEach((value, key) => {
      // key 에 socket.id 가 담겨 있고, value 에 Socket 객체(클라이언트정보) 가 담겨 있음.
      Logger.info(`${req.logHeadTail} key => ${key}`);
      socketIds.push(value.id);
    });

    return res.json(getCommonResponse<any>({
      data: {
        socketIds,
      },
      error: null,
      uniqueAccessKey: req.uniqueAccessKey,
    }));
  });

  router.post('/colorToggle/:room', function(req: IReqRes.CustomRequest, res, next) {
    const {
      room
    } = req.params;

    if (typeof room !== 'string') {
      return res.status(400).json(getErrorResponse({
        code: 'ERROR010',
        message: `room 정보가 없습니다.`,
        uniqueAccessKey: req.uniqueAccessKey,
      }));
    }

    io.to(room).emit('colorToggle', { var1: 'a', var2: 'b' });
    return res.json(getCommonResponse<null>({
      data: null,
      error: null,
      uniqueAccessKey: req.uniqueAccessKey,
    }));
  });

  router.get('/colorToggle', function(req: IReqRes.CustomRequest, res, next) {
    Logger.info(`${req.logHeadTail} io.sockets.sockets.size ${io.sockets.sockets.size}`); // 연결된 클라이언트 갯수
  
    const keys: string[] = [];
    io.sockets.sockets.forEach((value, key) => {
      keys.push(key);
    });
    io.emit('colorToggle'); // 연결된 모든 클라이언트에게 이벤트 발송
    // io.sockets.sockets.get(keys[0])?.broadcast.emit('colorToggle'); // 선택된 소켓(클라이언트)을 제외한 나머지 클라이언트 전부에게 이벤트 발송
    return res.json(getCommonResponse<{ clientCount: number }>({
      data: {
        clientCount: io.sockets.sockets.size,
      },
      error: null,
      uniqueAccessKey: req.uniqueAccessKey,
    }));
  });

  return router;
}

export default testRouter;
