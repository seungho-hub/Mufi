"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeRouter = void 0;
const express_1 = require("express");
const store_1 = require("../controller/store");
const store_2 = require("../middlewares/store");
//"api/buser/store"
exports.storeRouter = (0, express_1.Router)();
//
exports.storeRouter.use(store_2.checkStoreAuthroize.unless({
    method: ["GET", "POST"]
}));
exports.storeRouter.get("/", store_1.getStore);
exports.storeRouter.post("/", store_1.createStore);
exports.storeRouter.put("/", store_1.updateStore);
exports.storeRouter.delete("/", store_1.deleteStore);
//# sourceMappingURL=store.js.map