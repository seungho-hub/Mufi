"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailGetgAuthKey = exports.SuccessGetAuthKey = void 0;
const axios_1 = __importDefault(require("axios"));
const SuccessGetAuthKey = (req, res) => {
    var options = {
        method: 'POST',
        url: `https://api.tosspayments.com/v1/billing/authorizations/${req.query.authKey}`,
        headers: {
            Authorization: 'Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==',
            'Content-Type': 'application/json'
        },
        data: { customerKey: req.query.customerKey }
    };
    axios_1.default.request(options).then(function (response) {
        res.send(response.data);
    }).catch(function (error) {
        res.send("카드 등록에 실패했습니다.");
    });
};
exports.SuccessGetAuthKey = SuccessGetAuthKey;
const FailGetgAuthKey = (req, res) => {
    res.send("카드 등록에 실패했습니다.");
};
exports.FailGetgAuthKey = FailGetgAuthKey;
//# sourceMappingURL=toss.js.map