import { AttributeConfigurable } from "../templates/reactiveComp.js"

export class ListMenuSimple extends AttributeConfigurable {
    constructor() {
        super()

        this.classStyle.textContent = `
            .container {
                width: var(--listMenu_W);
                height: var(--listMenu_H);
                background: var(--back);
                border: 1px solid blue;

                .iconMenu {
                    height: var(--iconMenu_H);
                    background: red;
                }

                .listMenu {
                    left: 0;
                    height: auto;

                        .typeBox {
                        width: 100%;
                        height: auto;

                        .title .titleName,
                        .expand .option {
                            font-family: var(--font);
                            font-size: var(--fontSize);
                        } 

                        .title {
                            display: flex;
                            width: calc(100% - 20px);
                            height: var(--listTitle_H);
                            margin-left: 10px;
                            margin-right: 10px;

                            &:* {
                                height: 100%;
                            }

                            .titlePointerBox {
                                flex-shrink: 0;
                                width: 30px;

                                .titlePointer {
                                    width: 12px;
                                    aspect-ratio: 1/1;
                                    border-radius: 3px;
                                    background: transparent;
                                }
                            }

                            .titleExpansor {
                                display: flex;
                                flex: 0;
                            }

                            .titleName {
                                width: auto;
                                color: var(--listMenu_Color1);
                                margin-right: 10px;
                            }

                            &:has(.menuRadio:checked) {
                                background: var(--listTitle_Color1);

                                .titleName {
                                    color: var(--listMenu_Color2);
                                }
                            }
                        }

                        .expand {
                            display: flex;
                            flex-direction: column;
                            align-items: flex-end;
                            justify-content: center;
                            width: calc(100% - 20px);
                            height: 0;
                            margin-bottom: 0;
                            overflow: hidden;

                            .option {
                                display: flex;
                                width: 84%;
                                height: var(--listOption_H);
                                color: transparent;
                                background: var(--listOption_back1);

                                .optionExpansor {
                                    display: flex;
                                    flex: 0;
                                    transition: var(--transition);
                                }

                                .optionName {
                                    width: fit-content;
                                    height: var(--listOption_H);
                                    margin-right: 10px;
                                    color: var(--listOption_Color1);
                                }

                                &:has(input:checked) {
                                    background: var(--listOption_Back2);

                                    .optionExpansor {
                                        flex: 1;
                                    }

                                    .optionName {
                                        color: var(--listOption_Color2);
                                    }
                                }
                            }
                        }

                        &:has(.option .optionRadio:checked) {
                            .title .titlePointerBox .titlePointer {
                                background: var(--pointerColor);
                            }
                        }

                        &:has(.title input:checked) {
                        
                            .title .titleExpansor {
                                flex: 1;
                            }
                                
                            .optionName {
                                color: var(--listOption_Color1);
                            }

                            +.separator {
                                margin-top: 2px;
                            }
                        }
                    }

                    .separator {
                        width: 80%;
                        height: 1px;
                        background: grey;
                        opacity: 0.2;
                    }
                }
            }

            .relative {position: relative;}
            .absolute {position: absolute;}
            .hiddenInput {position: absolute; left: 0; top: 0; width: 100%; height: 100%; appearance: none; cursor: pointer;}
            .center {display: flex; justify-content: center; align-items: center;}
            .columnCenter {display: flex; flex-direction: column; align-items: center;}
            .verticalCenter {display: flex; align-items: center;}
            .borderR {border-radius: 4px;}
            .transition {transition: var(--transition);}
        `
    }

    connectedCallback() {

        const defaultConfCss = {
            back: "grey",
            pointerColor: "red",
            font: "initial",
            fontSize: "initial",
            transition: "1s",

            listMenu_W: "100%",
            listMenu_H: "50px",
            listTitle_H: "50px",
            listMenu_Color1: "red",
            listMenu_Color2: "rgb(30, 30, 30)",
            listTitle_Color1: "red",
            listOption_H: "28px",
            listOption_Color1: "blue",
            listOption_Color2: "blue",
            listOption_Back1: "transparent",
            listOption_Back2: "green",

            iconMenu_W: "40px",
            iconMenu_H: "35px",

        }
        const css = this.getConfig(defaultConfCss)
        const logic = JSON.parse(this.getAttribute("logic"))

        const elementAdd = (container, tag, classNames) => {
            const element = document.createElement(tag)
            element.className = classNames
            container.appendChild(element)
            return element
        }

        const drawMenuList = () => {
            const listMenu = elementAdd(this.container, "section", "listMenu columnCenter absolute transition")

            Object.entries(this.data).forEach(([key, value]) => {
                const typeBox = elementAdd(listMenu, "div", "typeBox columnCenter")
                const title = elementAdd(typeBox, "div", "title relative borderR")
                const titlePointerBox = elementAdd(title, "div", "titlePointerBox center")
                const titlePointer = elementAdd(titlePointerBox, "div", "titlePointer")
                const titleExpansor = elementAdd(title, "div", "titleExpansor transition")
                const titleName = elementAdd(title, "span", "titleName verticalCenter")
                titleName.textContent = key

                const radio = elementAdd(title, "input", "hiddenInput menuRadio")
                radio.setAttribute("type", "radio")
                radio.setAttribute("name", "menuRadio")

                const expand = elementAdd(typeBox, "div", "expand transition")

                Object.entries(value).forEach(item => {
                    const option = elementAdd(expand, "div", "option relative borderR")
                    const optionExpansor = elementAdd(option, "div", "optionExpansor transition")
                    const optionName = elementAdd(option, "span", "optionName transition verticalCenter")
                    optionName.textContent = item[1].name

                    const radio = elementAdd(option, "input", "hiddenInput optionRadio")
                    radio.setAttribute("type", "radio")
                    radio.setAttribute("name", "optionRadio")
                    radio.setAttribute("name", item[1].name)
                    radio.setAttribute("tag", item[1].tag)
                    radio.setAttribute("path", item[1].path)

                })
                const separator = elementAdd(listMenu, "div", "separator")
            })
        }

        const drawMenuIcon = () => {
            const iconMenu = elementAdd(this.container, "section", "iconMenu absolute transition")
        }

        const expandOptions = (target) => {
            const allExpand = Array.from(this.dom.querySelectorAll(".expand"))
            allExpand.forEach(item => { item.style.height = 0 })

            const expand = target.parentElement.nextElementSibling
            const optNum = expand.children.length
            expand.style.height = `calc(${parseFloat(css.listOption_H) * optNum + optNum * 2}px)`
        }

        const prepareMixMenu = () => {
            const iconMenu = this.dom.querySelector(".iconMenu")
            const listMenu = this.dom.querySelector(".listMenu")

            iconMenu.style.width = css.iconMenu_W
            iconMenu.style.left = `calc(${css.iconMenu_W} * -1)`
            listMenu.style.width = css.listMenu_W
        }

        const moveMenu = async (boolean) => {
            const iconMenu = this.dom.querySelector(".iconMenu")
            const listMenu = this.dom.querySelector(".listMenu")

            iconMenu.style.left = boolean ? 0 : parseFloat(css.iconMenu_W) * -1 + "px"
            listMenu.style.left = boolean ? css.iconMenu_W : 0
            listMenu.style.width = boolean ? 0 : css.listMenu_W
            listMenu.style.opacity = boolean ? 0 : 1
        }

        const main = () => {
            this.applyConfCss(css)
            const containerWidth = this.container.offsetWidth

            if (logic.mode === "mix") { drawMenuIcon(); drawMenuList(); prepareMixMenu(css) }
            if (logic.mode === "icon") drawMenuIcon()
            if (logic.mode === "list") drawMenuList()

            const menuRadios = Array.from(this.dom.querySelectorAll("input[name='menuRadio']"))
            menuRadios.forEach(item => {
                item.addEventListener("change", (e) => {
                    expandOptions(e.target, containerWidth)
                })
            })

            this.eventDom.addEventListener(this.eventListen, (e) => {
                if (logic.mode === "mix") moveMenu(e.detail)
            })
        }

        main()
    }
}

customElements.define("listmenu-simple", ListMenuSimple)