const { req, res } = require("express")
const jwt = require("jsonwebtoken")

// Middleware Jwt Auth

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token required" });
    }

    const token = authHeader.split(" ")[1]; // ambil setelah "Bearer"
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user; // simpan data user di request
        next();
    });
};

const roleAuthorization = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({message: "Acces denied"})
        }
        next();
    }
}

module.exports = { authenticateJWT, roleAuthorization };