const jwt = require('jsonwebtoken');
const joi = require('joi')
const passwordComplexity = require('joi-password-complexity') 
const { users } = require('.');

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

const validate = (data) => {
    const fields = joi.object({
        firstName: joi.string().required().label("First Name"),
        lastName: joi.string().required().label("Last Name"),
        email: joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    })
    return fields.validate(data)
}
