"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuRouter = void 0;
const express_1 = require("express");
const menu_1 = require("../controller/menu");
const store_1 = require("../middlewares/store");
exports.menuRouter = (0, express_1.Router)();
exports.menuRouter.use(store_1.checkStoreAuthroize.unless({
    method: ["GET", "DELETE"]
}));
exports.menuRouter.get("/", menu_1.getMenu);
exports.menuRouter.post("/", menu_1.createMenu);
exports.menuRouter.delete("/", menu_1.deleteMenu);
//# sourceMappingURL=menu.js.map