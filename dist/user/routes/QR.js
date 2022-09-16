"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QRrouter = void 0;
const express_1 = require("express");
const QR_1 = require("../controller/QR");
exports.QRrouter = (0, express_1.Router)();
// "/user/qr"
exports.QRrouter.get("/", QR_1.renderQRreader);
//# sourceMappingURL=QR.js.map