import * as AWS from 'aws-sdk';
import * as mysql from 'mysql2/promise';

const RDS_HOST = process.env.RDS_HOST || '';
const TABLE_NAME = process.env.TABLE_NAME || '';

export const handler = async (event: any = {}): Promise<any> => {
  try {
    const connection = await mysql.createConnection({
      host: RDS_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    const body = event.body ? JSON.parse(event.body) : null;

    if (event.stringParameters && event.stringParameters.id) {
      // Run a SELECT query
      const query = `SELECT * FROM ${TABLE_NAME} WHERE id_user = "${body.id}"`;
      const [rows] = await connection.execute(query);
      await connection.end();
      return {
        statusCode: 200,
        body: JSON.stringify(rows),
      };
    } else {
      // Get the table name from the query string parameters
      // Run a SELECT query
      const query = `SELECT * FROM ${TABLE_NAME}`;
      const [rows] = await connection.execute(query);
      await connection.end();
      return {
        statusCode: 200,
        body: JSON.stringify(rows),
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

