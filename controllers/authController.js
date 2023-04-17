const db = require("../models");
const User = db.users;
const joi = require("joi");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  try {

  const validate = (data) => {
    const schema = joi.object({
      email: joi.string().email().required().label("Email"),
      password: joi.string().required().label("Password"),
    });
    return schema.validate(data);
  };
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const user = await User.findOne({ where: {email: req.body.email} });
  if (!user)
    return res.status(401).send({ message: `User  does not exist` });
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res
      .status(401)
      .send({ message: "Please check your password and try again" });
  const token = user.generateWebToken;
   return res.status(200).send({ data: token, message: "Logged in Successfully" });
  } catch (error) {
     return res.status(500).send({message: "Couldn't signin"})
  }
};

module.exports = {
  loginUser,
};
