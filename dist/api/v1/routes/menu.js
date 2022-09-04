"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu = void 0;
const express_1 = require("express");
exports.menu = (0, express_1.Router)();
const menu_1 = require("../controller/menu");
//menu router will be bounded at "/api/v1/menu"
// GET "/api/v1/menu"
exports.menu.get("/");
// POST "/api/v1/menu"
exports.menu.post("/", menu_1.createMenu);
//# sourceMappingURL=menu.js.map