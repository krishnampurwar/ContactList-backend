const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretkey = "this is highly secret"


//@Route Post /api/auth
//@desc log in user
//@access public
exports.loginUser =  (req, res) => {
  
  const { email , password } = req.body;
     // const email = 'krishnam1@gmail.com';
       // const password = 'krishnam1';
        if(!email || !password){
            res.status(400).json({msg: 'Please enter all fields'});
        }
        User.findOne({email})
            .then(user => {
                if(!user) return res.status(400).json({msg: 'User does not exist'});
    
                // Validate password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'});
                        const payload = {
                          user: {
                            id: user.id
                          }
                        
                        }
                        jwt.sign(
                           payload,
                            secretkey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user._id,
                                        name: user.name,
                                        email: user.email
                                    }
                                });
                            }
                        )
                    })
            })
  } 



//@Route GET /api/auth
//@desc get logged in user
//@access private
exports.getLoggedUser = async (req,res)=>{

  try{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  }catch(err){
    console.error(err.message);
    res.status(500).json({msg:'error'});
  }

}