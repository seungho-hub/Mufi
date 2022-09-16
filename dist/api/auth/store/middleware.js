"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
function isAuthenticated(req, res, next) {
    if (req.path == "/auth/signin" || req.path == "/auth/signup")
        return next();
    //authenticated
    //condition : client got session and user data
    if (req.session && req.session.user) {
        return next();
    }
    //not authenticated redirect to signin page
    else {
        res.redirect("/auth/bUser/signin");
    }
}
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=middleware.js.map