import path from 'path';
import { fileURLToPath } from 'url';

process.on('unhandledRejection', (r) => { console.error('UNHANDLEDREJ', r); process.exit(1); });
process.on('uncaughtException', (e) => { console.error('UNCAUGHT', e && e.stack ? e.stack : e); process.exit(1); });

(async () => {
  try {
    const modPath = './dist/modules/orchestrator/orchestrator.tools.js';
    console.log('Importing', modPath);
    const { runStartupAnalysis } = await import(modPath);
    console.log('Invoking runStartupAnalysis...');
    const res = await runStartupAnalysis({ idea: 'test', budget: 1000, location: 'Delhi', teamSize: 2 });
    console.log('RESULT OK', JSON.stringify(res, null, 2).slice(0, 2000));
  } catch (err) {
    console.error('ERROR CAUGHT', err && err.stack ? err.stack : err);
    process.exit(1);
  }
})();
