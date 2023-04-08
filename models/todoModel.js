
module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('todos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
          },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false

        }

    })
    return Todo
    }
//foreignkey