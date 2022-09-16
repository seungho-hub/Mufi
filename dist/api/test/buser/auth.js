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
exports.connection = void 0;
const chai_http_1 = __importDefault(require("chai-http"));
const chai_1 = __importDefault(require("chai"));
const expect = chai_1.default.expect;
require("mocha");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const server_1 = __importDefault(require("../../../server"));
const fs_1 = __importDefault(require("fs"));
chai_1.default.use(chai_http_1.default);
const mysql2_1 = __importDefault(require("mysql2"));
exports.connection = mysql2_1.default.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PW,
});
const testRawData = fs_1.default.readFileSync(`${process.env.PWD}/src/api/test/buser/data.json`);
const { testUser, testStore } = JSON.parse(testRawData.toString());
const agent = chai_1.default.request.agent(server_1.default);
const base_url = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`;
if (server_1.default.listening) {
    describe('buser authentication', () => {
        before(() => {
            exports.connection.query(`delete from busers where username="${testUser.username}"`, (err, results) => {
                if (err) {
                    console.log("failed delete exist user before test", err);
                    return;
                }
                console.log('complete delete exist test user');
            });
        });
        it(`signup:test_user`, (done) => {
            agent
                .post("/auth/buser/signup")
                .type("form")
                .send({
                username: testUser.username,
                email: testUser.email,
                password1: testUser.password,
                password2: testUser.password
            })
                .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
        });
        it("signin:test_user", (done) => {
            agent
                .post("/auth/buser/signin")
                .type("form")
                .send({
                email: testUser.email,
                password: testUser.password
            })
                .end((err, res) => {
                expect(err).to.be.null;
                //buser home으로 redirect돼서 200
                expect(res).to.have.status(200);
                expect("Location", "/buser");
                done();
            });
        });
        it("signin:email_does not exist", (done) => {
            agent
                .post("/auth/buser/signin")
                .type("form")
                .send({
                email: "wrong_email@gmail.com",
                password: testUser.password
            })
                .end((err, res) => {
                expect(err).to.be.null;
                //buser home으로 redirect돼서 200
                expect(res).to.have.status(401);
                done();
            });
        });
        it("signin:password_does not exist", (done) => {
            agent
                .post("/auth/buser/signin")
                .type("form")
                .send({
                email: testUser.email,
                password: "wrong_password"
            })
                .end((err, res) => {
                expect(err).to.be.null;
                //buser home으로 redirect돼서 200
                expect(res).to.have.status(401);
                done();
            });
        });
        //signin된 상태에서 home에 접근했을때 
        it("home:test_user", (done) => {
            agent
                .get("/buser")
                .end((err, res) => {
                expect(err).to.be.null;
                //authenticationn에 성공해 redirect되지 않음
                expect(res).not.to.redirect;
                expect(res).to.have.status(200);
                done();
            });
        });
        it("signout:test_user", (done) => {
            agent
                .get("/auth/buser/signout")
                .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
        });
        it("home:signouted", (done) => {
            agent
                .get("/buser")
                .end((err, res) => {
                expect(err).to.be.null;
                //signout으로 session이 삭제된 상태기 때문에 redirect됨 (30x).
                expect(res).to.redirect;
                //redirect된 home의 status code는 200
                expect(res).to.have.status(200);
                done();
            });
        });
    });
}
//# sourceMappingURL=auth.js.map