require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DATABASE_URL
} = process.env;


// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });
if (process.env.NODE_ENV !== 'production') {
  console.log('Happy developing');
}
if (process.env.NODE_ENV === 'production') {
  console.log('Happy production');
}
if (DB_NAME && DB_HOST && DB_USER && DB_PASSWORD) {
  console.log('DB TODAS LAS VARIABLES');
}

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
        login: false
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        { logging: false, native: false }
      );

// URL_POSTGRESS = DATABASE_URL || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

// const sequelize = new Sequelize(URL_POSTGRESS, {
//   logging: false, 
//   native: false, 
//   dialectOptions: {
//     ssl: {
//         require: true,
//         rejectUnauthorized: false
//     }
//  },
// });

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
console.log(sequelize.models, "Sequelize 1")
const { Pokemon, Type } = sequelize.models;


// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Pokemon.belongsToMany(Type, { through: 'pokemon-type' });
Type.belongsToMany(Pokemon, { through: 'pokemon-type' });
console.log(sequelize.models, "Sequelize rompe");

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
