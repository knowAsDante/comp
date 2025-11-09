import { AttributeConfigurable } from "../templates/reactiveComp.js"

export class ListMenuSimple extends AttributeConfigurable {
    constructor() {
        super()

        this.classStyle.textContent = `
            .container {
                width: 100%;
                height: 100%;
                border: 1px solid blue;
            }
        `
    }

    connectedCallback() {

        console.log(this.data)
    }

}

customElements.define("listmenu-simple", ListMenuSimple)