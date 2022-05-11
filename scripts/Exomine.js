//import statements will go here
import { Facilities } from "./Facilities.js"
import { Governors } from "./Governors.js"
import { FacilityInventory, showCart } from "./FacilityInventory.js"
import { Minerals } from "./Minerals.js"
import { purchaseMineral } from "./database.js"

// HTML builder function that will be imported to main.js. Put everything in containers so we can apply flexbox and structure it like the wireframe later on.
export const Exomine = () => {
    return `
    <header>
    <img src="/images/favpng_symbol-mining-mine-logo.png" alt="logo">
    <h1>Solar System Mining Marketplace</h1>
    <img src="/images/favpng_symbol-mining-mine-logo.png" alt="logo">
    </header>

    <section class="selection-colony-inv-flex-container">

        <section class="selection-container">
            ${Governors()}
            ${Facilities()}
        </section>

        <section class="colony-inv-container">
            ${Minerals()}
        </section>

    </section>

    <section class="facility-inv-purchase-flex-container">

        <section class="facility-inv-container">
            ${FacilityInventory()}
        </section>

        <section class="cart-section">
            ${showCart()}
            <button type="button" id="purchaseButton">Purchase Mineral</button>
        </section>

    </section>
    `
}

document.addEventListener(
    "click",
    (clickEvent) => {
        if (clickEvent.target.id === "purchaseButton") {
            purchaseMineral()
        }
    }
)