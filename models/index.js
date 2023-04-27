// const dbConfig = require('../config/dbConfig');

const { Sequelize, DataTypes } = require('sequelize');

//for my local host

// const sequelize = new Sequelize('todo_db', 'postgres', '5103', {
//     host: 'localhost',
//     dialect: "postgres",
//     port: "5432"
// });

//for sqllite

// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './db.sqlite'
// });

const sequelize = new Sequelize(process.env.DATABASE_URI)


sequelize.authenticate()

    .then(()=> {
    // console.log ('connected')
        return({message: "connected"})
    })
    .catch(err => {
    // console.log('Error' + err)
        return(err)
    })
const db = {}

db.sequelize = Sequelize
db.sequelize = sequelize

db.todos = require('./todoModel.js')(sequelize, DataTypes)
db.users = require('./userModel.js')(sequelize, DataTypes)


//relationships

// db.users.hasMany(db.todos)
// db.todos.belongsTo(db.users)

db.sequelize.sync({ force: false })
    .then(() => {
    console.log('re-sync done')
    })
    
module.exports = db