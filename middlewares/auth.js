const jwt = require('jsonwebtoken')


function authUser(req,res,next){

    const token = req.header('x-auth-token');
    if(!token) return res.status(401).json({'msg': 'access denied'});

   try{
    jwt.verify(token,process.env.TOKENKEY);
    next()
   }catch(ex){

    res.status(400).json({
        msg: 'Token in wrong'
    })

   }


}

module.exports = authUser