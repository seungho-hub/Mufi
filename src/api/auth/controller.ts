import { User } from "../v1/models/index"
import { v4 } from "uuid"
import md5 from "md5"
import { Request, Response } from "express"

export const renderSignin = (req: Request, res: Response) => {
    res.render("signup")
}

export const signin = (req: Request, res: Response) => {
    const email = req.body.email
    const password = req.body.password

    //user에서 email, password가 일치하느 ㄴuser 찾는 logic 작성중
    const encrypted = md5(password)
    res.send("signined!")
}

export const renderSignup = (req: Request, res: Response) => {
    res.render("signup")
}

export const signup = (req: Request, res: Response) => {
    const username = req.body.username

    const email = req.body.email

    const password1 = req.body.password1
    const password2 = req.body.password2

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