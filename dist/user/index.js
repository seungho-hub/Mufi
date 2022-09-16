"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bUserRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
exports.bUserRouter = (0, express_1.Router)();
exports.bUserRouter.get("/home", controller_1.renderHome);
exports.bUserRouter.get("/menu", controller_1.renderMenu);
exports.bUserRouter.get("/store", controller_1.renderStore);
//# sourceMappingURL=index.js.map