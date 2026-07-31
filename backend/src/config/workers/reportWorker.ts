import { Worker, type Job } from 'bullmq';
import { redisOptions } from '../redis/redis.js';
import { logger } from '../logger/logger.js';
import { excelReportGenerator } from '../excel/exceljs.js';
import type { ExcelReportPayload, PdfReportPayload, CsvReportPayload } from '../jobsqueue/jobTypes.js';

type ReportJobPayload = ExcelReportPayload | PdfReportPayload | CsvReportPayload;

export const reportWorker = new Worker<ReportJobPayload>(
  'report-queue',
  async (job: Job<ReportJobPayload>) => {
    logger.info({ jobId: job.id, name: job.name }, 'Processing report generation job');

    switch (job.name) {
      case 'excelReport': {
        const { fileName, data, columns } = job.data as ExcelReportPayload;
        const buffer = await excelReportGenerator({ fileName, data, columns });
        logger.info({ jobId: job.id, fileName, bufferLength: buffer.length }, 'Excel report generated successfully.');
        break;
      }
      case 'pdfReport': {
        const { fileName } = job.data as PdfReportPayload;
        logger.info({ jobId: job.id, fileName }, 'PDF report task received');
        break;
      }
      case 'csvReport': {
        const { fileName } = job.data as CsvReportPayload;
        logger.info({ jobId: job.id, fileName }, 'CSV report task received');
        break;
      }
      default:
        logger.warn({ jobId: job.id, name: job.name }, 'Unknown report job type');
    }
  },
  {
    connection: redisOptions,
    concurrency: 3, // Controlled concurrency for document generation
  },
);

reportWorker.on('completed', (job) => {
  logger.info({ jobId: job.id }, 'Report worker completed job');
});

reportWorker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, err }, 'Report worker failed job');
});
