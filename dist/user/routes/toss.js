"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tossAPIRouter = void 0;
const express_1 = require("express");
const toss_1 = require("../controller/toss");
exports.tossAPIRouter = (0, express_1.Router)();
// "/payments/toss/"
exports.tossAPIRouter.get("billing_auth/success", toss_1.SuccessGetAuthKey);
exports.tossAPIRouter.get("billing_auth/fail", toss_1.FailGetgAuthKey);
//# sourceMappingURL=toss.js.map