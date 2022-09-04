"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signout = exports.signup = exports.renderSignup = exports.signin = exports.renderSignin = void 0;
const User_1 = __importDefault(require("../v1/models/User"));
const Store_1 = __importDefault(require("../v1/models/Store"));
const uuid_1 = require("uuid");
const md5_1 = __importDefault(require("md5"));
const renderSignin = async (req, res) => {
    res.render("signin");
};
exports.renderSignin = renderSignin;
const signin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const encrypted_password = (0, md5_1.default)(password);
    let user_email_matched = await User_1.default.findOne({ where: { email: email } });
    // user mismatched signin failed.
    if (user_email_matched == null) {
        //sign in failed message have to does not include reason 
        res.status(401).send({
            code: 401,
            message: "계정이 일치하지 않습니다."
        });
        return;
    }
    // user password mismatched
    if (encrypted_password != user_email_matched.getDataValue("encrypted_password")) {
        //sign in failed message have to does not include reason 
        res.status(401).send({
            code: 401,
            message: "계정이 일치하지 않습니다."
        });
    }
    //validation succeded
    let user = user_email_matched;
    console.log(user);
    //save session 
    req.session.user = user;
    res.redirect("/");
};
exports.signin = signin;
const renderSignup = (req, res) => {
    res.render("signup");
};
exports.renderSignup = renderSignup;
const signup = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password1 = req.body.password1;
    const password2 = req.body.password2;
    const store_id = req.body.store_id;
    const registered_store = await Store_1.default.findOne({ where: { id: store_id } });
    //mufi에서 store등록을 해준 store id가 아닐때
    if (registered_store == null) {
        res.status(400).json({
            code: 400,
            message: "등록되지 않은 매장 번호입니다, 매장 등록을 원하시면 고객센터에 문의해주세요."
        });
        return;
    }
    //password mismatch
    if (password1 != password2) {
        res.status(400).json({
            code: 400,
            message: "password mismatch",
        });
        return;
    }
    //hash password
    const encrypted_password = (0, md5_1.default)(password1);
    //generate uuid for user id
    const id = (0, uuid_1.v4)();
    User_1.default.create({
        id,
        username,
        encrypted_password,
        email,
        store_id
    })
        .then(user => {
        res.status(200).json({
            code: 200,
        });
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
    res.redirect("/auth/signin");
};
exports.signout = signout;
//# sourceMappingURL=controller.js.map