import { sql } from '@ts-safeql/sql-tag';
import { DbClient, getRow } from '../../pool';

export const selectById = async (client: DbClient, values: { id: string }) => {
  return getRow(
    client.query<{ id: number; token: string; user_id: number }>(
      sql`SELECT * FROM tokens WHERE token=${values.id}::uuid`,
    ),
  );
};
