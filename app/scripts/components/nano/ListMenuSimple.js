import { AttributeConfigurable } from "../templates/reactiveComp.js"

export class ListMenuSimple extends AttributeConfigurable {
    constructor() {
        super()

        this.parent
        this.parentEventName
        this.eventDom
        this.eventName
        this.material
        this.data
        this.iconData

        this.classStyle.textContent = `
            .container {
                position: relative;
                width: var(--menu_W);
                height: 100%;
                background: var(--back);

                .floatContainer {
                    top: 0;
                    left: calc(var(--iconMenu_W) + 20px);
                    display: none;
                    width: 100px;
                    height: 100%;
                    border: 1px solid green;

                    .floatBox {
                        width: 0;
                        height: 10px;
                        background: var(--floatBack);
                    }
                }

                .subContainer {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    border: 2px solid blue;

                    .iconMenu {
                        width: var(--iconMenu_W);
                        height: auto;
                        border: 1px solid red;

                        .itemBox {
                            width: 100%;
                            height: var(--iconBox_H);

                            .itemIcon {color: var(--textColor);
                                &:has(+input:not(:checked):hover) {color: var(--hoverColor);}
                                &:has(+input:checked) {color: var(--selectedColor);}
                            }
                        }
                    }

                    .listMenu {
                        left: 0;width: 100%;
                        height: auto;
                        clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
                        border: 1px solid red;

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

                                &:* {height: 100%;}

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
                                    color: var(--textColor);
                                    margin-right: 10px;
                                }

                                &:hover:has(.listRadio:not(:checked)) {background: var(--hoverBack);}
                                &:has(.listRadio:checked) {background: var(--titleBackSelected);
                                    .titleName {color: var(--textColorSelected);}
                                }
                            }

                            .expand {
                                display: flex;
                                flex-direction: column;
                                align-items: flex-end;
                                width: calc(100% - 20px);
                                height: 0;
                                overflow: hidden;

                                .option {
                                    display: flex;
                                    width: 84%;
                                    height: var(--listOption_H);
                                    color: transparent;
                                    background: var(--listOption_back1);
                                    margin-top: 4px;

                                    .optionExpansor {
                                        display: flex;
                                        flex: 0;
                                        transition: var(--transition);
                                    }

                                    .optionName {
                                        width: fit-content;
                                        height: var(--listOption_H);
                                        margin-right: 10px;
                                        color: var(--textColor);
                                        text-indent: 6px;
                                    }

                                    &:hover:has(.listOptionRadio:not(:checked)) {background: var(--hoverBack);}
                                    &:has(input:checked) {background: var(--optionSelectedBack);
                                        .optionExpansor {flex: 1;}
                                        .optionName {color: var(--textColorSelected);}
                                    }
                                }
                            }

                            &:has(.option .listOptionRadio:checked) {.title .titlePointerBox .titlePointer {background: var(--selectedColor);}}
                            &:has(.title input:checked) {
                                .title .titleExpansor {flex: 1;}
                                .optionName {color: var(--textColor);}
                                +.separator {margin-top: 2px;}
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
            menu_W: "100%",
            back: "red",
            font: "initial",
            fontSize: "initial",
            hoverBack: "red",
            hoverColor: "red",
            selectedColor: "red",
            textColor: "grey",
            textColorSelected: "red",
            optionSelectedBack: "red",
            transition: "1s",
            /* list */
            listTitle_H: "50px",
            listOption_H: "28px",
            titleBackSelected: "red",
            /* icon */
            iconMenu_W: "40px",
            iconBox_W: "100%",
            iconBox_H: "32px",
            materialSize: "24px",
            floatBack: "red"
        }
        const css = this.getConfig(defaultConfCss)
        const logic = JSON.parse(this.getAttribute("logic"))

        const drawMenuIcon = (subContainer, floatContainer) => {
            const iconMenu = this.elementAdd(subContainer, "section", "iconMenu absolute transition")

            this.icons.forEach(item => {
                const itemBox = this.elementAdd(iconMenu, "div", "itemBox relative center")
                const itemIcon = this.elementAdd(itemBox, "div", "itemIcon center")
                if (this.material) {
                    this.addLink(this.dom, "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap", "stylesheet")
                    this.addLink(document.head, "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap", "stylesheet")
                    itemIcon.classList.add("material-symbols-outlined")
                    itemIcon.style.fontSize = css.materialSize
                }
                itemIcon.textContent = item.icon
                const itemInput = this.elementAdd(itemBox, "input", "hiddenInput ")
                itemInput.setAttribute("type", "radio")
                itemInput.setAttribute("title", item.name)
                itemInput.setAttribute("name", "iconRadio")
                itemInput.setAttribute("attr_type", item.type)

                /* CREAR UN 2 CONTENEDORES DENTRO DE THIS.CONTAINER UNA PAR EL MENU OTRO PARA LAS FLOATS */
                drawFloats(floatContainer, item)
            })
        }

        const drawFloats = (box, item) => {
            const float = this.elementAdd(box, "div", "floatBox absolute transition")
/*             float.style.zIndex = 100
 */            float.id = "float_" + item.type
            float.setAttribute("open", false)
        }

        const closeFloats = async (css) => { /* control parent delay */
            const floats = Array.from(this.dom.querySelectorAll(".floatBox"))
            const open = floats.find(item => item.getAttribute("open") === "true")
            const time = parseFloat(css.transition)

            if (open) {
                this.parent.block(true)
                this.parent.wait = time * 2
                open.style.height = "10px"
                await new Promise(resolve => setTimeout(resolve, time))
                open.style.width = 0
                await new Promise(resolve => setTimeout(resolve, time))
                open.setAttribute("open", false)
            }
            this.parent.wait = 0
            this.parent.block(false)
        }

        const openFloat = async (time, float) => {
            this.parent.block(true)
            float.style.width = "200px"
            await new Promise(resolve => setTimeout(resolve, time))
            float.style.height = "400px"
            await new Promise(resolve => setTimeout(resolve, time))
            float.setAttribute("open", true)
            this.parent.block(false)
        }

        const expandOptionIcons = async (e) => {
            const icons = Array.from(this.dom.querySelectorAll("input[name='iconRadio']"))
            icons.forEach(item => item.disabled = true)
            const type = e.target.getAttribute("attr_type")
            const float = this.dom.querySelector(`#float_${type}`)
            const time = parseFloat(getComputedStyle(float).getPropertyValue("transition")) * 1000
            await closeFloats(css)
            await openFloat(time, float)
            icons.forEach(item => item.disabled = false)
        }

        const drawMenuList = (box) => {
            const listMenu = this.elementAdd(box, "section", "listMenu columnCenter absolute transition")

            Object.entries(this.data).forEach(([key, value]) => {
                const typeBox = this.elementAdd(listMenu, "div", "typeBox columnCenter")
                const title = this.elementAdd(typeBox, "div", "title relative borderR")
                const titlePointerBox = this.elementAdd(title, "div", "titlePointerBox center")
                const titlePointer = this.elementAdd(titlePointerBox, "div", "titlePointer")
                const titleExpansor = this.elementAdd(title, "div", "titleExpansor transition")
                const titleName = this.elementAdd(title, "span", "titleName verticalCenter")
                titleName.textContent = key

                const radio = this.elementAdd(title, "input", "hiddenInput listRadio")
                radio.setAttribute("type", "radio")
                radio.setAttribute("name", "listRadio")

                const expand = this.elementAdd(typeBox, "div", "expand transition")

                Object.entries(value).forEach(item => {
                    const option = this.elementAdd(expand, "div", "option relative borderR")
                    const optionExpansor = this.elementAdd(option, "div", "optionExpansor transition")
                    const optionName = this.elementAdd(option, "span", "optionName transition verticalCenter")
                    optionName.textContent = item[1].name

                    const radio = this.elementAdd(option, "input", "hiddenInput listOptionRadio")
                    radio.setAttribute("type", "radio")
                    radio.setAttribute("name", "listOptionRadio")
                    radio.setAttribute("infoName", item[1].name)
                    radio.setAttribute("tag", item[1].tag)
                    radio.setAttribute("path", item[1].path)
                })
                const separator = this.elementAdd(listMenu, "div", "separator")
            })
        }

        const expandOptionsList = (target) => {
            const allExpand = Array.from(this.dom.querySelectorAll(".expand"))
            allExpand.forEach(item => { item.style.height = 0 })

            const expand = target.parentElement.nextElementSibling
            const optNum = expand.children.length
            expand.style.height = `calc(${parseFloat(css.listOption_H) * optNum + 20}px)`
        }

        const prepareMixMenu = () => {
            const iconMenu = this.dom.querySelector(".iconMenu")
            const listMenu = this.dom.querySelector(".listMenu")

            iconMenu.style.width = css.iconMenu_W
            iconMenu.style.left = `calc(${css.iconMenu_W} * -1)`
            listMenu.style.width = css.menu_W
        }

        const moveMenu = async (boolean) => {
            const iconMenu = this.dom.querySelector(".iconMenu")
            const listMenu = this.dom.querySelector(".listMenu")
            const floatContainer = this.dom.querySelector(".floatContainer")
            const time = parseFloat(getComputedStyle(listMenu).getPropertyValue("transition")) * 1000

            if (!boolean) floatContainer.style.display = "none"
            iconMenu.style.left = boolean ? 0 : parseFloat(css.iconMenu_W) * -1 + "px"
            listMenu.style.left = boolean ? css.iconMenu_W : 0
            listMenu.style.width = boolean ? 0 : css.menu_W
            listMenu.style.opacity = boolean ? 0 : 1
            listMenu.style.clipPath = boolean
                ? "polygon(0 0, 0 0, 0 100%, 0% 100%)"
                : "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
            await new Promise(resolve => setTimeout(resolve, time))
            if (boolean) floatContainer.style.display = "flex"
        }

        const cloneSelect = (e, array1, array2) => {
            const index = array1.findIndex(searched => searched === e.target)
            if (logic.mode === "mix") array2[index].checked = true
            return index
        }

        const addEvents = (logic) => {
            const listRadios = Array.from(this.dom.querySelectorAll("input[name='listRadio']"))
            const iconRadios = Array.from(this.dom.querySelectorAll("input[name='iconRadio']"))
            const containerWidth = this.container.offsetWidth

            if (listRadios.length) listRadios.forEach(item => {
                item.addEventListener("change", (e) => {
                    cloneSelect(e, listRadios, iconRadios)
                    expandOptionsList(e.target, containerWidth)
                })
            })

            if (iconRadios.length) iconRadios.forEach(item => {
                item.addEventListener("change", (e) => {
                    const index = cloneSelect(e, iconRadios, listRadios)
                    expandOptionIcons(e)
                    expandOptionsList(listRadios[index], containerWidth)
                })
            })
        }

        const main = () => {
            this.applyConfCss(css)
            const subContainer = this.elementAdd(this.container, "div", "subContainer relative")
            const floatContainer = this.elementAdd(this.container, "div", "floatContainer absolute")
            console.log(floatContainer)
            let modeInUse
            if (logic.mode === "icon") { drawMenuIcon(subContainer, floatContainer) }
            if (logic.mode === "list") { drawMenuList(subContainer) }
            if (logic.mode === "mix") {
                modeInUse = "list"
                drawMenuIcon(subContainer, floatContainer)
                drawMenuList(subContainer)
                prepareMixMenu(css)
            }

            addEvents(logic)
            this.eventDom.addEventListener(this.parentEventName, async (e) => {
                if (logic.mode === "mix") {
                    modeInUse = e.detail ? "icon" : "list"
                    await closeFloats(css)
                    await moveMenu(e.detail)
                    console.log(modeInUse)
                }
            })
        }

        main()
    }
}

customElements.define("listmenu-simple", ListMenuSimple)