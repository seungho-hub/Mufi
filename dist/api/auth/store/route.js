"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authBUser = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
//"/auth/store/"
exports.authBUser = (0, express_1.Router)();
exports.authBUser.get("/signin", controller_1.renderSignin);
exports.authBUser.post("/signin", controller_1.signin);
exports.authBUser.get("/signup", controller_1.renderSignup);
exports.authBUser.post("/signup", controller_1.signup);
exports.authBUser.delete('/signout', controller_1.signout);
//# sourceMappingURL=route.js.map