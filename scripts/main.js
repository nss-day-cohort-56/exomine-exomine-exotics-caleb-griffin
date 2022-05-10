import { Exomine } from "./Exomine.js"

document.addEventListener(
    "stateChanged",
    (stateChanged) => {
        console.log("State Changed! Rerendering html...")
        renderAllHTML()
    }
)

// select container for html in index.html based on id
const mainContainer = document.querySelector("#container")

// create function to invoke Exomine() that to render html
const renderAllHTML = () => {
    mainContainer.innerHTML = Exomine()
}

// invoke renderAllHTML function.
renderAllHTML()


