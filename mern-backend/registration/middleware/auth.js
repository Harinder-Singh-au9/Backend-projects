const jwt = require("jsonwebtoken");
const userRegister = require("../src/models/RegisterModel");

const auth = async(req, res, next) => {

  try{
    const token = req.cookies.JWT;
    const verifyUser = jwt.verify(token, `${process.env.SECRET_KEY}`);

    // console.log(verifyUser);

    const user = await userRegister.findOne({_id: verifyUser._id});

    // console.log(user.firstname);

    req.token = token;
    req.user = user;

    next();

  }catch(err){
    res.status(401).send(err)
  }
}

module.exports = auth;