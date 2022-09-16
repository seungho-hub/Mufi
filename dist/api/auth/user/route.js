"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
//"/auth/user/"
exports.authUser = (0, express_1.Router)();
exports.authUser.get("/signin", controller_1.renderSignin);
exports.authUser.get("/signin/:provider", controller_1.oauthSignin);
exports.authUser.get("/signin/:provider/callback", controller_1.oauthSinginCallback);
exports.authUser.get("signout", controller_1.signout);
//# sourceMappingURL=route.js.map