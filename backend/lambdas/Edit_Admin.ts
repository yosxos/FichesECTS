import * as AWS from 'aws-sdk';
import * as mysql from 'mysql2/promise';

const RDS_HOST = process.env.RDS_HOST || '';
const TABLE_NAME = process.env.TABLE_NAME || '';

export const handler = async (event: any = {}): Promise<any> => {
    const body = event.body ? JSON.parse(event.body) : null;
    const method = event.requestContext.httpMethod;
  try {
    const connection = await mysql.createConnection({
      host: RDS_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
   switch (method) {
    case 'DELETE':
        // Run a DELETE query
        const queryDel = `DELETE FROM ${TABLE_NAME} WHERE id = ${body.id}`;
        const [rowsDel] = await connection.execute(queryDel);
        await connection.end();
        return {
            statusCode: 200,
            body: JSON.stringify(rowsDel),
        };
    case 'POST':
        // Run a INSERT query
        const queryIns = `INSERT INTO ${TABLE_NAME} (id) VALUES (${body.id})`;
        const [rowsIns] = await connection.execute(queryIns);
        await connection.end();
        return {
            statusCode: 200,
            body: JSON.stringify(rowsIns),
        };
   }


  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
