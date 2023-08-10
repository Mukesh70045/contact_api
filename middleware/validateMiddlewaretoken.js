const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    // make a token
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {

            if (err) {
                res.status(401);
                throw new Error("user is not autorised");
            }
            // console.log(decoded);
            req.user = decoded.user;
            next();
        });
        console.log(req.user);
        if (!token) {
            res.status(401);
            throw new Error("user is not authorised or token is missing ")

        }
    }

});
module.exports = validateToken;
