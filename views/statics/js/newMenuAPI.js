const storeList = document.querySelector("#store-list");
const tableData = document.querySelector("#table-data");
const modalStoreList = document.querySelector("#modal-store-list");
const btnAddMenu = document.querySelector("#btn-add-menu");
const btnDeleteMenu = document.querySelector("#btn-delete-menu");
const menuForm = document.querySelector("#menu-form");

const menuModal = document.querySelector("#menu-modal");
const menuModalTitle = document.querySelector("#menu-modal-title");
const menuModalName = menuForm.querySelector("#menu-modal-name");
const menuModalPrice = menuForm.querySelector("#menu-modal-price");
const menuModalImg = menuForm.querySelector("#menu-modal-image");
const menuModalDesc = menuForm.querySelector("#menu-modal-description");
const menuModalElement = [menuModalName, menuModalPrice, menuModalImg, menuModalDesc];

function submitForm(event) {
    event.preventDefault();
    const url = (storeForm.status === "POST") ? "/api/buser/menu" : `/api/buser/menu?store_id=${storeForm.id}`;
    sendStoreForm(url, storeForm.status) //url, method(post), 
}

btnAddMenu.addEventListener("click", () => {
    menuModalTitle.innerText = "메뉴 신규 등록";
    menuModalElement.forEach((element) => element.value = ""); //다 비우기
    btnDeleteMenu.classList.add("hidden");
    modalStoreList.removeAttribute("disabled");
    setSelectList(modalStoreList); // 매장명 셋팅
    menuForm.status = "POST";
})



menuForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitForm(event);
    UIkit.modal(menuModal).hide();
})