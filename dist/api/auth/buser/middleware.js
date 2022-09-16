"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bUserAuthenticated = void 0;
const express_unless_1 = require("express-unless");
function bUserAuthenticated(req, res, next) {
    //authenticated
    //condition : client got session and user data
    if (req.session && req.session.buser) {
        return next();
    }
    //not authenticated redirect to signin page
    else {
        res.redirect("/auth/buser/signin");
        return;
    }
}
exports.bUserAuthenticated = bUserAuthenticated;
//for except authentication router
bUserAuthenticated.unless = express_unless_1.unless;
//# sourceMappingURL=middleware.js.map