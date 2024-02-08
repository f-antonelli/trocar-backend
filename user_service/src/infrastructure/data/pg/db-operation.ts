import { DBClient } from '../../../presentation/utils/database-client';

export class DBOperation {
  constructor() {}

  async executeQuery(queryString: string, values: unknown[]) {
    const client = DBClient();
    await client.connect();

    const result = await client.query(queryString, values);
    await client.end();

    return result;
  }
}
