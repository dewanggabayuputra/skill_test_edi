const jwt = require("jsonwebtoken");
const configuration = require("../configs/config-jwt.js");

verifyToken = (req, res, next) => {
    console.log('session', req.headers)
    const bearer = req.headers.authorization
    console.log('bearer', bearer)
    let token = bearer.split(' ')[1]

    if (!token) {
        return res.status(403).send({
            message: "Error when get token!"
        });
    }
    
    jwt.verify(token, configuration.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "User unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const jwtAuth = {
  verifyToken: verifyToken
};

module.exports = jwtAuth;
