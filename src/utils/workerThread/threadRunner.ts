import { Worker, type WorkerOptions } from "node:worker_threads";
import { logger } from "../../config/logger/logger.js";

export interface ThreadRunnerOptions {
  workerCode?: string;
  scriptPath?: string;
  workerData?: any;
  timeoutMs?: number; // Default: 60,000ms (1 min)
}

// Executes a CPU-heavy task in an isolated OS Worker Thread (node:worker_threads).
// Prevents blocking the main Node.js Event Loop during heavy processing.

export const runInWorkerThread = <T = any>({
  workerCode,
  scriptPath,
  workerData,
  timeoutMs = 60000,
}: ThreadRunnerOptions): Promise<T> => {
  return new Promise((resolve, reject) => {
    let timer: NodeJS.Timeout | null = null;
    let worker: Worker;

    try {
      if (scriptPath) {
        worker = new Worker(scriptPath, { workerData });
      } else if (workerCode) {
        worker = new Worker(workerCode, { eval: true, workerData });
      } else {
        return reject(new Error("Either workerCode or scriptPath must be provided to runInWorkerThread"));
      }
    } catch (err) {
      return reject(err);
    }

    if (timeoutMs > 0) {
      timer = setTimeout(() => {
        worker.terminate();
        reject(new Error(`Worker Thread execution timed out after ${timeoutMs}ms`));
      }, timeoutMs);
    }

    worker.on("message", (message: any) => {
      if (timer) clearTimeout(timer);

      if (message && typeof message === "object" && "error" in message) {
        reject(new Error(message.error));
      } else {
        resolve(message as T);
      }
    });

    worker.on("error", (err) => {
      if (timer) clearTimeout(timer);
      logger.error({ err }, "Worker Thread encountered an error");
      reject(err);
    });

    worker.on("exit", (code) => {
      if (timer) clearTimeout(timer);
      if (code !== 0) {
        reject(new Error(`Worker Thread exited with non-zero exit code: ${code}`));
      }
    });
  });
};
