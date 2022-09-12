"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
//import routers
//user router
const route_1 = require("./api/auth/user/route");
//buser router
const menu_1 = require("./api/buser/routes/menu");
const route_2 = require("./api/auth/buser/route");
const home_1 = require("./api/buser/routes/home");
const store_1 = require("./api/buser/routes/store");
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const DBConfig_1 = __importDefault(require("./api/config/DBConfig"));
const SessionConfig_1 = __importDefault(require("./api/config/SessionConfig"));
const MySQLStore = require("express-mysql-session")(express_session_1.default);
const middleware_1 = require("./api/auth/bUser/middleware");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
exports.app = (0, express_1.default)();
//set port number
exports.app.set("port", process.env.PORT || 80);
//set view engine 'ejs'
exports.app.set("view engine", "ejs");
//set views folder for view engine
exports.app.set("views", path_1.default.join(__dirname, "../views", "templates"));
//static serving
exports.app.use(express_1.default.static(path_1.default.join(__dirname, "../views", "statics")));
exports.app.use(express_1.default.static(path_1.default.join(process.env.PWD, "media")));
//enable body parser
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, express_fileupload_1.default)({}));
const sessionStore = new MySQLStore(DBConfig_1.default);
exports.app.use((0, express_session_1.default)((0, SessionConfig_1.default)(sessionStore)));
//user routing
exports.app.use("/auth/user", route_1.authUser);
//buser routing
//except auth router from session check middleware
exports.app.use("/buser", middleware_1.bUserAuthenticated.unless({
    path: [/\/auth\/*/],
}));
exports.app.use("/api/buser/menu", menu_1.menuRouter);
exports.app.use("/api/buser/store", store_1.storeRouter);
exports.app.use("/auth/buser", route_2.authBUser);
exports.app.use("/buser", home_1.homeRouter);
//# sourceMappingURL=app.js.map