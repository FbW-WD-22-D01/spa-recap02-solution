const colorList = document.getElementById("colors");
const colorForm = document.getElementById("color-form");

/**
 * Converts a decimal value to a hexedecimal string
 * 
 * @param {number} number
 */
function decToHex(number) {
    return number.toString(16).padStart(2, "0")
}

/**
 * Returns a random number between min & max.
 *
 * @param {number} min
 * @param {number} max
 */
function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random hexadecimal color value for CSS.
 */
function generateRandomColor() {
    let hexCode = '#';

    for (let i = 0; i < 3; i++) {
        hexCode += decToHex(getRandomNumber(0, 255));
    }

    return hexCode;
}

/**
 * Adds a new item to the list of color items (#colors).
 *
 * @param {string} color  hexedicmal color value
 */
function addColorItem(color) {
    const newItem = document.createElement("li");

    newItem.classList.add("color");
    newItem.style.backgroundColor = color;

    newItem.innerHTML = `
    ${color}
    <button class="btn btn-secondary btn-delete">x</button>
  `;

    colorList.appendChild(newItem);
}

/**
 * Handles the event to remove an element, when the X button is clicked.
 * 
 * @param {Event} e
 */
function removeItemHandler(e) {
    const isDeleteButton = e.target.closest(".btn-delete");

    if (isDeleteButton !== null) {
        const item = e.target.closest("li");
        colorList.removeChild(item);
    }
}

colorList.addEventListener("click", removeItemHandler);

/**
 * Handles the submit of the color form and adds {n} items to the list.
 *
 * @param {Event} e
 */
function addColorFormHandler(e) {
    e.preventDefault();

    const amountOfColors = Number(document.getElementById("color-amount").value);

    for (let i = 0; i < amountOfColors; i++) {
        addColorItem(
            generateRandomColor()
        );
    }
}

colorForm.addEventListener("submit", addColorFormHandler);

/**
 * Initial function called on loading the page, to create some demo
 * color values (3 in total).
 */
function init() {
    document.getElementById("loading").style.display = "none";

    for (let i = 0; i < 3; i++) {
        addColorItem(generateRandomColor());
    }
}

init();