require('dotenv').config()

const { Sequelize,DataTypes  } = require('sequelize');

// new Sequelize(db_name, db_user, db_password)
const sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_TYPE
    }
)

// Testing Connection
// const testDBConnection = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }
// testDBConnection();

// Load Model
const model = (name) => {
    try{
        let model_path = `../models/${name.trim().toLowerCase()}`;
        let model = require(model_path)(sequelize, DataTypes);
        return model
    } catch(error) {
        throw error;
    }
}

module.exports = {sequelize, model}