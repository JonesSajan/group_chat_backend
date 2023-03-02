const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltrounds = 10;
const jwt=require('jsonwebtoken')

const generateToken=(id,name)=>{
    return jwt.sign({id:id,name:name},'8770903047')
}


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

exports.loginUser = async (req, res, next) => {
    try {
        console.log("GET BY ID CALLED");
        email = req.body.email;
        password = req.body.password;
      result = await User.findAll({ where: { email: email } });

      console.log(result[0].dataValues.password)
      if(result){
       const response= await bcrypt.compare(password,result[0].dataValues.password) ;
    //    console.log(result[0].name);    
       response?res.status(200).json({msg:"Login Successfull",token:generateToken(result[0].id,result[0].name)}):res.status(401).json("incorrect password");
      }
      
    } catch (err) {
      console.log(err);
      res.status(404).send({msg:"User don't exist"})
    }
    

  };

