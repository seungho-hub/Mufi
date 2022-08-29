"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitSignup = exports.renderSignup = exports.submitSignin = exports.renderSignin = void 0;
function renderSignin(req, res) {
    res.render("signin");
}
exports.renderSignin = renderSignin;
function submitSignin(req, res) {
    console.log(req.body);
    res.redirect("/");
}
exports.submitSignin = submitSignin;
function renderSignup(req, res) {
    res.render("signup");
}
exports.renderSignup = renderSignup;
function submitSignup(req, res) {
    console.log(req.body);
    res.redirect("/api/v1/signin");
}
exports.submitSignup = submitSignup;
//# sourceMappingURL=auth.js.map