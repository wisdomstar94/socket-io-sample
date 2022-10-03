import { createLogger, transports, format } from 'winston';
import appRoot from 'app-root-path';
import 'winston-daily-rotate-file';
import 'date-utils';
import 'dotenv/config';

const applyFormat = format.combine(
  format.label({ label: `[ ${process.env.PROJECT_NAME} ]` }),
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  format.colorize(),
  format.printf(info => {
    let afterMessage = ``;
    if (info.context !== undefined) {
      afterMessage += JSON.stringify(info.context);
    }

    if (info.stack !== undefined) {
      afterMessage += JSON.stringify(info.stack, undefined, 2);
    }

    return ``
      .concat(`${info.timestamp} - ${info.level}: `)
      .concat(`${info.label} `)
      .concat(`${info.message} `)
      .concat(afterMessage);
  }),
);

const Logger = createLogger({
  level: 'debug', // 최소 레벨
  // 파일저장
  transports: [
    new transports.DailyRotateFile({
      filename : appRoot + '/logs/system.log', // log 폴더에 system.log 이름으로 저장
      zippedArchive: true, // 압축여부
      json: true,
      format: applyFormat,
    }),
    // 콘솔 출력
    new transports.Console({
      format: applyFormat,
    }),
  ],
});

export default Logger;
