const { Pool } = require("pg");

const pool = new Pool({
    // PG auto detect dotenv
    // database: 'postgres',
    // user: 'brianc',
    // password: 'secret!',
    // port: 5432,
  })
module.exports = {
  query: (text, params) => pool.query(text, params),
};