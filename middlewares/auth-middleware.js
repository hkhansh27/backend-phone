const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        const token = req.header("token");
        if (token) {
            const secretKey = "phone";
            const decode = jwt.verify(token, secretKey);
            req.user = decode;
            next();
        } else {
            res.status(401).send({ Message: "Not Login" })
        }
    } catch (error) {
        req.status(401).send({ Message: "Invalid Token" })
    }
}

const authorize = (req, res, next) => {
    try {
        const { user } = req;
        if (user.role === false) res.status(403).send({ Message: "You don't have permission" })
        else next();
    } catch (error) {
        console.log("err: " + error)
        res.status(500).send({ Message: "Lỗi server" })
    }
}

module.exports = {
    authenticate,
    authorize
}