const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "No token, unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_user);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = authMiddleware;