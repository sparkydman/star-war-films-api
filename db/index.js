import dotenv from 'dotenv';
import pg from 'pg';

// load environment variables
dotenv.config('.evn');

let client;
if (process.env.NODE_ENV === 'development') {
  client = new pg.Client();
} else {
  client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
}

client.on('error', (err) => console.log('DB error: ', err));

client
  .connect()
  .then(() => {
    createTable;
    console.log('Database connection established');
  })
  .catch((e) => console.log('DB error: ', e));

const createTable = client
  .query(
    `
  CREATE TABLE IF NOT EXISTS comments (
      id BIGSERIAL NOT NULL PRIMARY KEY,
      text VARCHAR(500) NOT NULL,
      film_id INT NOT NULL,
      commented_by VARCHAR,
      public_ip VARCHAR,
      commented_at DATE NOT NULL
  )
  `
  )
  .then(() => {
    console.log('Table created');
  })
  .catch((err) => {
    throw new Error(err.message);
  });

export default client;
