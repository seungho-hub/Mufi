"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bUserRouter = void 0;
const express_1 = require("express");
const _1 = require(".");
exports.bUserRouter = (0, express_1.Router)();
exports.bUserRouter.get("/home", _1.renderHome);
exports.bUserRouter.get("/menu", _1.renderMenu);
exports.bUserRouter.get("/store", _1.renderStore);
//# sourceMappingURL=router.js.map