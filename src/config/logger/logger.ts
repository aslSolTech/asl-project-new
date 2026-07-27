import pino from 'pino';
import { Writable } from 'stream';
import { NODE_ENV, PINO_LOGGER_REDACT } from '../dotenv/dotenv.js';
import { getMonthlyLogModel } from '../mongodb/mongodb.js';

// Environment checks
const isProduction = NODE_ENV === 'production';
const isStaging = NODE_ENV === 'staging';
const isDev = NODE_ENV === 'development';
const isTest = NODE_ENV === 'test';

// Level mapping for Pino logger
const levelMap: Record<number, string> = {
  10: 'trace',
  20: 'debug',
  30: 'info',
  40: 'warn',
  50: 'error',
  60: 'fatal',
};

// Asynchronously save log entry to current month's MongoDB collection (logs_YYYY_MM)
export const saveLogToMongo = (logObj: Record<string, unknown>): void => {
  setImmediate(async () => {
    try {
      const levelNum = typeof logObj.level === 'number' ? logObj.level : 30;
      const levelName = levelMap[levelNum] || String(logObj.level || 'info');
      const message = String(logObj.msg || logObj.message || 'Log Event');
      const category = (logObj.category as 'HTTP' | 'APP' | 'ERROR') || 'APP';

      const {
        msg,
        level,
        time,
        pid,
        hostname,
        requestId,
        category: _cat,
        request,
        response,
        err,
        stack,
        code,
        ...restDetails
      } = logObj;

      const docToSave: Record<string, unknown> = {
        category,
        level: levelName,
        message,
      };

      if (typeof requestId === 'string') docToSave.requestId = requestId;
      if (request && typeof request === 'object') docToSave.request = request;
      if (response && typeof response === 'object') docToSave.response = response;

      if (typeof stack === 'string' || typeof code === 'string' || (err && typeof err === 'object')) {
        const errorDetails: Record<string, unknown> = {};
        if (typeof code === 'string') errorDetails.code = code;
        if (typeof stack === 'string') {
          errorDetails.stack = stack;
        } else if (err && typeof err === 'object' && 'stack' in (err as Record<string, unknown>)) {
          errorDetails.stack = String((err as Record<string, unknown>).stack);
        }
        if (Object.keys(errorDetails).length > 0) {
          docToSave.errorDetails = errorDetails;
        }
      }

      if (Object.keys(restDetails).length > 0) {
        docToSave.metadata = restDetails;
      }

      const LogModel = getMonthlyLogModel(new Date());
      await LogModel.create(docToSave);
    } catch {
      // Silence background log persistence errors
    }
  });
};

// Mongo Writable stream for Pino
const mongoStream = new Writable({
  write(chunk: Buffer | string, _encoding, callback) {
    try {
      const str = chunk.toString();
      const logObj = JSON.parse(str);
      saveLogToMongo(logObj);
    } catch {
      // Ignore JSON parse errors
    }
    callback();
  },
});

// Configure streams according to environment
const streams: pino.StreamEntry[] = [];

if (!isTest) {
  streams.push({ stream: mongoStream });
  if (isDev) {
    streams.push({
      stream: pino.transport({
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
          ignore: 'pid,hostname',
        },
      }),
    });
  } else if (isProduction || isStaging) {
    streams.push({ stream: process.stdout });
  }
}

// Pino logger instance
export const logger = pino(
  {
    level: isTest ? 'silent' : isDev ? 'debug' : 'info',
    base: isProduction || isStaging ? { pid: process.pid } : null,
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
      paths: PINO_LOGGER_REDACT,
      censor: "[REDACTED]",
      remove: false,
    },
  },
  pino.multistream(streams)
);

export type { Logger } from 'pino';
