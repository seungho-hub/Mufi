import { User } from "../v1/models/User"
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

export const signup = (req: Request, res: Response) => {
    const username = req.body.username

    const email = req.body.email

    const password1 = req.body.password1
    const password2 = req.body.password2

    const store_number = req.body.store_number

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
        store_number,
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