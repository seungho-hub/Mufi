const storeList = document.querySelector("#store-list");
const tableData = document.querySelector("#table-data");

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
            const code = document.createElement("p");
            const description = document.createElement("p");
            const updatedAt = document.createElement("p");
            const btnEditMenu = document.createElement("a");

            btnEditMenu.classList.add("btn-edit-store");
            btnEditMenu.setAttribute("id", element.code);
            btnEditMenu.setAttribute("href", "#store-modal")
            btnEditMenu.setAttribute("uk-toggle", "");
            btnEditMenu.innerHTML = '<span uk-icon="cog"></span>';
            btnEditMenu.addEventListener("click", () => {
                console.log("수정 팝업 오픈");
                btnDeleteStore.classList.remove("hidden");
                storeForm.status = "PUT"; //edit 상태라는 표시 위한 class 추가하기
                storeModalTitle.innerText = "매장 정보 수정";
                storeModalCode.setAttribute("readonly", "");
                storeModalName.setAttribute("value", element.name);
                storeModalCode.setAttribute("value", element.code);
                storeModalDesc.innerText = element.description;
                storeModalZip.setAttribute("value", element.zip_code);
                console.log(element.code);
            });

            const menuInfo = [name, description, updatedAt, btnEditMenu];
            const updatedTime = new Date(Date.parse(element.updatedAt))

            
            name.innerText = element.name;
            code.innerText = element.code;
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
    // console.log("done");
    while(tableData.firstChild) tableData.removeChild(tableData.firstChild);
    // console.log(storeList.selectedIndex)
    listMenu(storeList.selectedIndex);
}



fetch("/api/buser/store")
.then((res) => res.json())
.then((result) => {
    result.data.forEach(element => {
        console.log(element);
        const option = document.createElement("option");
        option.value = element.code;
        option.innerText = element.name;
        storeList.appendChild(option)
    })
})

storeList.addEventListener("change", resetMenuData);
listMenu();
console.log("listMenu done");