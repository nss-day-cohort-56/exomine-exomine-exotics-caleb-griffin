//import statements will go here

import { Governors } from "./Governors.js"

// HTML builder function that will be imported to main.js. Put everything in containers so we can apply flexbox and structure it like the wireframe later on.
export const Exomine = () => {
    return `
    <header>
        <h1>Solar System Mining Marketplace</h1>
    </header>

    <section class="selection-colony-inv-flex-container">

        <section class="selection-container">
            <h3>Choose governor function here</h3>
            ${Governors()}
            <h3>Choose facility function here</h3>
        </section>

        <section class="colony-inv-container">
            <h2>Colony minerals function here</h2>
        </section>

    </section>

    <section class="facility-inv-purchase-flex-container">

        <section class="facility-inv-container">
            <h2>Facility inventory function here</h2>
        </section>

        <section class="cart-section">
            <h2>Cart function here</h2>
            <button type="button" id="purchaseButton">Purchase Mineral</button>
        </section>

    </section>
    `
}