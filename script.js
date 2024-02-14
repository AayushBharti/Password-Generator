// Handle Slider Control and Display Password Length ------------------------------------
let lengthDisplay = document.querySelector('[lengthDisplay]');
let slider = document.querySelector('input[type=range]');

function handleSlider() {
    slider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    //bar color
    slider.style.backgroundSize=((passwordLength - slider.min)*100/(slider.max-slider.min)) + "% 100%";
    // slider.style.backgroundSize="10% 100%";
}

//initial value
let passwordLength = 10;
handleSlider();

slider.addEventListener('input', (event) => {
    passwordLength = event.target.value;
    handleSlider();
});



//Generate Random Letters and Number and Symbols-------------------------------------------

// genarate any random no. b/w min and max(exclusive)
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

// generate any random no. b/w 0- 9
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
let indicatorText = document.querySelector('.indicator-text');

// Set Indicator 
function setIndicator(color,text) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0 0 30px 1px ${color}`;
    indicatorText.innerText=text;
}

// Default Indicator 
setIndicator("#ccc","");

const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const numbers = document.querySelector('#numbers');
const symbols = document.querySelector('#symbols');

function calcStrength() {
    // let hasUpper = false;
    // let hasLower = false;
    // let hasNumber = false;
    // let hasSymbol = false;

    // if (uppercase.checked) hasUpper = true;
    // if (lowercase.checked) hasLower = true;
    // if (numbers.checked) hasNumber = true;
    // if (symbols.checked) hasSymbol = true;

    if (uppercase.checked && lowercase.checked && 
        numbers.checked && symbols.checked && passwordLength >= 12) 
        {
        setIndicator("#0f0","Very Strong");
    } else if (uppercase.checked && lowercase.checked && 
        (numbers.checked || symbols.checked) && passwordLength >= 8) 
    {
        setIndicator("#0f0","Strong");
    } else if (
        (lowercase.checked || uppercase.checked) &&
        (numbers.checked || symbols.checked) &&
        passwordLength >= 6) 
    {
        setIndicator("#ff0","Normal");
    }
     else {
        setIndicator("#f00","Weak");
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

passwordDisplay.addEventListener("click", () => {
    if (passwordDisplay.value)
        copyContent();
});









// CheckBox - Handle  -----------------------------------------------------------------------
// By Default UpperCase Checked 

let checkBoxes = document.querySelectorAll("input[type=checkbox]");
let checkCount = 0;

checkBoxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

function handleCheckBoxChange() {
    checkCount = 0;
    checkBoxes.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    });

    //special condition
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}




// Handle generate password------------------------------------------------------------------

let password = "";
let generateBtn = document.querySelector("#generateBtn");
// uppercase already checked
uppercase.checked=true;
checkCount=1;

generateBtn.addEventListener('click', () => {
    // none of the checkboxes are selected
    if(checkCount <= 0){
        alert('Atleast check one checkbox');
        return;
    }

    // password-length should be >= selected no. of checkbox
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // Remove Previous Password 
    passwordDisplay.value= "Preparing..."
    password = "";

    let arrayOfCheckedFunction = [];

    // add selected checkbox functions to an array
    if (uppercase.checked) arrayOfCheckedFunction.push(generateRandomUppercase);
    if (lowercase.checked) arrayOfCheckedFunction.push(generateRandomLowercase);
    if (numbers.checked) arrayOfCheckedFunction.push(generateRandomNumber);
    if (symbols.checked) arrayOfCheckedFunction.push(generateRandomSymbol);

    // add the required characters - compulsory addition 
    // for(let i=0; i < arrayOfCheckedFunction.length; i++){
    //     password += arrayOfCheckedFunction[i]();
    // }

    // adding random characters till the (password length - remaining addition)
    // for(let i = 0; i < passwordLength - arrayOfCheckedFunction.length; i++){
    for(let i = 0; i < passwordLength; i++){
        let randIndex = generateRandom(0, arrayOfCheckedFunction.length);
        password += arrayOfCheckedFunction[randIndex]();
    }

    //now no need to shuffle, Since we added through rand index;

    
    // shuffle the newly created pass.
    // password = shuffleArray(Array.from(password)); 
    setTimeout(()=>{
        passwordDisplay.value = password;
        calcStrength();
    },1200)
    
    // console.log('password :', password);

    
});


// Shuffle the array randomly - Fisher Yates algorithm Shuffle.--------------------------

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // find out random j
      const j = Math.floor(Math.random() * (i + 1));
      // swap 2 numbers
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    let str = "";
    // array.forEach((el) => (str += el));
    str = array.join("");
    return str;
}