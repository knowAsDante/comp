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
        childrenEventName: "panelLeft_children",
        wait: 0
    }

    const panel = element.add(listMenuBox, "panel-autohidden", "listPanel", "listMenu", config, props)

    /* list menu component */
    const listPath = "../../components/nano/ListMenuSimple.js"

    const listConfig = {
        css: {
            menu_W: "100%",
            back: "transparent",
            font: "Anta",
            fontSize: "13px",
            hoverBack: "rgba(255, 255, 255, 0.1)",
            hoverColor: "rgba(255, 255, 255, 0.85)",
            selectedColor: "cyan",
            textColor: "red",
            textColorSelected: "rgba(50, 50, 50, 1)",
            optionSelectedBack: "rgba(0, 255, 255, 0.4)",
            transition: "300ms ease-in-out",
            /* list */
            listTitle_H: "32px",
            listOption_H: "28px",
            titleBackSelected: "rgba(255, 255, 255, 0.6)",
            /* icon */
            iconMenu_W: "40px",
            iconBox_W: "100%",
            iconBox_H: "32px",
            materialSize: "20px",
            floatBack: getComputedStyle(document.documentElement).getPropertyValue("--darkCrystal")
        },
        logic: {
            mode: "mix"
        }
    }

    const menuProps = {
        parent: panel,
        parentEventName: "panelLeft_children",
        eventDom: document,
        eventName: "listMenu",
        material: true,
        /* list */
        data: await (await fetch("./app/scripts/config/components.json")).json(),
        /* icon */
        icons: [
            { name: "Favorite", icon: "favorite", type: "mode1" },
            { name: "Background", icon: "wallpaper", type: "mode2" }
        ]
    }

    const listMenu = await panel.addComponent("listmenu-simple", listPath, "listmenu", listConfig, menuProps)
}