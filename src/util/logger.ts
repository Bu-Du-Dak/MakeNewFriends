import fs from "fs";
import path from "path";

const LOG_DIR = path.join(__dirname, "../logs");
const LOG_FILE = path.join(LOG_DIR, "follow.log");

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

export const followLog = (message: string) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp} ${message}]`;
  console.log(logMessage);

  fs.appendFileSync(LOG_FILE, logMessage + "\n");
};
