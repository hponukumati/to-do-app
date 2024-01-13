// authenticateToken.js
const{Router}=require('express');
const jwt = require('jsonwebtoken');

const router=Router()

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1]; // Authorization: Bearer TOKEN
  if (!token) return res.sendStatus(401); // No token, unauthorized

  /*jwt.verify(token, "test", (err, user) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });*/
  jwt.verify(token, "secret", (err, decoded) => {
    console.log("verifying");
    console.log(err);
    if (err) return res.sendStatus(403); //invalid token
    console.log(decoded); //for correct token
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
