// Handle Slider Control and Display Password Length ------------------------------------
let lengthDisplay = document.querySelector('[lengthDisplay]');
// console.log(lengthDisplay)
let slider = document.querySelector('input[type=range]');
// console.log(slider)


function handleSlider() {
    slider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}
//initial value
let passwordLength = 10;
handleSlider();

slider.addEventListener('input', (event) => {
    passwordLength = event.target.value;
    handleSlider();
});



//Generate Random Letters and Number and Symbols-------------------------------------------

function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Random Lowercase Letter 
function generateRandomLowercase() {
    return String.fromCharCode(generateRandom(97, 123));
}

// Random Uppercase Letter 
function generateRandomUppercase() {
    return String.fromCharCode(generateRandom(65, 91));
}

// Random Number 
function generateRandomNumber() {
    return generateRandom(1, 10);
}

// Generate Symbol 
const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

function generateRandomSymbol() {
    let index = generateRandom(0, symbol.length);
    return symbol[index];
}

// console.log(generateRandomLowercase());
// console.log(generateRandomUppercase());
// console.log(generateRandomNumber());
// console.log(generateRandomSymbol());


// Strength Color Based on Password --------------------------------------------------------
let indicator = document.querySelector('.indicator');

// Set Indicator 
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0 0 12px 1px ${color}`;
}

// Default Indicator 
setIndicator("#ccc");

const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const numbers = document.querySelector('#numbers');
const symbols = document.querySelector('#symbols');

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (uppercase.checked) hasUpper = true;
    if (lowercase.checked) hasLower = true;
    if (numbers.checked) hasNumber = true;
    if (symbols.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}


// Copy Message --------------------------------------------------------------------------------
let copyMessage = document.querySelector("[copyMessage]");
let copyBtn = document.querySelector(".copyBtn");
let passwordDisplay = document.querySelector("input[passwordDisplay]");
// passwordDisplay.value="hello"

// Why we use it - 
// https://stackoverflow.com/questions/45071353/copy-text-string-on-click#:~:text=15-,Use%20the%20Clipboard,-API!
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);

        copyMessage.innerText = "Copied"
    }
    catch (e) {
        // alert("Something went wrong in CopyContent");
        copyMessage.innerText = "Failed";
    }

    copyMessage.classList.add('active');

    setTimeout(() => {
        copyMessage.classList.remove('active');
    }, 2000)
}

copyBtn.addEventListener("click", () => {
    if (passwordDisplay.value)
        copyContent();
});