import { Worker } from "node:worker_threads";
import os from "node:os";
import { logger } from "../../config/logger/logger.js";
import { MAX_WORKER_THREADS } from "../../config/dotenv/dotenv.js";

export interface ThreadRunnerOptions {
  workerCode?: string;
  scriptPath?: string;
  workerData?: Record<string, unknown>
  timeoutMs?: number; // Default: 60,000ms (1 min)
  threadCount?: number; // Default: 1
}

// Auto-detect CPU Cores: Leaves 1 core free for Main Event Loop (Min: 1)
const DEFAULT_THREAD_COUNT = Math.max(1, MAX_WORKER_THREADS > 0 ? MAX_WORKER_THREADS : os.cpus().length - 1);

// Executes a CPU-heavy task in an isolated OS Worker Thread (node:worker_threads).
// Prevents blocking the main Node.js Event Loop during heavy processing.

export const runInWorkerThread = <T = unknown>({
  workerCode,
  scriptPath,
  workerData,
  timeoutMs = 60000,
  threadCount = DEFAULT_THREAD_COUNT,
}: ThreadRunnerOptions): Promise<T> => {
  return new Promise((resolve, reject) => {
    let timer: NodeJS.Timeout | null = null;
    let worker: Worker;

    try {
      if (scriptPath) {
        worker = new Worker(scriptPath, { workerData: typeof workerData === 'object' && workerData !== null ? { ...workerData, thread_count: threadCount } : { thread_count: threadCount } });
      } else if (workerCode) {
        worker = new Worker(workerCode, { eval: true, workerData: typeof workerData === 'object' && workerData !== null ? { ...workerData, thread_count: threadCount } : { thread_count: threadCount } });
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

    worker.on("message", (message: unknown) => {
      if (timer) clearTimeout(timer);

      if (message && typeof message === "object" && "error" in message) {
        const errVal = (message as Record<string, unknown>).error;
        let errMsg = "Worker Thread Error";

        if (typeof errVal === "string") {
          errMsg = errVal;
        } else if (errVal instanceof Error) {
          errMsg = errVal.message;
        } else if (errVal && typeof errVal === "object" && "message" in errVal && typeof (errVal as { message: unknown }).message === "string") {
          errMsg = (errVal as { message: string }).message;
        } else if (errVal) {
          errMsg = JSON.stringify(errVal);
        }

        reject(new Error(errMsg));
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
