import { Request, Response, NextFunction } from "express"
import { unless } from "express-unless"
import User from "../../models/User"

export function userAuthenticated(req: Request, res: Response, next: NextFunction) {
    //authenticated
    //user정보에대한 session data를 가지고있음.
    if (req.session && req.session.user) {
        User.findOne({
            where: {
                id: req.session.user.id
            }
        })
            //session data의 user정보로 user를 찾을 수 있음.
            .then((user) => {
                if (user) {
                    next()
                } else {
                    res.redirect("/auth/user/signin")
                }
            })
            .catch(err => {
                res.status(500).json({
                    code: 500,
                    message: "알 수 없는 에러가 발생했습니다."
                })
            })
        return
    }
    //not authenticated redirect to signin page
    else {
        res.redirect("/auth/user/signin")
        return
    }
}

//for except authentication router
userAuthenticated.unless = unless