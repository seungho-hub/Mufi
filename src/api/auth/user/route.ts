import { Router } from "express"
import { oauthSignin, oauthSinginCallback, signout, renderSignin } from './controller';

//"/auth/client/"
export const authUser = Router()

authUser.get("/signin", renderSignin)
authUser.get("signout", signout)

authUser.get("/:provider", oauthSignin)

authUser.get("/:provider/callback", oauthSinginCallback)




