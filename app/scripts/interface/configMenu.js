import * as element from "./../modules/element.js"

export const loadConfigMenu = async () => {
    const path = "../components/nano/PanelAutoHidden.js"
    await import(path)
    const configMenuBox = document.getElementById("configMenuBox")

    const config = {
        css: {
            sizeW: "200px",
            sizeW_min: "40px",
            sizeH: "100%",
            side: "right",
            margin: "10px",
            iconColor: "whitesmoke",
            radius: "8px",
            font: "Anta",
            fontSize: "14px",
            color: "whitesmoke",
            back: getComputedStyle(document.documentElement).getPropertyValue("--darkCrystal"),
            transition: `${getComputedStyle(listMenuBox).getPropertyValue("transition")}`
        },
        logic: {
            title: "Configuration",
            icon: "tune"
        }
    }

    const props = {
        eventDom: document,
        eventName: "configMenuSelection",
    }

    element.add(configMenuBox, "panel-autohidden", "confMenuBox", null, config, props)
}