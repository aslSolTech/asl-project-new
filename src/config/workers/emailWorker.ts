import { Worker, type Job } from "bullmq";
import { redisOptions } from "../redis/redis.js";
import { logger } from "../logger/logger.js";
import { sendMail } from "../nodemailer/nodemailer.js";
import type { EmailJobPayload } from "../jobsqueue/jobTypes.js";

export const emailWorker = new Worker<EmailJobPayload>(
  "email-queue",
  async (job: Job<EmailJobPayload>) => {
    logger.info({ jobId: job.id, name: job.name }, "Processing email job");

    const { to, subject, text, html } = job.data;
    await sendMail({
      to,
      subject,
      text: text || "",
      html: html || "",
    });

    logger.info({ jobId: job.id, to }, "Email sent successfully");
  },
  {
    connection: redisOptions,
    concurrency: 10, // High concurrency for fast network-bound jobs
  }
);

emailWorker.on("completed", (job) => {
  logger.info({ jobId: job.id }, "Email worker completed job");
});

emailWorker.on("failed", (job, err) => {
  logger.error({ jobId: job?.id, err }, "Email worker failed job");
});
