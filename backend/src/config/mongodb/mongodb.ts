import dns from 'node:dns';
import mongoose, { Schema, type Document, type Model } from 'mongoose';
import { MONGODB_URI, DNS_IP_ADDRESS } from '../dotenv/dotenv.js';
import { logger } from '../logger/logger.js';

// Fix querySrv ECONNREFUSED caused by local ISP DNS blocking MongoDB Atlas SRV lookup
try {
  dns.setServers(DNS_IP_ADDRESS);
} catch {
  // Ignore if custom dns set is unavailable
}

// Mongodb connection
export const connectMongoDB = async (): Promise<void> => {
  try {
    mongoose.connection.on('connected', () => {
      logger.info('MongoDB connection established successfully!');
    });

    mongoose.connection.on('error', (err) => {
      logger.error({ err }, 'MongoDB connection error encountered!');
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB connection disconnected!');
    });

    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    logger.error({ message: (error as Error).message }, 'Failed to connect to MongoDB database!');
  }
};

// Unified Log Document Interfaces
export interface ILogRequestDetails {
  method?: string;
  url?: string;
  ip?: string;
  userAgent?: string;
  userId?: string;
  query?: Record<string, unknown>;
  params?: Record<string, unknown>;
  body?: Record<string, unknown>;
}

export interface ILogResponseDetails {
  statusCode?: number;
  durationMs?: string;
  body?: Record<string, unknown>;
}

export interface ILogErrorDetails {
  code?: string;
  stack?: string;
}

export interface ILog extends Document {
  requestId?: string;
  category: 'HTTP' | 'APP' | 'ERROR';
  level: string;
  message: string;
  request?: ILogRequestDetails;
  response?: ILogResponseDetails;
  errorDetails?: ILogErrorDetails;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

const logSchema = new Schema<ILog>(
  {
    requestId: { type: String, index: true },
    category: { type: String, required: true, enum: ['HTTP', 'APP', 'ERROR'], index: true },
    level: { type: String, required: true, index: true },
    message: { type: String, required: true },
    request: {
      method: { type: String },
      url: { type: String },
      ip: { type: String },
      userAgent: { type: String },
      userId: { type: String, index: true },
      query: { type: Schema.Types.Mixed },
      params: { type: Schema.Types.Mixed },
      body: { type: Schema.Types.Mixed },
    },
    response: {
      statusCode: { type: Number, index: true },
      durationMs: { type: String },
      body: { type: Schema.Types.Mixed },
    },
    errorDetails: {
      code: { type: String },
      stack: { type: String },
    },
    metadata: { type: Schema.Types.Mixed },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  },
);

// Cache compiled models per month
const modelsCache: Record<string, Model<ILog>> = {};

// Returns a Mongoose model for the given date's monthly collection (e.g. `logs_2026_07`)

export const getMonthlyLogModel = (date: Date = new Date()): Model<ILog> => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const collectionName = `logs_${year}_${month}`;

  if (modelsCache[collectionName]) {
    return modelsCache[collectionName];
  }

  if (mongoose.models[collectionName]) {
    modelsCache[collectionName] = mongoose.models[collectionName] as Model<ILog>;
    return modelsCache[collectionName];
  }

  const model = mongoose.model<ILog>(collectionName, logSchema, collectionName);
  modelsCache[collectionName] = model;
  return model;
};
