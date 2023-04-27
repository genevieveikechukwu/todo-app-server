// const dbConfig = require('../config/dbConfig');

const { Sequelize, DataTypes } = require('sequelize');



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