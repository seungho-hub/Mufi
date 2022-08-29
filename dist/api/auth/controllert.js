"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const index_1 = require("../v1/models/index");
const uuid_1 = require("uuid");
const md5_1 = __importDefault(require("md5"));
const signup = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password1 = req.body.password1;
    const password2 = req.body.password2;
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
    index_1.User.create({
        id,
        username,
        encrypted_password,
        email,
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
//# sourceMappingURL=controllert.js.map