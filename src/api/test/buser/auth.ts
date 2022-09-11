import chaiHttp from "chai-http"
import chai from "chai"
const expect = chai.expect
import "mocha"
import * as dotenv from "dotenv"
dotenv.config()
import server from '../../../server'

const base_url = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`

chai.use(chaiHttp)
const agent = chai.request.agent(server)

if(server.listening){
    describe('buser authentication', () => {
        const authBaseURL = `${base_url}/auth/buser`
        it(`signup:test_user`, (done) => {
            agent
            .post("/auth/buser/signup")
            .type("form")
            .send({
                username : "test_user",
                email : "test_email@gmail.com",
                password1 : "test_password",
                password2 : "test_password",
            })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                done()
            })
        })    
    
        it("signin:test_user", (done) => {
            agent
            .post("/auth/buser/signin")
            .type("form")
            .send({
                email : "test_email@gmail.com",
                password : "test_password"
            })
            .end((err, res) => {
                expect(err).to.be.null
                //buser home으로 redirect돼서 200
                expect(res).to.have.status(200)
                expect(res).to.have.cookie("connect.sid")
                done()
            })
        })
    
        it("signin:email_does not exist", (done) => {
            chai.request(authBaseURL)
            .post("/signin")
            .type("form")
            .send({
                email : "wrong_email@gmail.com",
                password : "test_password"
            })
            .end((err, res) => {
                expect(err).to.be.null
                //buser home으로 redirect돼서 200
                expect(res).to.have.status(401)
                done()
            })
        })
    
        it("signin:password_does not exist", (done) => {
            chai.request(authBaseURL)
            .post("/signin")
            .type("form")
            .send({
                email : "test_email@gmail.com",
                password : "wrong_password"
            })
            .end((err, res) => {
                expect(err).to.be.null
                //buser home으로 redirect돼서 200
                expect(res).to.have.status(401)
                done()
            })
        })
    });
    
}
