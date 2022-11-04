import { Request, Response } from "express";
import Payment from "../../models/Payment";

export const getPayments = async (req: Request, res: Response) => {
    const payments = await Payment.findAll({
        where: {
            user_id: req.session.user.id
        },
        attributes: [
            "id",
            "card_company",
            "card_type",
            "card_number",
            "card_owner_type",
            "createdAt",
        ]
    })

    res.status(200).json({
        code: 200,
        data: payments
    })
}

export const deletePayment = async (req: Request, res: Response) => {
    const targetPaymentId = req.params.id

    Payment.destroy({
        where: {
            id: targetPaymentId,
        }
    })
        .then(() => {
            res.status(200).json({
                code: 200,
                message: "결제수단이 정상적으로 제거되었습니다."
            })
        })
        .catch((err) => {
            res.status(500).json({
                code: 500,
                message: "결제수단을 제거하는도중 알 수 없는 문제가 발생했습니다"
            })
        })
}