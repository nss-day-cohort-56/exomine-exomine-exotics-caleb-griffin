//import statements will go here
import { Facilities } from "./Facilities.js"
import { Governors } from "./Governors.js"
import { FacilityInventory, showCart } from "./FacilityInventory.js"
import { Minerals } from "./Minerals.js"
import { purchaseMineral, getTransientState } from "./database.js"

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
        <h2>Space Cart</h2>
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
            const transState = getTransientState()
            if (transState.selectedColony > 0 && transState.selectedGovernor > 0 && transState.selectedFacility > 0 && transState.selectedFacilityMineral > 0 && transState.selectedMineral > 0) {
                purchaseMineral()
            } else {
                window.alert("Please select an option from each category")
            }
        }
    }
)