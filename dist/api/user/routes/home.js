"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHomeRouter = void 0;
const express_1 = require("express");
const home_1 = require("../controller/home");
exports.userHomeRouter = (0, express_1.Router)();
exports.userHomeRouter.get("/", home_1.renderHome);
//# sourceMappingURL=home.js.map