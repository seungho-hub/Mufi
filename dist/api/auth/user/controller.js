"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.getAuthCodeURL = exports.oauthSinginCallback = exports.oauthSignin = exports.signout = exports.renderSignin = void 0;
const axios_1 = __importDefault(require("axios"));
const qs = __importStar(require("qs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const User_1 = __importDefault(require("../../models/User"));
const Payment_1 = __importDefault(require("../../models/Payment"));
const Errors = {
    getProfileError: new Error("failed get profile from api server")
};
async function renderSignin(req, res) {
    res.render("user/signin");
}
exports.renderSignin = renderSignin;
async function signout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            //ignore
        }
    });
}
exports.signout = signout;
async function oauthSignin(req, res) {
    const provider = req.params.provider;
    //redirect client to conscent screen
    res.redirect(getAuthCodeURL(provider));
}
exports.oauthSignin = oauthSignin;
async function oauthSinginCallback(req, res) {
    const { code } = req.query;
    const provider = req.params.provider;
    //oauth로 사용하지 않는 provider를 parameter로 넘긴 경우
    if (Object.keys(api_info).includes(provider) == false) {
        res.status(400).json({
            code: 400,
            message: "지원하지 않는 서비스입니다."
        });
        return;
    }
    //if code not sended as parameter
    // will be one of the cases below
    // 1. client try to access /auth/google/callback directly withour pass through conscent screen
    // 2. user failed authentication from oauth server  
    if (code == undefined) {
        res.status(401).json({
            code: 401,
            message: "해당 서비스 인증에 실패했습니다."
        });
        return;
    }
    //get user profile from oauth server
    let profile = await getUserProfile({ code: code.toString(), provider });
    //잘못된 접근이면 이전 과정에서 error가 발생하기 떄문에 id로 체크해도 문제가 되지 않는다.
    const existUser = await User_1.default.findOne({
        where: {
            id: profile.id
        }
    });
    if (existUser) {
        req.session.user = existUser;
        res.redirect("/user");
    }
    else {
        User_1.default.create(profile)
            .then((created_user) => {
            req.session.user = created_user;
            return Payment_1.default.create({
                user_id: created_user.get("id")
            });
        })
            .then(() => {
            res.redirect("/user");
        })
            .catch(err => {
            res.status(400).json({
                code: 400,
                message: "oauth 인증에 실패했습니다."
            });
        });
    }
}
exports.oauthSinginCallback = oauthSinginCallback;
const api_info = {
    "google": {
        app_key: process.env.GOOGLE_APP_KEY,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        auth_code_url: "https://accounts.google.com/o/oauth2/v2/auth",
        token_url: "https://oauth2.googleapis.com/token",
        profile_url: "https://people.googleapis.com/v1/people/me",
        getUserProfile: getGoogleUserProfile,
        // id, username, pfp in userinfo.profile 
        // email in userinfo.email
        scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        redirect_url: "https://localhost:8000/auth/client/google/callback",
    },
    "kakao": {
        // app_key: undefined, //kakao api는 app key를 요구하지 않음
        client_id: process.env.KAKAO_CLIENT_ID,
        client_secret: process.env.KAKAO_CLIENT_SECRET,
        auth_code_url: "https://kauth.kakao.com/oauth/authorize",
        token_url: "https://kauth.kakao.com/oauth/token",
        profile_url: "https://kapi.kakao.com/v2/user/me",
        getUserProfile: getKakaoUserProfile,
        // scope: undefined, //kakao는 default로 id, username, email, pfp를 모두 허용
        //Authorization code를 전송받을 url, token은 redirect_url로 명시만
        redirect_url: `http://${process.env.HOST}/auth/user/signin/kakao/callback`,
    }
};
function getGoogleUserProfile(accessToken) {
    return new Promise((resolve, reject) => {
        (0, axios_1.default)(api_info["google"].profile_url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                key: api_info['google'].app_key,
                personFields: "names,photos,emailAddresses"
            }
        })
            .then((resp) => {
            resolve({
                id: resp.data.names[0].metadata.source.id,
                username: resp.data.names[0].displayName,
                email: resp.data.emailAddresses[0].value,
                pfp: resp.data.photos[0].url
            });
        })
            .catch(err => {
            reject(err);
        });
    });
}
function getKakaoUserProfile(accessToken) {
    return new Promise((resolve, reject) => {
        (0, axios_1.default)(api_info["kakao"].profile_url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((resp) => {
            resolve({
                id: resp.data.id,
                username: resp.data.properties.nickname,
                email: resp.data.kakao_account.email,
                pfp: resp.data.properties.profile_image,
            });
        })
            .catch(err => {
            reject(err);
        });
    });
}
function generateURL(url, params) {
    let result = "";
    //host
    if (url[url.length - 1] == '/') {
        url = url.substring(0, url.length - 1);
    }
    result += url;
    result += "?";
    result += qs.stringify(params);
    return result;
}
//get access_token, refresh_token from oauth server with authorization code
function getTokens(auth_code) {
    const provider = auth_code.provider;
    return (0, axios_1.default)(api_info[provider].token_url, {
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded:charset=utf-8"
        },
        params: {
            code: auth_code.code,
            client_id: api_info[provider].client_id,
            client_secret: api_info[provider].client_secret,
            redirect_uri: api_info[provider].redirect_url,
            grant_type: "authorization_code",
        }
    });
}
function getAuthCodeURL(provider) {
    return generateURL(api_info[provider].auth_code_url, {
        client_id: api_info[provider].client_id,
        redirect_uri: api_info[provider].redirect_url,
        response_type: "code",
        scope: api_info[provider].scope
    });
}
exports.getAuthCodeURL = getAuthCodeURL;
//get user information from oauth api server with authorization code
function getUserProfile(auth_code) {
    return new Promise((resolve, reject) => {
        getTokens(auth_code)
            .then((token_resp) => {
            const accessToken = token_resp.data.access_token;
            return api_info[auth_code.provider].getUserProfile(accessToken);
        })
            .then((profile) => {
            profile.auth_code = auth_code.code;
            resolve(profile);
        })
            .catch(err => {
            reject(err);
        });
    });
}
exports.getUserProfile = getUserProfile;
//# sourceMappingURL=controller.js.map