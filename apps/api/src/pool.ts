import pg from 'pg';
import { DATABASE_URL } from './constants';
import { MultipleRecordsFound, NoRecordsFound } from './exceptions';

export type DbClient = pg.Client | pg.Pool | pg.PoolClient;

export const pool = new pg.Pool({
  connectionString: DATABASE_URL,
});

export const getRows = async <T>(promise: Promise<{ rows: T[] }>) => {
  const { rows } = await promise;

  return rows;
};

export function getRow<T>(promise: Promise<{ rows: T[] }>): Promise<T>;
export function getRow<T>(
  promise: Promise<{ rows: T[] }>,
  strict: false,
): Promise<T | undefined>;
export function getRow<T>(
  promise: Promise<{ rows: T[] }>,
  strict: true,
): Promise<T>;

export async function getRow<T>(
  promise: Promise<{ rows: T[] }>,
  strict = true,
) {
  const rows = await getRows(promise);

  if (strict) {
    if (rows.length === 0) {
      throw new NoRecordsFound();
    }

    if (rows.length > 1) {
      throw new MultipleRecordsFound();
    }
  }

  return rows[0];
}
