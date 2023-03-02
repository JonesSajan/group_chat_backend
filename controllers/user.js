const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltrounds = 10;

exports.setUser = (req, res, next) => {
  // console.log("add user called")
//   console.log("****************************************",req.body);

  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  bcrypt.hash(password, saltrounds, (err, hash) => {
    User.create({
      name: name,
      email: email,
      phone: phone,
      password: hash,
    })
      .then((result) => {
        console.log(result);    
        res.status(200).json(result);
        return res;
      })
      .catch((err) => {
        err.errors[0].type === "unique violation"
          ? res.status(200).json(err.errors[0].type)
          : res.status(500).json(err);
        console.log(err);
      });
  });
};
