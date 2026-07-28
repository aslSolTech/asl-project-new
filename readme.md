# 🚀 Backend Production Architecture & API System

High-performance, scalable Node.js/TypeScript backend architecture featuring **BullMQ background queues**, **Multi-threaded Worker processing**, **Real-Time Socket.io**, **Prisma + MongoDB databases**, and **Automated Document & Media pipelines**.

---

## 🛠️ Tech Stack & Key Libraries

- **Runtime & Language**: Node.js, TypeScript, `tsx`
- **Framework**: Express.js
- **Background Queues & Caching**: Redis (`ioredis`), BullMQ v5
- **Concurrency & Offloading**: Node.js Worker Threads (`node:worker_threads`)
- **Databases**: MongoDB (Mongoose), MariaDB/MySQL (Prisma)
- **Real-Time**: Socket.io
- **Media & Document Generation**: ExcelJS, Nodemailer
- **Security & Utilities**: Helmet, CORS, Argon2, Pino Logger, Rate Limiter

---

## 🏗️ Architecture Overview

```
                        ┌────────────────────────┐
                        │   Express API Server   │
                        └───────────┬────────────┘
                                    │
                       (Dispatches Job to Redis)
                                    │
             ┌──────────────────────┼──────────────────────┐
             │                      │                      │
             ▼                      ▼                      ▼
    ┌────────────────┐    ┌────────────────┐    ┌────────────────┐
    │   emailQueue   │    │  reportQueue   │    │   mediaQueue   │
    └───────┬────────┘    └───────┬────────┘    └───────┬────────┘
            │                     │                     │
      (Concurrency 10)       (Concurrency 3)       (Concurrency 2)
            │                     │                     │
            ▼                     ▼                     ▼
    ┌────────────────┐    ┌────────────────┐    ┌────────────────┐
    │  emailWorker   │    │  reportWorker  │    │  mediaWorker   │
    └────────────────┘    └────────────────┘    └────────────────┘
```

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js**: `v18+` or `v20+`
- **Redis**: Running on `127.0.0.1:6379` (or configured host)
- **MongoDB** / **MariaDB**: Connection strings in `.env`

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development

# Redis Configuration
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/backend_db

# Email Configuration
GMAIL_ID=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_password
```

### 3. Installation & Scripts

```bash
# Install dependencies
npm install

# Start in Development Mode (Live Watch & Auto-Restart)
npm run dev

# Run Typecheck
npm run typecheck

# Build for Production
npm run build

# Start Production Server
npm run start:prod
```

---

## 📦 Background Jobs & Queues (BullMQ)

The backend provides type-safe helper dispatchers for enqueuing jobs to isolated BullMQ queues.

### 1. ✉️ Email Queue (`emailQueue`)

High-priority queue with concurrency of `10` for sending emails without blocking HTTP requests.

```typescript
import { addEmailJob } from './config/jobsqueue/bullmqConfig.js';

// Send Welcome Email
await addEmailJob('sendEmail', {
  to: 'user@example.com',
  subject: 'Welcome to Our Platform!',
  html: '<h1>Welcome aboard!</h1><p>We are glad to have you.</p>',
});
```

---

### 2. 📊 Report Generation Queue (`reportQueue`)

Dedicated queue for generating Excel, PDF, and CSV reports. Excel generation is automatically offloaded to Node.js Worker Threads.

#### A. Generate Excel Report (`excelReport`)

```typescript
import { addReportJob } from './config/jobsqueue/bullmqConfig.js';

await addReportJob('excelReport', {
  fileName: 'Monthly_Sales_Report',
  data: [
    { id: 101, name: 'Alice', amount: 1500, status: 'Paid' },
    { id: 102, name: 'Bob', amount: 2300, status: 'Pending' },
  ],
  columns: [
    { header: 'Transaction ID', key: 'id', width: 15 },
    { header: 'Customer Name', key: 'name', width: 25 },
    { header: 'Amount ($)', key: 'amount', width: 15 },
    { header: 'Payment Status', key: 'status', width: 15 },
  ],
});
```

#### B. Generate PDF Report (`pdfReport`)

```typescript
await addReportJob('pdfReport', {
  fileName: 'Invoice_1001',
  title: 'Invoice #1001',
  content: 'Customer: Alice\nTotal Amount: $1500',
});
```

#### C. Generate CSV Report (`csvReport`)

```typescript
await addReportJob('csvReport', {
  fileName: 'User_Exports',
  data: [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
  ],
  columns: ['name', 'email'],
});
```

---

### 3. 🖼️ Media & File Processing Queue (`mediaQueue`)

Low-concurrency queue (`concurrency: 2`) to process CPU-heavy media transformations safely.

#### A. Compress Image (`compressImage`)

```typescript
import { addMediaJob } from './config/jobsqueue/bullmqConfig.js';

await addMediaJob('compressImage', {
  inputPath: 'uploads/originals/profile.jpg',
  outputPath: 'uploads/compressed/profile.jpg',
  quality: 80,
});
```

#### B. Convert Image Format (`convertImageFormat`)

```typescript
await addMediaJob('convertImageFormat', {
  inputPath: 'uploads/banner.png',
  outputPath: 'uploads/banner.webp',
  format: 'webp', // 'webp' | 'png' | 'jpeg' | 'avif'
});
```

#### C. Resize Image (`resizeImage`)

```typescript
await addMediaJob('resizeImage', {
  inputPath: 'uploads/avatar.jpg',
  outputPath: 'uploads/thumbnails/avatar_thumb.jpg',
  width: 200,
  height: 200,
});
```

#### D. Create ZIP Archive (`createZipArchive`)

```typescript
await addMediaJob('createZipArchive', {
  filePaths: ['uploads/doc1.pdf', 'uploads/doc2.pdf', 'uploads/image1.jpg'],
  zipOutputPath: 'downloads/user_files_archive.zip',
});
```

---

## ⚡ Real-Time WebSockets (Socket.io)

Socket.io is integrated and exposed directly via the server instance.

```typescript
import { io } from './app/app.js';

// Emit real-time updates to connected clients
io.emit('notification', { message: 'Your report is ready for download!' });
```

---

## ⚡ Excel Generation Utility (Worker Threads)

If you need to generate Excel buffers synchronously in code without queues, you can use the multi-threaded Excel utility directly:

```typescript
import { excelReportGenerator } from './config/excel/exceljs.js';

const excelBuffer = await excelReportGenerator({
  fileName: 'CustomReport',
  data: [{ product: 'Laptop', price: 1200 }],
  columns: [
    { header: 'Product', key: 'product', width: 20 },
    { header: 'Price', key: 'price', width: 15 },
  ],
});
```

---

## 🛡️ Project Folder Structure

```
src/
├── app/                  # Express app setup & Socket.io server
├── config/
│   ├── dotenv/           # Environment variable validation
│   ├── excel/            # Worker thread Excel generator
│   ├── jobsqueue/        # BullMQ Queues, Types, & Dispatchers
│   ├── logger/           # Pino logger configuration
│   ├── mongodb/          # Mongoose connection
│   ├── multer/           # File upload middleware
│   ├── nodemailer/       # Email transport
│   ├── prisma/           # Prisma client instance
│   ├── redis/            # ioredis configuration
│   ├── socketio/         # Socket.io setup
│   └── workers/          # Background BullMQ Workers (email, report, media)
├── middlewares/          # Error handlers, rate limiters, http logger
├── utils/                # ApiResponse & AppError utilities
└── index.ts              # Server entry point & graceful shutdown
```

---

## 🤝 Graceful Shutdown

On receiving `SIGINT` or `SIGTERM` signals:

1. All BullMQ workers finish in-flight jobs and shut down cleanly (`closeAllWorkers()`).
2. Express HTTP server closes active connections before process exit.
