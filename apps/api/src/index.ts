import pgMigrate from 'node-pg-migrate';
import { DATABASE_URL, MIGRATIONS_TABLE, MIGRATIONS_DIR } from './constants';
import { pool } from './pool';
import { seed } from './seed';

(async () => {
  await pgMigrate({
    databaseUrl: DATABASE_URL,
    migrationsTable: MIGRATIONS_TABLE,
    dir: MIGRATIONS_DIR,
    direction: 'up',
  });

  await seed(pool);
})().catch(console.error);
