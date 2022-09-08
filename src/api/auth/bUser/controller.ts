import User from "../../buser/models/User"
import Buser from "../../buser/models/BUser"
import { v4 } from "uuid"
import md5 from "md5"
import { Request, Response } from "express"

export const renderSignin = async (req: Request, res: Response) => {
    res.render("buser/signin")
}

export const signin = async (req: Request, res: Response) => {
    const email = req.body.email
    const password = req.body.password

    const encrypted_password = md5(password)


    let user_email_matched = await Buser.findOne({ where: { email: email } })

    // user mismatched signin failed.
    if (user_email_matched == null) {
        //sign in failed message have to does not include reason 
        res.render("buser/signin", {
            error: "계정을 찾을 수 없습니다."
        })

        return
    }

    // user password mismatched
    if (encrypted_password != user_email_matched.getDataValue("encrypted_password")) {
        //sign in failed message have to does not include reason 
        res.render("buser/signin", {
            error: "계정을 찾을 수 없습니다."
        })

        return

    }

    //validation succededW
    let user = user_email_matched

    //save session 
    req.session.user = user

    res.redirect("/buser")
}

export const renderSignup = (req: Request, res: Response) => {
    res.render("buser/signup")
}

export const signup = async (req: Request, res: Response) => {
    const { username, email, password1, password2 } = req.body

    //check empty value
    if (!(username && email && password1 && password2)) {
        res.status(400).json({
            code: 400,
            message: "입력되지 않은 정보가 있습니다."
        })

        return
    }

    const usernameOverlabUser = await Buser.findOne({ where: { username } })


    //user already exist with username
    if (usernameOverlabUser) {
        res.render("buser/signup", {
            error: "이미 등록된 사용자 이름 입니다."
        })
        return
    }

    //check password mismatch
    if (password1 != password2) {
        res.render("buser/signup", {
            error: "비밀번호가 일치하지 않습니다."
        })

        return
    }


    //hash password
    const encrypted_password = md5(password1)

    //generate uuid for user id
    const id = v4()


    Buser.create({
        id,
        username,
        encrypted_password,
        email,
    })
        .then(buser => {
            req.session.buser = buser

            res.redirect("/auth/buser/signin")
        })
        .catch(err => {
            console.log(err)
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

    res.clearCookie("connect.sid")

    res.redirect("/auth/buser/signin")
}