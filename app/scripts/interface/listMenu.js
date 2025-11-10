import * as element from "./../modules/element.js"

export const loadListMenu = async () => {
    /* panel auto hidden component */
    const panelPath = "../components/nano/PanelAutoHidden.js"
    await import(panelPath)
    const listMenuBox = document.getElementById("listMenuBox")

    const config = {
        css: {
            sizeW: getComputedStyle(document.documentElement).getPropertyValue("--panel_width"),
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

    const panel = element.add(listMenuBox, "panel-autohidden", "listPanel", "listMenu", config, props)

    /* list menu component */
    const listPath = "../../components/nano/ListMenuSimple.js"

    const listConfig = {
        css: {
            back: "transparent",
            pointerColor: "rgba(147, 236, 232, 1)",
            font: "Anta",
            fontSize: "13px",
            transition: "300ms ease-in-out",

            /* list */
            listMenu_W: "100%",
            listMenu_H: "100%",
            listTitle_H: "32px",
            listMenu_Color1: "grey",
            listMenu_Color2: "rgb(50, 50, 50)",
            listTitle_Color1: "rgba(255, 255, 255, 0.6)",
            listOption_H: "28px",
            listOption_Color1: "grey",
            listOption_Color2: "rgb(50, 50, 50)",
            listOption_Back1: "transparent",
            listOption_Back2: "rgba(92, 255, 255, 0.6)",
            /* icon */
            iconMenu_W: "40px",
            iconMenu_H: "100%",
        },
        logic: {
            mode: "mix"
        }
    }

    const listProps = {
        eventDom: document,
        eventName: "listMenu",
        eventListen: "listPanel",
        data: await (await fetch("./app/scripts/config/components.json")).json()
    }

    const listMenu = await panel.addComponent("listmenu-simple", listPath, "listmenu", listConfig, listProps)
}