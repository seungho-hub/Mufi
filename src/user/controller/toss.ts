import axios from "axios"
import { Request, Response } from "express";
export const SuccessGetAuthKey = (req: Request, res: Response) => {
    var options = {
        method: 'POST',
        url: `https://api.tosspayments.com/v1/billing/authorizations/${req.query.authKey}`,
        headers: {
            Authorization: 'Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==',
            'Content-Type': 'application/json'
        },
        data: { customerKey: req.query.customerKey }
    };

    axios.request(options).then(function (response) {
        res.send(response.data)
    }).catch(function (error) {
        res.send("카드 등록에 실패했습니다.")
    });
}

export const FailGetgAuthKey = (req: Request, res: Response) => {
    res.send("카드 등록에 실패했습니다.")
}