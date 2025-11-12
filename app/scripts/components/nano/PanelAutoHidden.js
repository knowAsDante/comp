import { AttributeConfigurable } from "../templates/reactiveComp.js"

export class PanelAutoHidden extends AttributeConfigurable {
    constructor() {
        super()

        this.eventDom
        this.eventName
        this.childrenEventName
        this.wait

        this.addLink(this.dom, "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap", "stylesheet")
        this.addLink(document.head, "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap", "stylesheet")

        this.container.innerHTML = `
            <div class="menuBox relative">
                <div class="topBar"></div>
                <div class="componentBox relative"></div>
            </div>
        `

        this.classStyle.textContent = `
            .container {
                position: absolute;
                z-index: 100;
                top: 10px;
                display: flex;
                width: calc(var(--sizeW) - var(--margin));
                height: calc(var(--sizeH) - var(--margin) * 2);
                transition: var(--transition);

                .menuBox {
                    width: 100%;
                    height: 100%;
                    background: var(--back);
                    border-radius: var(--radius);
                    backdrop-filter: var(--blur);

                    .topBar {
                        display: flex;
                        width: 100%;
                        height: 40px;

                        .closeButtom {
                            width: var(--sizeW_min);
                            height: 100%;
                            border-radius: 50%;

                            .closeIcon {
                                color: var(--iconColor);
                                font-size: 20px;
                            }
                        }
                    }

                    .componentBox {
                        width: 100%;
                        height: calc(100% - 40px);
/*                         overFlow: hidden;
 */                    }
                }
            }

            .relative {position: relative;}
            .absolute {position: absolute;}
            .center {display: flex; justify-content: center; align-items: center;}
            .max {width: 100%; height: 100%;}
            .hiddenInput {position: absolute; width: 100%; height: 100%; appearance: none; cursor: pointer;}
        `
    }

    block(boolean) {
        const toogleInput = this.dom.querySelector(".toogleInput")
        toogleInput.disabled = boolean
    }

    connectedCallback() {

        const defaultConfCss = {
            sizeW: "auto",
            sizeW_min: "80px",
            sizeH: "auto",
            side: ["left", "right"],
            margin: "20px",
            font: "initial",
            fontSize: "initial",
            color: "blue",
            back: "red",
            blur: "none",
            iconColor: "blue",
            radius: "12px",
            transition: "5s"
        }
        const css = this.getConfig(defaultConfCss)
        const logic = JSON.parse(this.getAttribute("logic"))

        const applySide = (css, logic) => {
            this.container.style.left = css.side === "left" ? css.margin : 0

            const topBar = this.dom.querySelector(".topBar")
            topBar.style.justifyContent = css.side === "left" ? "flex-end" : "flex-start"

            const titleBox = document.createElement("span")
            titleBox.classList.add("titleBox")
            titleBox.textContent = logic.title ?? ""
            titleBox.style.display = "flex"
            titleBox.style.alignItems = "center"
            titleBox.style.width = "calc(100% - 60px)"
            titleBox.style.height = "100%"
            titleBox.style.fontFamily = css.font
            titleBox.style.fontSize = css.fontSize
            titleBox.style.color = css.color
            titleBox.style.transition = css.transition

            css.side === "left" ? topBar.prepend(titleBox) : topBar.appendChild(titleBox)
            titleBox.style.justifyContent = css.side === "left" ? "flex-start" : "flex-end"
        }

        const createControl = async (logic) => {
            const topBar = this.dom.querySelector(".topBar")

            const closeButtom = this.elementAdd(topBar, "div", "closeButtom relative center")
            const closeIcon = this.elementAdd(closeButtom, "div", "closeIcon material-symbols-outlined center")
            closeIcon.textContent = logic.icon

            const toogleInput = this.elementAdd(closeButtom, "input", "hiddenInput toogleInput")
            toogleInput.setAttribute("type", "checkbox")
        }

        const expandControl = async (boolean, css, host, hostWidth) => {
            this.container.style.width = boolean ? css.sizeW_min : `calc(var(--sizeW) - var(--margin))`
            const time = parseFloat(css.transition) * 1000

            const titleBox = this.dom.querySelector(".titleBox")
            titleBox.style.opacity = boolean ? 0 : 1

            if (this.containerControl) {
                const minWidth = parseFloat(css.sizeW_min) + parseFloat(css.margin) + "px"
                host.style.width = boolean ? minWidth : `${hostWidth}px`
            }
            await new Promise(resolve => setTimeout(resolve, time))
        }

        const main = async () => {
            this.applyConfCss(css)
            applySide(css, logic)
            createControl(logic)

            const host = this.parentElement
            const hostWidth = host.offsetWidth

            const toogleInput = this.dom.querySelector(".toogleInput")
            toogleInput.addEventListener("change", async (e) => {
                const eLostRef = e.target.checked
                this.eventDom.dispatchEvent(new CustomEvent(this.childrenEventName, { detail: eLostRef }))

                if (this.wait) await new Promise(resolve => setTimeout(resolve, this.wait))
                await expandControl(eLostRef, css, host, hostWidth)
                document.dispatchEvent(new CustomEvent("panelLeft", { detail: eLostRef }))
            })
        }

        main()
    }
}

customElements.define("panel-autohidden", PanelAutoHidden)