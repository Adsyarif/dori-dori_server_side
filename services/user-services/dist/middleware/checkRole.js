"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const checkRole = (roles) => {
    return (req, res, next) => {
        const user = req.body.user;
        if (!user || !roles.includes(user.role)) {
            res.status(403).json({ message: "Access denied" });
            return;
        }
        next();
    };
};
exports.checkRole = checkRole;
