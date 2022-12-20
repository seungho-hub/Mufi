import fetchData from '../fetchAPI.js';
import {divMenu} from './menuIndex.js';

// const storeList = document.querySelector("#store-list");
const menuData = document.querySelector("#menu-data");
const modalStoreList = document.querySelector("#modal-store-list");
const btnAddMenu = document.querySelector("#btn-add-menu");
const btnDeleteMenu = document.querySelector("#btn-delete-menu");
const menuForm = document.querySelector("#menu-form");

const alertModal = document.querySelector("#modal-alert");

const menuModal = document.querySelector("#menu-modal");
const menuModalTitle = document.querySelector("#menu-modal-title");
const menuModalName = menuForm.querySelector("#menu-modal-name");
const menuModalPrice = menuForm.querySelector("#menu-modal-price");
const menuModalImg = menuForm.querySelector("#menu-modal-image");
const menuModalDesc = menuForm.querySelector("#menu-modal-description");
const menuModalImgName = menuForm.querySelector("#menu-modal-image-name");
const menuModalElement = [menuModalName, menuModalPrice, menuModalImg, menuModalImgName, menuModalDesc];

//매장 불러오기 GET
//메뉴 불러오기 GET
//메뉴 추가하기 POST
//메뉴 삭제하기 DELETE

export function getMenuList(code) {
    while(menuData.firstChild) menuData.removeChild(menuData.firstChild);

    const url = `/api/buser/menu?store_id=${code}`;
    
    console.log("getMenuList url - ", url);
    fetchData(url, "GET")
    .then(result => {
        console.log(result.data);
        result.data.forEach(element => {
            const div = document.createElement("div");
            div.innerHTML = divMenu;

            const img = div.querySelector("img");
            const name = div.querySelector("h4");
            const ul = div.querySelector("ul");
            const price = div.querySelector("li#menu-price")
            const description = div.querySelector("p#menu-description");
            const updatedAt = div.querySelector("li#menu-date");
            const btnEditMenu = document.createElement("a");
            const divDelete = div.querySelector("#div-delete");
            const updatedTime = new Date(Date.parse(element.updatedAt))

            ul.classList.add("uk-comment-meta", "uk-subnav", "uk-subnav-divider", "uk-margin-remove-top");
            divDelete.appendChild(btnEditMenu)
            
            btnEditMenu.classList.add("btn-edit-menu");
            btnEditMenu.setAttribute("id", element.id);
            btnEditMenu.setAttribute("href", "#modal-alert")
            btnEditMenu.setAttribute("uk-toggle", "");
            btnEditMenu.innerHTML = '<span uk-icon="trash"></span>';
            btnEditMenu.addEventListener("click", () => {
                alertModal.id = element.id;
            });

            name.style.whiteSpace = "nowrap"
            name.classList.add("uk-comment-title", "uk-margin-remove");

            img.src = element.image;
            img.style.objectFit = "cover";
            img.style.width = "96px";
            img.style.height = "96px";
            img.style.borderRadius = "20%";

            name.innerText = element.label;
            price.innerText = element.price.toLocaleString('ko-KR') + "원";
            description.innerText = element.description;
            updatedAt.innerText = `${updatedTime.getFullYear()}/${updatedTime.getMonth()+1}/${updatedTime.getDate()} ${updatedTime.getHours()}:${updatedTime.getMinutes() < 10 ? "0" + updatedTime.getMinutes() : updatedTime.getMinutes()}`;
            menuData.appendChild(div);
        })
    })
}

function setStoreList(select) {
    while(select.firstChild) select.removeChild(select.firstChild);
    const voidValue = document.createElement("option");
    voidValue.innerText = "매장 선택";
    select.appendChild(voidValue);
    fetchData("/api/buser/store", "GET")
    .then(result => {
        console.log(result);
        result.data.forEach(element => {
            console.log(element);
            const option = document.createElement("option");
            option.value = element.id;
            option.innerText = element.name;
            select.appendChild(option);
        })
    })
    .catch(error => console.log("Error: " + error));
}

export function setModal () {
    menuModalTitle.innerText = "메뉴 신규 등록";
    setStoreList(modalStoreList); // 매장명 셋팅
    menuModalElement.forEach((element) => element.value = ""); //다 비우기
    modalStoreList.removeAttribute("disabled");
}

function addMenu(event) {
    event.preventDefault();
    const storeId = modalStoreList.options[modalStoreList.selectedIndex].value;
    const url = `/api/buser/menu?store_id=${storeId}`;
    const form = new FormData(menuForm)
    console.log(url);
    fetchData(url, "POST", form)
    .then(result => {
        console.log('Success: ', result)
        getMenuList();
    })
    .catch(error => console.error('Error: ', error))
    UIkit.modal(menuModal).hide();
}

function deleteMenu(event) {
    fetchData(`/api/buser/menu?menu_id=${alertModal.id}`,"DELETE")
    .then(result => console.log(result))
    .catch(error => console.error(error))
    
    UIkit.modal(alertModal).hide();
    getMenuList();
}

btnDeleteMenu.addEventListener("click", deleteMenu);
// btnAddMenu.addEventListener("click", setModal);
// storeList.addEventListener("change", getMenuList);
menuForm.addEventListener("submit", addMenu);

// setStoreList(storeList);

console.log("getMenuList done");