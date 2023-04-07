// const dbConfig = require('../config/dbConfig');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    {
        dialect: 'sqlite',
        storage: '../todo.sqlite',
          dialectOptions: {
            foreignKeys: true
        }
    });

sequelize.authenticate()

    .then(()=> {
    console.log ('connected')
    })
    .catch(err => {
    console.log('Error' + err)
    })
const db = {}

db.sequelize = Sequelize
db.sequelize = sequelize

db.todos = require('./todoModel.js')(sequelize, DataTypes)
db.users = require('./userModel.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
    .then(() => {
    console.log('re-sync done')
    })
    
module.exports = db