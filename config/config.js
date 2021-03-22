const dotenv = require("dotenv");
dotenv.config();

const config = {
  development: {
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: "joinus_dev",
    port: process.env.MYSQL_PORT,
    dialect: "mysql",
    logging: false,
  },
  test: {
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: "joinus_test",
    port: process.env.MYSQL_PORT,
    dialect: "mysql",
    logging: false,
  },
  production: {
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: "joinus",
    port: process.env.MYSQL_PORT,
    dialect: "mysql",
    logging: false,
  },
};

module.exports = config;
