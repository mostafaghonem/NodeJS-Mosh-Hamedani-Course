const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function (req , res , next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access denied');
    
    try{
        //jwt.verfy : verfy token and if verfied, return the payload
        const decoded = jwt.verify(token , config.get('jwtPrivateKey'));
        //if verfied , create in the req proprty called user 
        req.user = decoded;
        next();
    }
    catch(ex){
        res.status(400).send('Invalid token')
    }
}

// module.exports = auth;