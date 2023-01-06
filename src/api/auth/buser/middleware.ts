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
                } else {
                    res.redirect("/auth/buser/signin")
                }
            })
            .catch(() => {
                res.status(500).json({
                    code: 500,
                    message: "알 수 없는 에러가 발생했습니다."
                })
            })

        return
    } else {
        res.redirect("/auth/buser/signin")
        return
    }
}

//for except authentication router
bUserAuthenticated.unless = unless