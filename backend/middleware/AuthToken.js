// authenticateToken.js
const{Router}=require('express');
const jwt = require('jsonwebtoken');

const router=Router()

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Authorization: Bearer TOKEN

  if (token == null) return res.sendStatus(401); // No token, unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user;
    next();
  });
};

router.post('/authenticatetoken',authenticateToken,(req,res)=>{
    res.json({
        message:'Validated Token',
        user:req.user
    });
});

module.exports = router;
