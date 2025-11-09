import * as element from "./../modules/element.js"

export const loadListMenu = async () => {
    /* panel auto hidden */
    const panelPath = "../components/nano/PanelAutoHidden.js"
    await import(panelPath)
    const listMenuBox = document.getElementById("listMenuBox")

    const config = {
        css: {
            sizeW: "200px",
            sizeW_min: "40px",
            sizeH: "100%",
            side: "left",
            margin: "10px",
            iconColor: "whitesmoke",
            radius: "8px",
            font: "Anta",
            fontSize: "14px",
            color: "whitesmoke",
            back: getComputedStyle(document.documentElement).getPropertyValue("--darkCrystal"),
            blur: "4px",
            transition: `${getComputedStyle(listMenuBox).getPropertyValue("transition")}`
        },
        logic: {
            title: "Components",
            icon: "menu"
        }
    }

    const props = {
        eventDom: document,
        eventName: "panelLeft",
        containerControl: true
    }

    const panel = element.add(listMenuBox, "panel-autohidden", "listPanel", null, config, props)

    /* list menu */
    const listPath = "../../components/nano/ListMenuSimple.js"

    const listConfig = {
        css: {

        },
        logic: {
            
        }
    }

    const listProps = {
        eventDom: document,
        eventName: "listMenu",
        data: await (await fetch("./app/scripts/config/components.json")).json()
    }

    const listMenu = await panel.addComponent("listmenu-simple", listPath, "listmenu", null, listProps)
}