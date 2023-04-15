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
        const queryUp = `UPDATE ${TABLE_NAME} SET type_control_S1 = "${body.type_control_S1}",type_epreuve_S1 = "${body.type_epreuve_S1}",regle_particuliere = "${body.regle_particuliere}",regle_calcul_S1 = ${body.regle_calcul_S1},type_control_S2 = "${body.type_control_S2}",type_epreuve_S2 = "${body.type_epreuve_S2}",regle_calcul_S2 = ${body.regle_calcul_S2} WHERE id =${body.id}`;
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
        const queryIns = `INSERT INTO ${TABLE_NAME} (type_control_S1,type_epreuve_S1,regle_particuliere,regle_calcul_S1,type_control_S2,type_epreuve_S2,regle_calcul_S2) VALUES ("${body.type_control_S1}","${body.type_epreuve_S1}","${body.regle_particuliere}",${body.regle_calcul_S1},"${body.type_control_S2}","${body.type_epreuve_S2}",${body.regle_calcul_S2})`;
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
