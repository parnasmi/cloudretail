import { runner as pgMigrate } from 'node-pg-migrate';
import {
  DATABASE_URL,
  MIGRATIONS_TABLE,
  MIGRATIONS_DIR,
  HTTP_PORT,
} from './constants.js';
import { pool } from './pool.js';
import { seed } from './seed.js';
import { app } from './app.js';

(async () => {
  await pgMigrate({
    databaseUrl: DATABASE_URL,
    migrationsTable: MIGRATIONS_TABLE,
    dir: MIGRATIONS_DIR,
    direction: 'up',
  });

  await seed(pool);
  app.listen(HTTP_PORT, () => {
    console.info(`Server started on port ${HTTP_PORT}`);
  });
})().catch(console.error);
