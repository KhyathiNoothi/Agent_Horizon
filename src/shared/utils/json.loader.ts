import * as fs from 'fs';
import * as path from 'path';

export function loadJsonData(relativePath: string, fallback: unknown) {
  const dataPath = path.join(process.cwd(), 'data', relativePath);
  if (!fs.existsSync(dataPath)) {
    return fallback;
  }

  try {
    return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  } catch (error) {
    return fallback;
  }
}
