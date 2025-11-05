import * as element from "../scripts/modules/element.js"

export const containers = (box) => {    /* only main style class */
    const mainBox = element.add(box, "section", "mainBox", "mainBox")
    const componentBox = element.add(mainBox, "div", "componentBox", "componentBox")
    const listMenuBox = element.add(box, "section", "listMenuBox", "listMenuBox panelMenu")
    const confMenuBox = element.add(box, "section", "confMenuBox", "confMenuBox panelMenu")
    const controlsBox = element.add(box, "section", "controlsBox", "controlsBox")
    const infoBox = element.add(box, "section", "infoBox", "infoBox")
}

export const addStyles = () => {
    const path = [
        { rel: "shortcut icon", type: "image/x-icon", href: "app/assets/images/icons/logo_128.png" },
        { rel: "stylesheet", href: "app/styles/globalConf.css" },
        { rel: "stylesheet", href: "app/styles/globalClass.css" },
        { rel: "stylesheet", href: "app/styles/mainContainers.css" }
    ]

    Object.entries(path).forEach(item => element.add(document.head, "link", null, "mainContainers", item[1]))
}