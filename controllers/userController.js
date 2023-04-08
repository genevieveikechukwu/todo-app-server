const db = require('../models')
const User = db.users
const validations = db.validate
const bcrypt = require("bcrypt")

const addUser = async (req, res) => {
    try {
    const { error } = new validations(req.body);
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
        res.status(500).send({message: "Unable to create user"})
    }
  
};

module.exports = {
    addUser,
}