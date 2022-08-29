"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Menu = [{
        "id": "542db79c-43e6-40fb-85c8-b4494987c462",
        "label": "8장 촬영 4장 인화",
        "price": 5000,
        "description": "총 8장의 사진을 촬영하여 그 중 4장을 골라 인화합니다."
    },
    {
        "id": "94c10bb0-b505-4bab-8227-cdc0a339c8eb",
        "label": "8장 촬영 6장 인화",
        "price": 7000,
        "description": "총 8장의 사진을 촬영하여 그 중 6장을 골라 인화합니다"
    }
];
function renderMenu(req, res) {
    res.json(Menu);
}
//# sourceMappingURL=enu.js.map