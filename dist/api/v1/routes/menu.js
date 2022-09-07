"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu = void 0;
const express_1 = require("express");
const menu_1 = require("../controller/menu");
exports.menu = (0, express_1.Router)();
exports.menu.get("/", menu_1.getMenu);
exports.menu.post("/", menu_1.createMenu);
exports.menu.delete("/", menu_1.deleteMenu);
//# sourceMappingURL=menu.js.map