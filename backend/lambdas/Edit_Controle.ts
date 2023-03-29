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
            headers: {
              'Access-Control-Allow-Origin': '*', // or set to a specific origin
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(rowsDel),
        };
    case 'PUT':
        // Run a UPDATE query
        const queryUp = `UPDATE ${TABLE_NAME} SET type_control = "${body.type_control}",type_epreuve = "${body.type_epreuve}",regle_particuliere = "${body.regle_particuliere}",regle_calcul = ${body.regle_calcul} WHERE id =${body.id}`;
        const [rowsUp] = await connection.execute(queryUp);
        await connection.end();
        return {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*', // or set to a specific origin
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(rowsUp),
        };
    case 'POST':
        // Run a INSERT query
        const queryIns = `INSERT INTO ${TABLE_NAME} (type_control,type_epreuve,regle_particuliere,regle_calcul) VALUES ("${body.type_control}","${body.type_epreuve}","${body.regle_particuliere}",${body.regle_calcul})`;
        const [rowsIns] = await connection.execute(queryIns);
        await connection.end();
        return {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*', // or set to a specific origin
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(rowsIns),
        };
   }


  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // or set to a specific origin
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
