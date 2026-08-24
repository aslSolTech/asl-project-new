
const isDevelopment = process.env.NODE_ENV === "development";

export function bindGlobalConsole() {
  if (typeof window === "undefined") return;

  if (!isDevelopment) {
    const noop = () => {};
    // Silence non-critical console methods in production
    console.log = noop;
    console.debug = noop;
    console.info = noop;
    console.warn = noop;
    console.table = noop;
    console.trace = noop;
    // Keep console.error only if needed or silence it as well
    console.error = noop;
  }
}

export const logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment) console.log(...args);
  },
  info: (...args: unknown[]) => {
    if (isDevelopment) console.info(...args);
  },
  warn: (...args: unknown[]) => {
    if (isDevelopment) console.warn(...args);
  },
  error: (...args: unknown[]) => {
    if (isDevelopment) console.error(...args);
  },
  debug: (...args: unknown[]) => {
    if (isDevelopment) console.debug(...args);
  },
};
