import { runInWorkerThread } from '../../utils/workerThread/threadRunner.js';

export interface ReportColumn {
  header: string;
  key: string;
  width?: number;
}

export interface ExcelGeneratorPayload<T extends Record<string, unknown> = Record<string, unknown>> {
  fileName: string;
  data: Array<T>;
  columns: Array<ReportColumn>;
}

// Offloads Excel workbook generation to a separate OS Worker Thread (node:worker_threads)
// to ensure 0ms Event Loop blockage on the main Node.js process.

export const excelReportGenerator = async ({ fileName, data, columns }: ExcelGeneratorPayload): Promise<Buffer> => {
  const workerCode = `
    import { parentPort, workerData } from "node:worker_threads";
    import ExcelJS from "exceljs";

    async function generateExcel() {
      const { fileName, data, columns } = workerData;
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(fileName);

      worksheet.columns = columns;

      // Header Row Styling
      const headerRow = worksheet.getRow(1);
      headerRow.font = { bold: true, color: { argb: "FFFFFF" } };
      headerRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "1E3A8A" }, // Dark Blue Professional Header
      };

      // Add Data Rows
      for (const item of data) {
        worksheet.addRow(item);
      }

      const buffer = await workbook.xlsx.writeBuffer();
      parentPort.postMessage(Buffer.from(buffer));
    }

    generateExcel().catch((err) => {
      parentPort.postMessage({ error: err instanceof Error ? err.message : String(err) });
    });
  `;

  const resultBuffer = await runInWorkerThread<Buffer>({
    workerCode,
    workerData: { fileName, data, columns },
    timeoutMs: 60000, // 1 minutes timeout for massive reports
  });

  return Buffer.from(resultBuffer);
};
