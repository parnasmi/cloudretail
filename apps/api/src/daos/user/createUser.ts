import { sql } from '@ts-safeql/sql-tag';
import { DbClient, getRow } from '../../pool';

export const createUser = async (
  client: DbClient,
  { username, password }: { username: string; password: string },
) => {
  return getRow(
    client.query<{ id: number; username: string; password: string }>(
      sql`INSERT INTO users (username, password) VALUES (${username}, ${password}) RETURNING *`,
    ),
  );
};
