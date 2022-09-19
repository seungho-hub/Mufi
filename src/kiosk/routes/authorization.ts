import { Router } from "express"
import { storeAuthorization } from "../controller/authorization"
const AuthorizationRouter = Router()

//store권한 위임. pin번호를 입력하면 해당 store의 permission session을 부여한다.
AuthorizationRouter.post("/store", storeAuthorization)

//user의 권한 위임. qr code redirect를 통해 user의 모든 session을 부여한다.
// AuthorizationRouter.post("/user", )

export default AuthorizationRouter