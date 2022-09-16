"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenu = exports.createMenu = exports.getMenu = void 0;
const Menu_1 = __importDefault(require("../models/Menu"));
const path_1 = __importDefault(require("path"));
const mime_types_1 = __importDefault(require("mime-types"));
const uuid_1 = require("uuid");
async function getMenu(req, res) {
    console.log("getting menu..");
    //url query string으로 id가 들어온다면 단일 menu object만,
    //query string없아 넘어왔다면 해당 user의 모든 menu object를 전송
    const user = req.session.user;
    //url query string으로 id가 지정된 경우
    if (req.query["id"]) {
        const singleMenu = await Menu_1.default.findOne({ where: { id: req.query["id"] } });
        //해당 id로 menu를 찾는데 실패한 경우
        if (singleMenu == null) {
            //response with 404 not found error
            res.status(404).json({
                code: 404,
                message: "Menu를 찾는데 실패했습니다"
            });
            //exit function
            return;
        }
        res.send(singleMenu);
        //exit function
        return;
    }
    //url query string does not pass any parameter
    const allMenu = await Menu_1.default.findAll({ where: { store_id: req.session.user.store_id } });
    if (allMenu == null) {
        res.status(404).json({
            code: 404,
            message: "empty."
        });
        //exit function
        return;
    }
    res.send(allMenu);
    return;
}
exports.getMenu = getMenu;
async function createMenu(req, res) {
    const label = req.body.label;
    if (label === undefined) {
        res.status(400).json({
            code: 400,
            message: "상품의 이름을 입력해주세요"
        });
        return;
    }
    const price = req.body.price;
    if (price === undefined) {
        res.status(400).json({
            code: 400,
            message: "상품의 가격을 입력해주세요"
        });
        return;
    }
    const description = req.body.description;
    //check any image file submited
    if (req.files == null) {
        res.status(400).json({
            code: 400,
            message: "상품의 이미지를 등록해주세요"
        });
        return;
    }
    //check menu image submitted
    if (req.files.image == undefined) {
        res.status(400).json({
            code: 400,
            message: "상품의 이미자가 제출되지 않았습니다."
        });
        return;
    }
    const image = req.files.image;
    const extension = mime_types_1.default.extension(image.mimetype);
    const filename = image.md5 + "." + extension;
    const servingPath = path_1.default.join("/images/menu", filename);
    const mediaPath = path_1.default.join(process.env.PWD, "media");
    //generate uuid for id of menu
    const id = (0, uuid_1.v4)();
    image.mv(path_1.default.join(mediaPath, servingPath))
        .then(() => {
        Menu_1.default.create({
            id,
            label,
            price,
            image: servingPath,
            store_id: req.session.user.store_id,
            description,
        });
        res.status(200).json({
            code: 200,
            message: "상품이 정상적으로 등록되었습니다."
        });
    })
        .catch(err => {
        res.status(500).json({
            code: 500,
            message: "상품의 이미지를 업로드하는 도중 문제가 발생했습니다."
        });
    });
}
exports.createMenu = createMenu;
async function deleteMenu(req, res) {
    const targetId = req.query.id;
    //get target menu instance
    const targetMenu = await Menu_1.default.findOne({
        where: {
            id: targetId,
        }
    });
    //there is no menu registered with the ID
    if (targetMenu == null) {
        res.status(404).json({
            code: 404,
            message: "상품을 찾는데 실패했습니다."
        });
        return;
    }
    //target menu is not registered by the user
    if (req.session.user.store_id != targetMenu.getDataValue("store_id")) {
        res.status(400).json({
            code: 400,
            message: "해당 상품에 대한 권한이 없습니다."
        });
        return;
    }
    //delete target menu
    targetMenu.destroy()
        .then(() => {
        res.status(200).json({
            code: 200,
            message: "정상적으로 삭제되었습니다."
        });
    })
        .catch(err => {
        res.status(500).json({
            code: 500,
            message: "Internel Server Error"
        });
    });
}
exports.deleteMenu = deleteMenu;
//# sourceMappingURL=Item.js.map