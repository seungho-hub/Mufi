"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
exports.authUser = (0, express_1.Router)();
exports.authUser.get("/signin", controller_1.renderSignin);
exports.authUser.post("/signin", controller_1.signin);
exports.authUser.get("/signup", controller_1.renderSignup);
exports.authUser.post("/signup", controller_1.signup);
exports.authUser.delete('/signout', controller_1.signout);
//# sourceMappingURL=auth.js.map