"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHomeRouter = void 0;
const express_1 = require("express");
const home_1 = require("./home");
const toss_1 = require("./routes/toss");
const QR_1 = require("./routes/QR");
exports.userHomeRouter = (0, express_1.Router)();
exports.userHomeRouter.get("/", home_1.renderHome);
exports.userHomeRouter.use("/payments/toss/", toss_1.tossAPIRouter);
exports.userHomeRouter.use("/qr", QR_1.QRrouter);
//# sourceMappingURL=router.js.map