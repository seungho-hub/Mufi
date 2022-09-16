"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderStore = exports.renderMenu = exports.renderHome = void 0;
async function renderHome(req, res) {
    res.render("buser/main/home");
}
exports.renderHome = renderHome;
async function renderMenu(req, res) {
    res.render("buser/menu/menu");
}
exports.renderMenu = renderMenu;
async function renderStore(req, res) {
    res.render("buser/store/store");
}
exports.renderStore = renderStore;
//# sourceMappingURL=index.js.map