const jwt = require("jsonwebtoken");
const JWT_SECRET = "Rio";

const fetchuser = (req, res, next) => {
    // get suer form jwt token and id
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).send({ error: 'please autheicate useing valid user ' })
    }
    try {
        
        const data = jwt.verify(token, JWT_SECRET)
        
        req.user = data.user;
        next();
    }
    catch (error) {
        return res.status(401).send({ error: 'please autheicate useing valid user ' })

    }
}

module.exports = fetchuser;