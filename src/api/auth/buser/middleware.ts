import { Request, Response, NextFunction } from "express"
import { unless } from "express-unless"
import BUser from "../../models/BUser"
export function bUserAuthenticated(req: Request, res: Response, next: NextFunction) {
    //조건1. client가 session을 소유한 상태
    if (req.session && req.session.buser) {
        //조건2. client가 소유한 session이 db에 존재하는 buser에 대한 session이어야 함.
        BUser.findOne({
            where: {
                id: req.session.buser.id
            }
        })
            .then((buser) => {
                if (buser) {
                    next()
                }

            })
            .catch(() => {

            })
    } else {
        res.redirect("/auth/buser/signin")
        return
    }

    return
}

//for except authentication router
bUserAuthenticated.unless = unless