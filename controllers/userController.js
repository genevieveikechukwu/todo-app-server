const db = require('../models')
const User = db.users
const joi = require("joi");
const passwordComplexity = require('joi-password-complexity');

const bcrypt = require("bcrypt")

const addUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {

        return res.status(403).send({ message: "User details cannot be empty" })
    }

    try {
        const validate = (data) => {
            const fields = joi.object({
                firstName: joi.string().required().label("First Name"),
                lastName: joi.string().required().label("Last Name"),
                email: joi.string().email().required().label("Email"),
                password: passwordComplexity().required().label("Password")
            })
            return fields.validate(data)
        };

        const { error } =  validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user)
            return res.status(409).send({ message: "User with email already exists" });
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        await User.create({ ...req.body, password: hashPassword });
        res.status(201).send({ message: "User has been created successfully" });

    } catch (error) {
        res.status(500).send({ message: "Unable to create user, invalid email!!" })
        // console.log(error)
    }

};

module.exports = {
    addUser,
}