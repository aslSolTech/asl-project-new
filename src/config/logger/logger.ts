import pino from 'pino';
import { Writable } from 'node:stream';
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

// Helper to get level string name from Pino level number or string
const getLogLevelName = (level: unknown): string => {
  if (typeof level === 'number') {
    return levelMap[level] || String(level);
  }
  if (typeof level === 'string') {
    return level;
  }
  return 'info';
};

// Helper to extract error details without deep condition nesting
const extractErrorDetails = (logObj: Record<string, unknown>): Record<string, unknown> | null => {
  const { code, stack, err } = logObj;
  const errorDetails: Record<string, unknown> = {};

  if (typeof code === 'string') {
    errorDetails.code = code;
  }

  if (typeof stack === 'string') {
    errorDetails.stack = stack;
  } else if (err && typeof err === 'object' && 'stack' in err && typeof err.stack === 'string') {
    errorDetails.stack = err.stack;
  }

  return Object.keys(errorDetails).length > 0 ? errorDetails : null;
};

// Helper to build document for MongoDB log storage
const buildLogDoc = (logObj: Record<string, unknown>): Record<string, unknown> => {
  const levelName = getLogLevelName(logObj.level);
  const rawMsg = logObj.msg ?? logObj.message;
  let message = 'Log Event';
  if (typeof rawMsg === 'string') {
    message = rawMsg;
  } else if (typeof rawMsg === 'number') {
    message = String(rawMsg);
  }
  const category = (logObj.category as 'HTTP' | 'APP' | 'ERROR') || 'APP';

  const { msg, level, time, pid, hostname, requestId, category: _cat, request, response, err, stack, code, ...restDetails } = logObj;

  const docToSave: Record<string, unknown> = {
    category,
    level: levelName,
    message,
  };

  if (typeof requestId === 'string') docToSave.requestId = requestId;
  if (request && typeof request === 'object') docToSave.request = request;
  if (response && typeof response === 'object') docToSave.response = response;

  const errorDetails = extractErrorDetails(logObj);
  if (errorDetails) {
    docToSave.errorDetails = errorDetails;
  }

  if (Object.keys(restDetails).length > 0) {
    docToSave.metadata = restDetails;
  }

  return docToSave;
};

// Asynchronously save log entry to current month's MongoDB collection (logs_YYYY_MM)
export const saveLogToMongo = (logObj: Record<string, unknown>): void => {
  setImmediate(async () => {
    try {
      const docToSave = buildLogDoc(logObj);
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

// Determine log level based on environment
const getLogLevel = (): string => {
  if (isTest) return 'silent';
  if (isDev) return 'debug';
  return 'info';
};

// Pino logger instance
export const logger = pino(
  {
    level: getLogLevel(),
    base: isProduction || isStaging ? { pid: process.pid } : null,
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
      paths: PINO_LOGGER_REDACT,
      censor: '[REDACTED]',
      remove: false,
    },
  },
  pino.multistream(streams),
);

export type { Logger } from 'pino';
