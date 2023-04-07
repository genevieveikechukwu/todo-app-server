module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('todos', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false

        }
    });
   
    // Todo.belongsTo(User, { foreignKey: 'userId' });
    return Todo;
}