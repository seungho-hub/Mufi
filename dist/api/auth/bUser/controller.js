"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signout = exports.signup = exports.renderSignup = exports.signin = exports.renderSignin = void 0;
const BUser_1 = __importDefault(require("../../models/BUser"));
const uuid_1 = require("uuid");
const md5_1 = __importDefault(require("md5"));
const renderSignin = async (req, res) => {
    res.render("buser/auth/signin");
};
exports.renderSignin = renderSignin;
const signin = async (req, res) => {
    const { email, password } = req.body;
    if ((email && password) == undefined) {
        res.status(400).json({
            code: 400,
            message: "입력되지 않은 필드값이 존재합니다."
        });
        return;
    }
    const encrypted_password = (0, md5_1.default)(password);
    let buser_email_matched = await BUser_1.default.findOne({ where: { email: email, encrypted_password } });
    // user mismatched signin failed.
    if (buser_email_matched == null) {
        //sign in failed message have to does not include reason 
        res.status(401).render("buser/auth/signin", {
            error: "계정을 찾을 수 없습니다."
        });
        return;
    }
    // // user password mismatched
    // if (encrypted_password != buser_email_matched.getDataValue("encrypted_password")) {
    //     console.log(encrypted_password, buser_email_matched.getDataValue("encrypted_password"))
    //     //sign in failed message have to does not include reason 
    //     res.status(401).render("buser/signin", {
    //         error: "계정을 찾을 수 없습니다."
    //     })
    //     console.log("비밀번호가 일치하지 않습니다.")
    //     return
    // }
    //validation succededW
    let buser = buser_email_matched;
    //save session 
    req.session.buser = buser;
    res.redirect("/buser/home");
};
exports.signin = signin;
const renderSignup = (req, res) => {
    res.render("buser/auth/signup");
};
exports.renderSignup = renderSignup;
const signup = async (req, res) => {
    const { username, email, password1, password2 } = req.body;
    //check empty value
    if (!(username && email && password1 && password2)) {
        res.status(400).json({
            code: 400,
            message: "입력되지 않은 정보가 있습니다."
        });
        return;
    }
    const usernameOverlabUser = await BUser_1.default.findOne({ where: { username } });
    //user already exist with username
    if (usernameOverlabUser) {
        res.status(400).render("buser/auth/signup", {
            error: "이미 등록된 사용자 이름 입니다."
        });
        return;
    }
    //check password mismatch
    if (password1 != password2) {
        res.status(400).render("buser/auth/signup", {
            error: "비밀번호가 일치하지 않습니다."
        });
        return;
    }
    //hash password
    const encrypted_password = (0, md5_1.default)(password1);
    //generate uuid for user id
    const id = (0, uuid_1.v4)();
    BUser_1.default.create({
        id,
        username,
        encrypted_password,
        email,
    })
        .then(buser => {
        req.session.buser = buser;
        res.redirect("/auth/buser/signin");
    })
        .catch(err => {
        res.status(400).json({
            code: 400,
            message: err.message,
        });
    });
};
exports.signup = signup;
const signout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(400).json({
                code: 400,
                message: "잘못된 요청입니다."
            });
        }
    });
    res.clearCookie("connect.sid");
    res.redirect("/auth/buser/signin");
};
exports.signout = signout;
//# sourceMappingURL=controller.js.map