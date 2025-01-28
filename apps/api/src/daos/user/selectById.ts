import { sql } from '@ts-safeql/sql-tag';
import { DbClient, getRow } from '../../pool';

export const selectById = async (client: DbClient, values: { id: number }) => {
  return getRow(
    client.query<{ id: number; username: string; password: string }>(
      sql`SELECT * FROM users WHERE id=${values.id}`,
    ),
  );
};
