const storeList = document.querySelector("#store-list");
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

function getAPI(url, method, form) {
    const head = {method : method};
    if(form !== undefined && (head === "POST" || head ==="PUT")) {
        const newForm = new FormData(form);
        head.body = newForm;
        fetch(url, head)
        .then(res => res.json())
        .then(result => {return result})
        .catch(error => {return error})
    }
    else console.log("API 불러오기 실패");
}

//매장 불러오기 GET

//메뉴 불러오기 GET
//메뉴 추가하기 POST
//메뉴 삭제하기 DELETE

function sendMenuForm(url, method, form) {
    const form = new FormData(menuForm);
    // const urlEncodedForm = new URLSearchParams(form)
    console.log(form)
    fetch(url, {
        method: method,
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        // },
        body: form,
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('Success:', data);
        UIkit.modal(menuModal).hide();
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
            const div = document.createElement("div");
            div.innerHTML = 
            `<div class="uk-padding-small">
                <div class="uk-grid-medium uk-flex-middle" uk-grid>
                    <div>
                        <img src="" alt="">
                    </div>
                    <div class="uk-width-expand">
                        <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">Author</a></h4>
                        <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                            <li id="menu-price">12 days ago</li>
                            <li id="menu-date">Reply</li>
                        </ul>
                    </div>
                    <div class="uk-width-auto">
                        <p id="menu-description">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div class="uk-width-auto" id="div-delete">
                    </div>
                </div>
            </div>`;

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
            updatedAt.innerText = `${updatedTime.getFullYear()}/${updatedTime.getMonth()+1}/${updatedTime.getDay()} ${updatedTime.getHours()}:${updatedTime.getMinutes()}`;
            menuData.appendChild(div);
            console.log('등록');
        })
    })
}

function resetMenuData() {
    while(menuData.firstChild) menuData.removeChild(menuData.firstChild);
    menuForm.storeIndex = storeList.selectedIndex;
    listMenu();
}

function setSelectList(select) { //option 정리 후, 매장 정보 불러와서 추가하는 역할
    while(select.firstChild) select.removeChild(select.firstChild);
    const voidValue = document.createElement("option");
    voidValue.innerText = "매장 선택";
    select.appendChild(voidValue);
    getAPI("/api/buser/store", "GET")
    fetch("/api/buser/store")
    .then((res) => res.json())
    .then((result) => {
        console.log(result);
        result.data.forEach(element => {
            console.log(element);
            const option = document.createElement("option");
            option.value = element.id;
            option.innerText = element.name;
            select.appendChild(option);
        })
    })
}

function setAddModal () {
    menuModalTitle.innerText = "메뉴 신규 등록";
    setSelectList(modalStoreList); // 매장명 셋팅
    menuModalElement.forEach((element) => element.value = ""); //다 비우기
    modalStoreList.removeAttribute("disabled");
    menuForm.status = "POST";
}

function submitForm(event) {
    event.preventDefault();
    const storeId = modalStoreList.options[modalStoreList.selectedIndex].value;
    const url = (menuForm.status === "DELETE") ? `/api/buser/menu?menu_id=${menuForm.id}` : `/api/buser/menu?store_id=${storeId}`;
    sendMenuForm(url, menuForm.status) //url, method(post), 
    UIkit.modal(menuModal).hide();
}


btnDeleteMenu.addEventListener("click", (event) => {
    const url = `/api/buser/menu?menu_id=${alertModal.id}`
    const status = "DELETE"
    fetch(url, {method: status})
    .then((res) => res.json())
    .then((result) => {
        console.log('Success: ', result);
        UIkit.modal(alertModal).hide();
        resetMenuData();
    })
    .catch((error) => {
        console.error('Error: ', error);
    })
});

btnAddMenu.addEventListener("click", setAddModal);
storeList.addEventListener("change", resetMenuData);
menuForm.addEventListener("submit", submitForm);


setSelectList(storeList);
setSelectList(modalStoreList);

console.log("listMenu done");