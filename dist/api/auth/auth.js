"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
exports.auth = (0, express_1.Router)();
exports.auth.get("/signin", controller_1.renderSignin);
exports.auth.post("/signin", controller_1.signin);
exports.auth.get("/signup", controller_1.renderSignup);
exports.auth.post("/signup", controller_1.signup);
//# sourceMappingURL=auth.js.map