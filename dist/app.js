"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const menu_1 = require("./api/v1/routes/menu");
const auth_1 = require("./api/auth/auth");
const path_1 = __importDefault(require("path"));
exports.app = (0, express_1.default)();
exports.app.set("port", process.env.PORT || 8000);
exports.app.set("view engine", "ejs");
exports.app.set("views", path_1.default.join(__dirname, "../views"));
exports.app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.get("/", (req, res) => {
    res.redirect("/auth/signin");
});
exports.app.use("/api/v1/menu", menu_1.menu);
exports.app.use("/auth", auth_1.auth);
//# sourceMappingURL=app.js.map