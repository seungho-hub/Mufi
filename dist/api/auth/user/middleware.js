"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthenticated = void 0;
const express_unless_1 = require("express-unless");
function userAuthenticated(req, res, next) {
    //authenticated
    //condition : client got session and user data
    if (req.session && req.session.user) {
        return next();
    }
    //not authenticated redirect to signin page
    else {
        res.redirect("/auth/user/signin");
        return;
    }
}
exports.userAuthenticated = userAuthenticated;
//for except authentication router
userAuthenticated.unless = express_unless_1.unless;
//# sourceMappingURL=middleware.js.map