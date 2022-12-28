import { hideElement, showElement } from "./display.js";
import fetchData from "./fetchAPI.js";
import { getMenuList, setModal} from "./menu/menuApi.js";
// import {setStoreList, setModal} from "./setStoreList.js";

const storeForm = document.querySelector("#storeForm")
const tableData = document.querySelector("#table-data");
const storeModal = document.querySelector("#store-modal");
const btnAddStore = document.querySelector("#btn-add-store");

const storeModalTitle = document.querySelector("#store-modal-title");
const storeModalName = storeForm.querySelector("#store-modal-name");
const storeModalCode = storeForm.querySelector("#store-modal-code");
const storeModalDesc = storeForm.querySelector("#store-modal-description");
const storeModalZip = storeForm.querySelector("#postcode");
const storeModalAddress1 = storeForm.querySelector("#address")
const storeModalAddress2 = storeForm.querySelector("#detailAddress")
// const storeModalAddress3 = storeForm.querySelector("#extraAddress")
const storeModalUpdatedAt = document.querySelector("#store-modal-updatedAt > h5");
const storeModalElement = [storeModalName, storeModalCode, storeModalDesc, storeModalZip, storeModalAddress1, storeModalAddress2];

const divMenu = document.querySelector("#div-menu");
const BtnDivMenuClose = document.querySelector("#btn-div-menu-close");

const divSin = document.querySelector("#div-sin");
const sinValue = document.querySelector("#sin-value");


const btnDeleteStoreForm = document.querySelector("#btn-delete-store-form");
const btnSubmitStoreForm = document.querySelector("#btn-submit-store-form");

function setStoreList(table) {
    fetch("/api/buser/store")
    .then((res) => res.json())
    .then((result) => {
        result.data.forEach(element => {
            console.log(element);
            const tr = document.createElement("tr");
            const name = document.createElement("p");
            const code = document.createElement("p");
            const description = document.createElement("p");
            // const updatedAt = document.createElement("p");
            const btnEditStore = document.createElement("a");
            const btnGetMenu = document.createElement("button");
            const btnAddMenu = document.createElement("button");
            const btnAddSin = document.createElement("button");


            const btnDivSinClose = document.querySelector("#btn-div-sin-close");
            btnDivSinClose.addEventListener("click", () => {
                hideElement(divSin);
                sessionStorage.removeItem("sinCode");
                sessionStorage.removeItem("sinPublishTime");
            })

            const updatedTime = new Date(Date.parse(element.updatedAt))

            btnEditStore.classList.add("btn-edit-store");
            btnEditStore.setAttribute("href", "#store-modal")
            btnEditStore.setAttribute("uk-toggle", "");
            btnEditStore.innerHTML = '<span uk-icon="cog"></span>';
            btnEditStore.addEventListener("click", () => {
                console.log("수정 팝업 오픈");
                btnDeleteStoreForm.classList.remove("hidden");
                btnSubmitStoreForm.value = "PUT"; //edit 상태라는 표시 위한 class 추가하기
                storeForm.id = element.id;
                storeModalTitle.innerText = "매장 정보 수정";
                storeModalName.value = element.name;
                storeModalZip.value= element.zip_code;
                storeModalDesc.value = element.description;
                storeModalCode.value = element.code;
                storeModalAddress1.value = element.address;
                storeModalAddress2.value = element.detail_address;
                storeModalCode.setAttribute("readonly", "");
                storeModalUpdatedAt.innerText = `최근 수정 시각 : ${updatedTime.getFullYear()}/${updatedTime.getMonth()+1}/${updatedTime.getDate()} ${updatedTime.getHours()}:${updatedTime.getMinutes() < 10 ? "0" + updatedTime.getMinutes() : updatedTime.getMinutes()}`
                
                console.log(element.code);
            });

            const storeInfo = [name, btnAddMenu, btnGetMenu, btnAddSin, btnEditStore];
            
            btnGetMenu.addEventListener("click", () => {
                // const parent = divMenu.parentNode;
                // const nav = parent.firstChild;
                // parent.insertBefore(divMenu, parent.firstChild);
                // parent.insertBefore(nav, parent.firstChild);
                getMenuList(element.id);
                divMenu.classList.remove("hidden");
            })

            btnAddSin.classList.add("uk-button", "uk-button-default", "uk-button-small")
            btnAddSin.innerText = "코드 발급";
            btnAddSin.addEventListener("click", (event) => {
                
                if(isSinAvailable()) { //sin code가 이미 존재하면
                    alert("실패 - 이미 발급된 키가 있습니다.")
                    console.log("실패 - 이미 발급된 키가 있습니다.");

                }
                else {
                    fetch("/api/buser/sin?store_id=123")
                    .then(res => res.json())
                    .then(result => {
                        const sin = result.data
                        sinValue.innerText = sin;
                        sessionStorage.setItem('sinCode', sin);
                        sessionStorage.setItem('sinPublishTime', new Date());
                        console.log(result);
                        showElement(divSin);
                    })
                }

            })

            btnAddMenu.classList.add("btn-add-menu","uk-button", "uk-button-default", "uk-button-small")
            btnAddMenu.innerText = "메뉴 추가"
            btnAddMenu.setAttribute("href", "#menu-modal");
            btnAddMenu.setAttribute("uk-toggle","");
            btnAddMenu.addEventListener("click", setModal)


            
            name.innerText = element.name;
            code.innerText = element.code;
            description.innerText = element.description;
            btnGetMenu.classList.add("btn-get-menu","uk-button", "uk-button-default", "uk-button-small")
            btnGetMenu.innerText = "메뉴 보기"
            storeInfo.forEach(info => {
                const td = document.createElement("td");
                td.appendChild(info);
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
    })
    .catch((error) => {
        console.log(error);
    })
}

function setAddModal() {
    console.log("등록 팝업 오픈");
    btnDeleteStoreForm.classList.add("hidden");
    // btnDeleteStoreForm.style.display = "none";
    storeForm.id = "";
    storeModalTitle.innerText = "매장 신규 등록"
    btnSubmitStoreForm.value = "POST";
    console.log(btnDeleteStoreForm)
    storeModalCode.removeAttribute("readonly");
    storeModalElement.forEach(element => element.value = "")
    storeModalUpdatedAt.innerText = "";
}

async function submitForm(event) {
    const method = event.target.value; // button's value -> "POST" or "PUT" or "DELETE"
    const url = (method === "POST") ? "/api/buser/store" : `/api/buser/store?store_id=${storeForm.id}`;
    const form = new FormData(storeForm);
    const urlEncodedForm = new URLSearchParams(form)
    const headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }

    const response = await fetchData(url, method, headers, urlEncodedForm)
    const result = await response.json();

    try {
        while(tableData.firstChild) tableData.removeChild(tableData.firstChild); //reset
        setStoreList(tableData); //reset
        UIkit.modal(storeModal).hide(); //hide modal
        console.log('Success:', result);
    }
    catch {
        console.error('Error: ', error)
    }

    console.log(`${method} -> ${url}`);
}

function isSinAvailable() {
    const sin = sessionStorage.getItem('sinCode');
    const sinPublishTime = new Date(sessionStorage.getItem('sinPublishTime'));
    const nowTime = new Date();
    const gapTime = Math.floor((nowTime.getTime() - sinPublishTime.getTime()) / (1000));
    if(sin !== null && sinPublishTime !== null && gapTime <= 300) return true;
    else return false;
}

function setSinBox() {
    if(isSinAvailable()) {
        showElement(divSin);
        sinValue.innerText = sessionStorage.getItem('sinCode');
    }
}

BtnDivMenuClose.addEventListener("click", () => {hideElement(divMenu);})
btnSubmitStoreForm.addEventListener("click", submitForm);
btnDeleteStoreForm.addEventListener("click", submitForm);
btnAddStore.addEventListener("click", setAddModal);

setSinBox();
setStoreList(tableData);


