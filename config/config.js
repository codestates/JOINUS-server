require("dotenv").config();
const env = process.env;

const config = {
  development: {
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: 'joinus_dev',
    host: env.MYSQL_HOST,
    dialect: "mysql",
  },
  test: {
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: 'joinus_test',
    host: env.MYSQL_HOST,
    dialect: "mysql",
  },
  production: {
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: 'joinus',
    host: env.MYSQL_HOST,
    dialect: "mysql",
  },
};

module.exports = config;
