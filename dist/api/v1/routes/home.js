"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeRouter = void 0;
const express_1 = require("express");
const home_1 = require("../controller/home");
exports.homeRouter = (0, express_1.Router)();
exports.homeRouter.get("/", home_1.renderHome);
//# sourceMappingURL=home.js.map