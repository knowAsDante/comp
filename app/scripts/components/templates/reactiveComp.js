export class AttributeConfigurable extends HTMLElement {
    constructor() {
        super()

        this.dom
        this.container
        this.classStyle
        this.eventDom
        this.eventName
        this.eventListen
        this.sheetStyle
        this.containerControl = true
        this.data

        this._initClass()
    }

    _initClass() {
        this._initDom()
        this._initContainer()
        this._initStyle()
    }

    _initDom() {
        this.dom = this.attachShadow({ mode: "open" })
    }

    _initContainer() {
        this.container = document.createElement("div")
        this.container.classList.add("container")
        this.dom.appendChild(this.container)
    }

    _initStyle() {
        this.classStyle = document.createElement("style")
        this.classStyle.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :host {
                width: 100%;
                height: 100%;
            }
        `
        this.dom.appendChild(this.classStyle)
    }

    event(dom, name, detail) {
        dom.dispatchEvent(new CustomEvent(name, { 'detail': detail }))
    }

    getConfig(defaultConf) {
        let config = {}
        Object.entries(defaultConf).forEach(([key, value]) => {
            const attrValue = JSON.parse(this.getAttribute("css"))[key]
            Array.isArray(value)
                ? config[key] = attrValue ? attrValue : value[0]
                : config[key] = attrValue ? attrValue : value
        })
        return config
    }

    applyConfCss(cssConf) {
        Object.entries(cssConf).forEach(([key, value]) => { this.style.setProperty(`--${key}`, value) })
    }

    addLink(dom, href, rel) {
        const link = document.createElement("link")
        link.setAttribute("href", href)
        link.setAttribute("rel", rel)
        dom.appendChild(link)
    }

    async addComponent(tag, path, id = null, config = null, props = null) {
        await import(path)
        const entryPoint = this.dom.querySelector(".componentBox")
        const component = document.createElement(tag)
        if (id) component.id = id
        if (config && config.css) component.setAttribute("css", JSON.stringify(config.css))
        if (config && config.logic) component.setAttribute("logic", JSON.stringify(config.logic))
        if (props) Object.entries(props).forEach(([key, value]) => component[key] = value)
        entryPoint.appendChild(component)
        return component
    }

    elementAdd(container, tag, classNames) {
        const element = document.createElement(tag)
        element.className = classNames
        container.appendChild(element)
        return element
    }
}