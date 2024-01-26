import jwt from 'jsonwebtoken';

const JWT_SECRET = "Rio";

const fetchuser = (req, res, next) => {
    // get user from jwt token and id
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: 'please authenticate using valid user ' });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ error: 'please authenticate using valid user ' });
    }
};

export default fetchuser;
