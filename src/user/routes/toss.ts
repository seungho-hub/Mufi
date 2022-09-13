import { Router } from "express"
import axios from "axios"
import { request } from "chai";

export const tossAPIRouter = Router()

tossAPIRouter.get("/payments/toss/billing_auth/success", (req, res) => {
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
        res.send("failed")
    });
})

tossAPIRouter.get("/payments/toss/billing_auth/fail", (req, res) => {
    res.send(req.query)
})