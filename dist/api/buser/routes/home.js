"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bUserHomeRouter = void 0;
const express_1 = require("express");
const home_1 = require("../controller/home");
exports.bUserHomeRouter = (0, express_1.Router)();
exports.bUserHomeRouter.get("/", home_1.renderHome);
//# sourceMappingURL=home.js.map