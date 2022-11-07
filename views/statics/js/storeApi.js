const storeForm = document.querySelector("#storeForm")
const tableData = document.querySelector("#table-data");
const storeModal = document.querySelector("#store-modal");
const btnAddStore = document.querySelector("#btn-add-store");
const btnDeleteStore = document.querySelector("#btn-delete-store");

const storeModalTitle = document.querySelector("#store-modal-title");
const storeModalName = storeForm.querySelector("#store-modal-name");
const storeModalCode = storeForm.querySelector("#store-modal-code");
const storeModalDesc = storeForm.querySelector("#store-modal-description");
const storeModalZip = storeForm.querySelector("#postcode");
const storeModalAddress1 = storeForm.querySelector("#address")
const storeModalAddress2 = storeForm.querySelector("#detailAddress")
const storeModalAddress3 = storeForm.querySelector("#extraAddress")
const storeModalElement = [storeModalName, storeModalCode, storeModalDesc, storeModalZip, storeModalAddress1, storeModalAddress2, storeModalAddress3];

function sendStoreForm(url, method) {
    const form = new FormData(storeForm);
    const urlEncodedForm = new URLSearchParams(form)

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: urlEncodedForm,
    })
    .then((res) => res.json())
    .then((result) => {
        console.log('Success:', result);
        UIkit.modal(storeModal).hide();
        resetStoreData();
        return result.data;
    })
    .catch((error) => {
        console.error('Error: ', error);
    });
}

function listStore() {
    fetch("/api/buser/store")
    .then((res) => res.json())
    .then((result) => {
        result.data.forEach(element => {
            console.log(element);
            const tr = document.createElement("tr");
            const name = document.createElement("p");
            const code = document.createElement("p");
            const description = document.createElement("p");
            const updatedAt = document.createElement("p");
            const btnEditStore = document.createElement("a");

            btnEditStore.classList.add("btn-edit-store");
            btnEditStore.setAttribute("id", element.code);
            btnEditStore.setAttribute("href", "#store-modal")
            btnEditStore.setAttribute("uk-toggle", "");
            btnEditStore.innerHTML = '<span uk-icon="cog"></span>';
            btnEditStore.addEventListener("click", () => {
                console.log("수정 팝업 오픈");
                btnDeleteStore.classList.remove("hidden");
                storeForm.status = "PUT"; //edit 상태라는 표시 위한 class 추가하기
                storeForm.id = element.id;
                storeModalTitle.innerText = "매장 정보 수정";
                storeModalName.value = element.name;
                storeModalZip.value= element.zip_code;
                storeModalDesc.value = element.description;
                storeModalCode.value = element.code;
                storeModalCode.setAttribute("readonly", "");
                console.log(element.code);
            });

            const storeInfo = [name, description, updatedAt, btnEditStore];
            const updatedTime = new Date(Date.parse(element.updatedAt))

            
            name.innerText = element.name;
            code.innerText = element.code;
            description.innerText = element.description;
            updatedAt.innerText = `${updatedTime.getFullYear()}/${updatedTime.getMonth()+1}/${updatedTime.getDay()} ${updatedTime.getHours()}:${updatedTime.getMinutes()}`;
            storeInfo.forEach(info => {
                const td = document.createElement("td");
                td.appendChild(info);
                tr.appendChild(td);
            });
            tableData.appendChild(tr);
        });
    })
    .catch((error) => {
        console.log(error);
    })
}

function resetStoreData() {
    while(tableData.firstChild) tableData.removeChild(tableData.firstChild);
    listStore();
}

function setAddModal() {
    console.log("등록 팝업 오픈");
    storeModalTitle.innerText = "매장 신규 등록"
    storeForm.status = "POST";
    btnDeleteStore.classList.add("hidden");
    storeModalCode.removeAttribute("readonly");
    storeModalElement.forEach((element) => {
        element.value = "";
    })
}

function submitForm(event) {
    event.preventDefault();
    const url = (storeForm.status === "POST") ? "/api/buser/store" : `/api/buser/store?store_id=${storeModalCode.value}`;
    sendStoreForm(url, storeForm.status) //url, method(post), 
}

btnAddStore.addEventListener("click", setAddModal);
btnDeleteStore.addEventListener("click", (event) => {
    storeForm.status = "DELETE";
    console.log("정리"+storeModalCode.value);
    submitForm(event);
})
storeForm.addEventListener("submit", submitForm);

listStore();