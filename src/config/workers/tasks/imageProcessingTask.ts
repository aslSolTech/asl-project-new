import { parentPort, workerData } from "node:worker_threads";
import { processImageForUpload, type ProcessImageOptions } from "../../images/imgConfig.js";

async function runTask() {
  if (!parentPort || !workerData) return;

  const { imageBufferBase64, ...options } = workerData;
  const imageBuffer = Buffer.from(imageBufferBase64, "base64");

  const processedBuffer = await processImageForUpload({
    ...options,
    imageBuffer,
  });

  parentPort.postMessage(Buffer.from(processedBuffer));
}

runTask().catch((err) => {
  if (parentPort) {
    parentPort.postMessage({ error: err instanceof Error ? err.message : String(err) });
  }
});
