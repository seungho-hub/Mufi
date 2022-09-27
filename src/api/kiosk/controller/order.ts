import { Request, Response } from "express"
import Menu from "../../../api/models/Menu"
import User from "../../../api/models/User"
import Payment from "../../../api/models/Payment"
import { v4 } from "uuid"
import Order from "../../../api/models/Order"

import axios from "axios"

export const order = async (req: Request, res: Response) => {
    const menuId = req.query.menu_id

    console.log("menuId : ", menuId)
    if (menuId == undefined) {
        res.status(400).json({
            code: 400,
            message: "메뉴가 지정되지 않았습니다."
        })

        return
    }

    const targetMenu = await Menu.findOne({ where: { id: menuId } })

    if (targetMenu == null) {
        res.status(404).send({
            code: 404,
            message: "등록되지 않은 메뉴입니다."
        })

        return
    }

    const paymentOfUser = await Payment.findOne({ where: { user_id: req.session.kiosk.user_id } })

    if (paymentOfUser == null) {
        res.status(404).json({
            code: 404,
            message: "결제수단이 등록되지 않았습니다."
        })

        return
    }

    axios({
        method: "POST",
        url: `https://api.tosspayments.com/v1/billing/${paymentOfUser.getDataValue("toss_billing_key")}`,
        headers: {
            "Authorization": `Basic ${Buffer.from(process.env.TOSS_SECRET_KEY + ":", "utf-8").toString("base64")}`,
            "Content-type": "application/json"
        },
        data: {
            customerKey: paymentOfUser.getDataValue("user_id"),
            amount: targetMenu.getDataValue("price"),
            orderId: v4(),
            orderName: targetMenu.getDataValue("label"),
        }
    })
        .then((response) => {
            const {
                paymentKey,
                orderId,
                orderName,
                status,
                requestedAt,
                approvedAt,
                totalAmount,
                suppliedAmount,
                vat,
                method,
            } = response.data

            Order.create({
                id: orderId,
                user_id: req.session.kiosk.user_id,
                store_id: req.session.kiosk.store_id,
                paymentKey,
                order_name: orderName,
                method,
                totalAmount,
                suppliedAmount,
                vat,
                status,
                requestedAt,
                approvedAt,

            })
            res.send(response.data)
        })
        .catch(err => {
            console.log("error : ", err)
            throw err
        })
}
