const { Sequelize, DataTypes } = require('sequelize');

const user = 'postgres';
const password = 'admin';
const hostname = 'postgres-container';
const port = 5432;
const database = 'postgres';

const DATABASE_URL = `postgres://${user}:${password}@${hostname}:${port}/${database}`
console.log('DB URL: ', DATABASE_URL);

// antiguo
// const DATABASE_URL = 'postgres://saqsfimd:VgsC5qFO-6GFGxVKRMT3MO8ywph3xXow@rajje.db.elephantsql.com:5432/saqsfimd';

// Conexion a la base de datos
const sequelize = new Sequelize(DATABASE_URL);

sequelize.define('product', {
    // The following specification of the 'id' attribute could be omitted
    // since it is the default.
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10,2),
    },
    offer: {
        allowNull: false,
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0,
    }
});

module.exports = sequelize;
