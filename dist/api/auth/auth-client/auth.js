"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authClient = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
//"/auth/client/"
exports.authClient = (0, express_1.Router)();
exports.authClient.get("/", controller_1.renderSignin);
exports.authClient.get("signout", controller_1.signout);
exports.authClient.get("/:provider", controller_1.oauthSignin);
exports.authClient.get("/:provider/callback", controller_1.oauthSinginCallback);
//# sourceMappingURL=auth.js.map