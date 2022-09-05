import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Dashboard");
    }

    async getHtml() { //test임
        return ` 
            <h1>셋팅입니다</h1>
        
        
        `;
    }
}