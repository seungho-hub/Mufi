export const Routes = [
        { path: "/home", name: "home"},
        { path: "/stat", name: "stat"},
        { path: "/store/add", name: "store-add"},
        { path: "/store/edit", name: "store-edit"},
        { path: "/store/watch", name: "store-watch"},
        { path: "/store/info", name: "store-info"},
        { path: "/service/contact", name: "service-contact"},
        { path: "/service/info", name: "service-info"},
        { path: "/posts", name: "sample_posts"},
        { path: "/settings", name: "sample_settings"}
    ]


    //배열로 주소와 id값(name) 저장
    //match하는 지 확인
    //확인되면 자동으로 보내버리기(getHtml함수 -> 자동으로 ejs 만들기)

    //routes.js (오브젝트 형태로 path, name 정보 저장)
    //content-loader.js (현 index.js)
