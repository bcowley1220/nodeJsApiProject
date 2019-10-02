const { Pool } = require("pg");
const credentials = new Pool({
  user: "postgres",
  password: "Seamus@14",
  host: "localhost",
  port: 5432,
  database: "NodeGBook",
  ssl: false
});
module.exports = credentials;
