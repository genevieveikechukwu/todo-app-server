const db = require('../models')
const User = db.users

const addUser = async (req, res) => {
    let info = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }

    const user = await User.create(info)
    res.status(201).send(user)
    console.log(user)
}

module.exports = {
    addUser,
}