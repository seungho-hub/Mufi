import { Router } from "express"
import { oauthSignin, oauthSinginCallback, signout, renderSignin } from './controller';

//"/auth/client/"
export const authClient = Router()

authClient.get("/", renderSignin)
authClient.get("signout", signout)

authClient.get("/:provider", oauthSignin)

authClient.get("/:provider/callback", oauthSinginCallback)




