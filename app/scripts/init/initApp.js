import { loadContainers } from "../interface/loadContainers.js"
import { loadListMenu } from "./../interface/listMenu.js"
import { loadConfigMenu } from "./../interface/configMenu.js"

const main = async () => {
    await loadContainers()
    await loadListMenu()
    await loadConfigMenu()
}

main()