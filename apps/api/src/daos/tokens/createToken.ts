import { sql } from '@ts-safeql/sql-tag';
import { DbClient, getRow } from '../../pool.js';

export const createToken = async (
  client: DbClient,
  { userId }: { userId: number },
) => {
  return getRow(
    client.query<{ id: number; token: string; user_id: number }>(
      sql`INSERT INTO tokens (user_id) VALUES (${userId}) RETURNING *`,
    ),
  );
};
