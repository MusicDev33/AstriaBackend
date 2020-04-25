import * as winston from 'winston';
import { Logger } from 'winston';
import { format } from 'logform';

export class LogService {

  private static createLogger(level: string): Logger {
    const logFormat = format.combine(
      format.timestamp({format: 'M-D-YYYY h:mma'}),
      format.align(),
      format.printf(info => `${info.level.toUpperCase()}:${info.message} -- ${info.timestamp}`)
    );

    const logger = winston.createLogger({
      level: 'info',
      format: logFormat,
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/combined.log', level: 'info' }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
      ]
    });

    return logger;
  }

  static log(level: string, message: string) {
    const logger = this.createLogger(level);
    logger.log({level: level, message: message});
  }
}
