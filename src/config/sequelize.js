let Sequelize = require("sequelize"),

let sequelize;

if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
  sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL,

  {
  dialect: "postgres",
  protocol: "postgres",
  port: 5432,
  host: "<heroku host>",
  logging: true //false
  });

} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,
    },
  );
}

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


