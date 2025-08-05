// src/middleware/logger.js

const logStore = [];

export function customLogger(actionType, details) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    actionType,
    details,
  };

  logStore.push(logEntry);

  // You can send logs to server or store in localStorage here if needed
}

export function getLogs() {
  return logStore;
}
