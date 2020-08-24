

const userCtrl = {};
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey123456';

//registrar
userCtrl.signup = async (req, res)=>{
  const { email, password } = req.body;
    const newUser = new User({email, password});
    await newUser.save();
		const token = await jwt.sign({_id: newUser._id}, 'secretkey');
    res.status(200).json({token});
    res.json(['ola']);


}
userCtrl.signin = async (req, res)=>{
  const { email, password } = req.body;

  const user = await User.findOne({email});
  if (!user) return res.status(401).send('The email doen\' exists');
  if (user.password !== password) return res.status(401).send('Wrong Password');

  const token = jwt.sign({_id: user._id}, 'secretkey');

  return res.status(200).json({token});
  res.json(['ola']);
}

module.exports = userCtrl;