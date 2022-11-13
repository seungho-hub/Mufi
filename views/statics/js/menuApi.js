const storeList = document.querySelector("#store-list");
const tableData = document.querySelector("#table-data");
const modalStoreList = document.querySelector("#modal-store-list");
const btnAddMenu = document.querySelector("#btn-add-menu");
const btnDeleteMenu = document.querySelector("#btn-delete-menu");
const menuForm = document.querySelector("#menu-form");

const menuModalTitle = document.querySelector("#menu-modal-title");
const menuModalName = menuForm.querySelector("#menu-modal-name");
const menuModalPrice = menuForm.querySelector("#menu-modal-price");
const menuModalImg = menuForm.querySelector("#menu-modal-image");
const menuModalDesc = menuForm.querySelector("#menu-modal-description");
const menuModalElement = [menuModalName, menuModalPrice, menuModalImg, menuModalDesc];



function sendMenuForm(url, method) {
    // const form = new FormData(storeForm);
    // const urlEncodedForm = new URLSearchParams(form)

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        // body: urlEncodedForm,
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('Success:', data);
        UIkit.modal(storeModal).hide();
        resetMenuData();
    })
    .catch((error) => {
        console.error('Error: ', error);
    });
}

function listMenu() {
    const selected = storeList.options[storeList.selectedIndex].value;
    fetch(`/api/buser/menu?store_id=${selected}`)
    .then(res => res.json())
    .then(result => {
        // console.log(selected)
        console.log(result.data);
        result.data.forEach(element => {
            const tr = document.createElement("tr");
            const name = document.createElement("p");
            const description = document.createElement("p");
            const updatedAt = document.createElement("p");
            const btnEditMenu = document.createElement("a");
            
            btnEditMenu.classList.add("btn-edit-menu");
            btnEditMenu.setAttribute("id", element.code);
            btnEditMenu.setAttribute("href", "#menu-modal")
            btnEditMenu.setAttribute("uk-toggle", "");
            btnEditMenu.innerHTML = '<span uk-icon="cog"></span>';
            btnEditMenu.addEventListener("click", () => {
                console.log(selected);
                console.log("수정 팝업 오픈");
                btnDeleteMenu.classList.remove("hidden");
                menuForm.status = "PUT"; //edit 상태라는 표시 위한 class 추가하기
                menuForm.id = element.id;
                menuModalTitle.innerText = "메뉴 수정";
                menuModalName.value = element.label;
                menuModalPrice.value = element.price;
                menuModalDesc.value = element.description;
                modalStoreList.setAttribute("disabled", "");
                modalStoreList.selectedIndex = menuForm.storeIndex;
            });
            console.log()
            const menuInfo = [name, description, updatedAt, btnEditMenu];
            const updatedTime = new Date(Date.parse(element.updatedAt))

            
            name.innerText = element.label;
            description.innerText = element.description;
            updatedAt.innerText = `${updatedTime.getFullYear()}/${updatedTime.getMonth()+1}/${updatedTime.getDay()} ${updatedTime.getHours()}:${updatedTime.getMinutes()}`;
            menuInfo.forEach(info => {
                const td = document.createElement("td");
                td.appendChild(info);
                tr.appendChild(td);
            });
            tableData.appendChild(tr);
        })
    })
}

function resetMenuData() {
    while(tableData.firstChild) tableData.removeChild(tableData.firstChild);
    listMenu(storeList.selectedIndex);
    menuForm.storeIndex = storeList.selectedIndex;
}

function setSelectList(select) {
    while(select.firstChild) select.removeChild(select.firstChild);
    const voidValue = document.createElement("option");
    voidValue.innerText = "매장 선택";
    select.appendChild(voidValue);
    fetch("/api/buser/store")
    .then((res) => res.json())
    .then((result) => {
        result.data.forEach(element => {
            console.log(element);
            const option = document.createElement("option");
            option.value = element.id;
            option.innerText = element.name;
            select.appendChild(option);
        })
    })
}

function saveMenu() {
    const form = new FormData(menuForm);
    const urlEncodedForm = new URLSearchParams(form)
    const storeId = modalStoreList.options[modalStoreList.selectedIndex].value;
    const url = `/api/buser/menu?store_id=${storeId}`;
    console.log(url);

    fetch(url, {
        method: "POST",
        body: form,
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('Success:', data);
        UIkit.modal(storeModal).hide();
    })
    .catch((error) => {
        console.error('Error: ', error);
    });
}

function setAddModal () {
    menuModalTitle.innerText = "메뉴 신규 등록";
    setSelectList(modalStoreList); // 매장명 셋팅
    menuModalElement.forEach((element) => element.value = ""); //다 비우기
    btnDeleteMenu.classList.add("hidden");
    modalStoreList.removeAttribute("disabled");
}

function deleteMenu(event) {
    fetch('/api/buser/menu', {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('Success:', data);
        UIkit.modal(storeModal).hide();
        resetMenuData();
    })
    .catch((error) => {
        console.error('Error: ', error);
    });
}

setSelectList(storeList);
setSelectList(modalStoreList);



btnDeleteMenu.addEventListener("click", deleteMenu);
btnAddMenu.addEventListener("click", setAddModal);
storeList.addEventListener("change", resetMenuData);
menuForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveMenu();
    UIkit.modal(storeModal).hide();
})
// listMenu();
console.log("listMenu done");