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
const express_session_1 = __importDefault(require("express-session"));
const DBConfig_1 = __importDefault(require("./api/config/DBConfig"));
const SessionConfig_1 = __importDefault(require("./api/config/SessionConfig"));
const MySQLStore = require("express-mysql-session")(express_session_1.default);
const middleware_1 = require("./api/auth/middleware");
exports.app = (0, express_1.default)();
//set port number
exports.app.set("port", process.env.PORT || 8000);
//set view engine 'ejs'
exports.app.set("view engine", "ejs");
//set views folder for view engine
exports.app.set("views", path_1.default.join(__dirname, "../views"));
//static serving
exports.app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
//enable body parser
exports.app.use(express_1.default.urlencoded({ extended: true }));
const sessionStore = new MySQLStore(DBConfig_1.default);
exports.app.use((0, express_session_1.default)((0, SessionConfig_1.default)(sessionStore)));
exports.app.use(middleware_1.isAuthenticated);
exports.app.get("/", (req, res) => {
    if (req.session.user) {
        res.render("home", req.session.user);
        return;
    }
    res.redirect("/auth/signin");
});
exports.app.use("/api/v1/menu", menu_1.menu);
exports.app.use("/auth", auth_1.auth);
//# sourceMappingURL=app.js.map