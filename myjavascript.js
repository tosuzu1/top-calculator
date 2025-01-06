let displayVal = 0;
let currentVal = 0;
let currentOp = 0; 
let digitsAmount = 0;
let numberPresent = false;
//0 = no operation, 1 = modulus, 2 = divide, 3 = mul, 4 = subtract,5 = add
let isDecimal = false;
let decimalPlaces = 10;
const MAX_DIGIT = 15;
let calculateState = 0;

const display = document.querySelector("#display-value");

function updateDisplay (e) {
    display.textContent = displayVal;
}

// Handle number presses
const numberKeys = document.querySelectorAll(".number");
numberKeys.forEach((ele) => ele.addEventListener("click", handleNumberButton));

function handleNumberButton (event) {
    numberPresent = true;
    digitsAmount += 1;
    if (isDecimal) {
        let tempVal = Number(event.target.dataset.number) / (decimalPlaces);
        displayVal += tempVal;
        console.log(displayVal, tempVal);
        decimalPlaces *= 10;
    }
    else {
        displayVal *= 10;
        displayVal += Number(event.target.innerHTML);
    }

    // update display
    updateDisplay();
}

// Handle reset button
const resetButton = document.querySelector("#keyAC");
resetButton.addEventListener("click", resetCalulator);

function resetCalulator(event) {
    displayVal = 0;
    currentVal = 0;
    currentOp = 0;
    isDecimal = false;
    digitsAmount = 0;
    //0 = no operation, 1 = modulus, 2 = divide, 3 = mul, 4 = subtract,5 = add
    decimalPlaces = 10;

    // update display
    updateDisplay();
}

// Handle decimal
const decimalButton = document.querySelector("#keyDecimal");
decimalButton.addEventListener("click", handleDecimalBtn);

function handleDecimalBtn(event) {
    if (!isDecimal) {
        // if the current is not a decimal, switch to decimal operations
        isDecimal = true;
    } 
}

// Handle plus/minus key
const signButton = document.querySelector("#keyPlus-minus");
signButton.addEventListener("click", handleSignBtn);

function  handleSignBtn(event) {
    displayVal *= -1;
    updateDisplay();
}

// handle addBtn
const addBtn = document.querySelector("#keyAdd");
addBtn.addEventListener("click", handleAdd);

function handleAdd(event) {
    if (currentOp && numberPresent) {
        // if there is a current operation to handle
        switch (currentOp) {
            case 1:
                displayVal = currentVal % displayVal;
                updateDisplay();
                numberPresent = false;
                currentOp = 5;
                break;
            case 2:
                displayVal = currentVal / displayVal;
                updateDisplay();
                numberPresent = false;
                currentOp = 5;
                break;
            case 3:
                displayVal = currentVal * displayVal;
                updateDisplay();
                numberPresent = false;
                currentOp = 5;
                break;
            case 4:
                displayVal = currentVal - displayVal;
                updateDisplay();
                numberPresent = false;
                currentOp = 5;
                break;
            case 5:
                displayVal = currentVal + displayVal;
                updateDisplay();
                numberPresent = false;
                currentOp = 5;
                break;
        }

    } else if (currentOp && !numberPresent) {
        // There was a prevOperation but a number wasn't pressed, overide it
        currentOp = 5;

    } else if (!currentOp && numberPresent) {
        // first time a number was enter followed by the firest operation
        currentVal = displayVal;
        currentOp = 5;
        displayVal = 0;
        updateDisplay();

    } else {
        // if no number are present and this is the first operation of the calculator
        currentVal = 0;
        currentOp =5;
    }
}