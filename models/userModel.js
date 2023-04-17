const jwt = require('jsonwebtoken');


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        generateWebToken: {
            type: DataTypes.VIRTUAL,
            get() {
                const token = jwt.sign({ id: this.id }, process.env.JWTPRIVATEKEY, {
                    expiresIn: '7d'
                });
                return token
            }
          
        }
    })
    return User
    
}
