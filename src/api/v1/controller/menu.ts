import { Request, Response } from "express"
import { UploadedFile } from "express-fileupload";
import Menu from "../models/Menu";
import path from "path"
import mime from "mime-types"


export async function getMenu(req:Request, res:Response){
    console.log("getting menu..")
    //url query string으로 id가 들어온다면 단일 menu object만,
    //query string없아 넘어왔다면 해당 user의 모든 menu object를 전송
    const user = req.session.user;

    console.log("menu id :", req.query["id"])
    //url query string으로 id가 지정된 경우
    if(req.query["id"]){
        const singleMenu = await Menu.findOne({where : { id : req.query["id"]}})
        
        //해당 id로 menu를 찾는데 실패한 경우
        if(singleMenu == null){
            //response with 404 not found error
            res.status(404).json({
                code : 404,
                message : "Menu를 찾는데 실패했습니다"
            })

            //exit function
            return
        }
        
        res.send(singleMenu)

        //exit function
        return
    }

    //url query string does not pass any parameter
    const allMenu = await Menu.findAll({where : {store_id : req.session.user.store_id}})
    
    if(allMenu == null){
        res.status(404).json({
            code : 404,
            message : "empty."
        })

        //exit function
        return
    }

    res.send(allMenu)
    return
}

export function createMenu(req:Request, res:Response){
    const label = req.body.label
    if (label === undefined){
        res.status(400).json({
            code : 400,
            message : "상품의 이름을 입력해주세요"
        })    
        return
    }
    
    const price = req.body.price
    if (price === undefined){
        res.status(400).json({
            code : 400,
            message : "상품의 가격을 입력해주세요"
        })
        return
    }  

    const description = req.body.description
    
    //check any image file submited
    if(req.files == null){
        res.status(400).json({
            code : 400,
            message : "상품의 이미지를 등록해주세요"
        })
        return
    }

    //check menu image submitted
    if (req.files.image == undefined){
        res.status(400).json({
            code : 400,
            message : "상품의 이미자가 제출되지 않았습니다."
        })
        return
    }

    const image:UploadedFile = req.files.image as UploadedFile

    const extension = mime.extension(image.mimetype)
    const filename = image.md5 + "." + extension

    const servingPath = path.join("/images/menu", filename)
    const mediaPath = path.join(process.env.PWD, "media")
    
    image.mv(path.join(mediaPath, servingPath))
    .then(() => {
        Menu.create({
            label,
            price,
            image : servingPath,
            store_id : req.session.user.store_id
        })

        res.status(200).json({
            code : 200
        })
    })
    .catch(err => {
        res.status(500).json({
            code : 500,
            message : "상품의 이미지를 업로드하는 도중 문제가 발생했습니다."
        })
    })
}