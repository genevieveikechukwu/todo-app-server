
module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('todos', {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    message: "Please enter a Todo Item"
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false

        }

    })
    return Todo
    }
//foreignkey