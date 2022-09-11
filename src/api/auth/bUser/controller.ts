import User from "../../buser/models/User"
import Buser from "../../buser/models/BUser"
import { v4 } from "uuid"
import md5 from "md5"
import { Request, Response } from "express"

export const renderSignin = async (req: Request, res: Response) => {
    res.render("buser/signin")
}

export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if ((email && password) == undefined) {
        res.status(400).json({
            code: 400,
            message: "입력되지 않은 필드값이 존재합니다."
        })

        return
    }
    const encrypted_password = md5(password)

    let buser_email_matched = await Buser.findOne({ where: { email: email, encrypted_password } })


    // user mismatched signin failed.
    if (buser_email_matched == null) {
        //sign in failed message have to does not include reason 
        res.status(401).render("buser/signin", {
            error: "계정을 찾을 수 없습니다."
        })

        return
    }

    // // user password mismatched
    // if (encrypted_password != buser_email_matched.getDataValue("encrypted_password")) {
    //     console.log(encrypted_password, buser_email_matched.getDataValue("encrypted_password"))
    //     //sign in failed message have to does not include reason 
    //     res.status(401).render("buser/signin", {
    //         error: "계정을 찾을 수 없습니다."
    //     })

    //     console.log("비밀번호가 일치하지 않습니다.")

    //     return

    // }

    //validation succededW
    let buser = buser_email_matched

    //save session 
    req.session.buser = buser

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
        res.status(400).render("buser/signup", {
            error: "이미 등록된 사용자 이름 입니다."
        })

        console.log("이미 등록된 사용자")
        return
    }

    //check password mismatch
    if (password1 != password2) {
        res.status(400).render("buser/signup", {
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