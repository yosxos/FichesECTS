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

    if (event.queryStringParameters && event.queryStringParameters.id) {
      // Run a SELECT query
      const query = `SELECT * FROM ${TABLE_NAME} WHERE id = ${event.queryStringParameters.id}`;
      const [rows] = await connection.execute(query);
      await connection.end();
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // or set to a specific origin
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rows)
      };
      return response;
    }
     else if(event.queryStringParameters && event.queryStringParameters.prenom && event.queryStringParameters.name) {
      // Run a SELECT query

      const query = `SELECT * FROM ${TABLE_NAME} WHERE prenom = "${event.queryStringParameters.prenom}" AND name = "${event.queryStringParameters.name}"`;

      const [rows] = await connection.execute(query);
      await connection.end();
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // or set to a specific origin
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rows)
      };
      return response; 
    }
    else {
      // Get the table name from the query string parameters
      // Run a SELECT query
      const query = `SELECT * FROM ${TABLE_NAME}`;
      const [rows] = await connection.execute(query);
      await connection.end();
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // or set to a specific origin
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rows)
      };
      return response;
    }
  } catch (err) {
    console.error(err);
    const response = {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // or set to a specific origin
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: 'Internal server error' }),
    };
    return response;
  }
};
