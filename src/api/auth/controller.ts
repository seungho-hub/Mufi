import { User } from "../v1/models/User"
import { Store } from "../v1/models/Store"
import { v4 } from "uuid"
import md5 from "md5"
import { Request, Response } from "express"
import session from "express-session"

export const renderSignin = async (req: Request, res: Response) => {
    res.render("signin")
}

export const signin = async (req: Request, res: Response) => {
    const email = req.body.email
    const password = req.body.password
    const encrypted_password = md5(password)


    let user_email_matched = await User.findOne({ where: { email: email } })

    // user mismatched signin failed.
    if (user_email_matched == null) {
        //sign in failed message have to does not include reason 
        res.status(401).send({
            code: 401,
            message: "계정이 일치하지 않습니다."
        })

        return
    }

    // user password mismatched
    if (encrypted_password != user_email_matched.getDataValue("encrypted_password")) {
        //sign in failed message have to does not include reason 
        res.status(401).send({
            code: 401,
            message: "계정이 일치하지 않습니다."
        })
    }

    //validation succeded
    let user = user_email_matched

    //save session 
    req.session.user = user

    res.redirect("/")
}

export const renderSignup = (req: Request, res: Response) => {
    res.render("signup")
}

export const signup = async (req: Request, res: Response) => {
    console.log(req.body)
    const username = req.body.username

    const email = req.body.email

    const password1 = req.body.password1
    const password2 = req.body.password2

    const store_id = req.body.store_id

    const registered_store = await Store.findOne({ where: { store_id } })

    //mufi에서 store등록을 해준 store id가 아닐때
    if (registered_store == null) {
        res.status(400).json({
            code: 400,
            message: "등록되지 않은 매장 번호입니다, 매장 등록을 원하시면 고객센터에 문의해주세요."
        })

        return
    }

    //password mismatch
    if (password1 != password2) {
        res.status(400).json({
            code: 400,
            message: "password mismatch",
        })

        return
    }

    //hash password
    const encrypted_password = md5(password1)

    //generate uuid for user id
    const id = v4()


    User.create({
        id,
        username,
        encrypted_password,
        email,
        store_id
    })
        .then(user => {
            res.status(200).json({
                code: 200,
            })
        })
        .catch(err => {

            res.status(400).json({
                code: 400,
                message: err.message,
            })
        })
}

export const signout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(400).json({
                code: 400,
                message: "잘못된 요청입니다."
            })
        }
    })

    res.redirect("/auth/signin")
}