import * as element from "./../modules/element.js"

const addContainers = async () => {
    const mainBox = element.add(document.body, "section", "mainBox")
    const componentBox = element.add(mainBox, "div", "componentBox")
    const listMenuBox = element.add(document.body, "section", "listMenuBox")
    const configMenuBox = element.add(document.body, "section", "configMenuBox")
    const controlsBox = element.add(document.body, "section", "controlsBox")
    const infoBox = element.add(document.body, "section", "infoBox")

    return [mainBox, componentBox, listMenuBox, configMenuBox, controlsBox, infoBox]
}

const addStyles = () => {
    const path = [
        { rel: "stylesheet", href: "app/styles/globalConf.css" },
        { rel: "stylesheet", href: "app/styles/globalClass.css" },
        { rel: "stylesheet", href: "app/styles/mainContainers.css" }
    ]

    Object.entries(path).forEach(item => element.add(document.head, "link", null, "mainContainers", item[1]))
}

const addClass = (array) => {
    const toAddClass = {
        mainBox: ["mainBox relative max center"],
        componentBox: ["componentBox relative max"],
        listMenuBox: ["listMenuBox absolute panelMenu"],
        configMenuBox: ["configMenuBox absolute panelMenu"],
        controlsBox: ["controlsBox absolute"],
        infoBox: ["infoBox absolute"]
    }

    array.forEach(item => {
        const container = item.id
        const oldClass = item.className
        const newClassName = oldClass + " " + toAddClass[container]
        item.className = (newClassName)
    })
}

export const loadContainers = async () => {
    const containers = await addContainers()
    addStyles()
    addClass(containers)
}   
