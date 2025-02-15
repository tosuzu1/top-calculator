let displayVal = 0;
let currentVal = 0;
let currentOp = 0; 
let digitsAmount = 0;
let previousOp = 0;
//0 = no operation, 1 = modulus, 2 = divide, 3 = mul, 4 = subtract,5 = add
let isDecimal = false;
let decimalPlaces = 10;
const MAX_DIGIT = 15;


const display = document.querySelector("#display-value");

function updateDisplay (e) {
    display.textContent = displayVal;
}

// Handle number presses click
const numberKeys = document.querySelectorAll(".number");
numberKeys.forEach((ele) => ele.addEventListener("click", handleNumberButton));

function handleNumberButton (event) {
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

    if (currentOp != 0) {
        // if we are currently performing a op, store it and clear our current op
        previousOp = currentOp;
        currentOp = 0;
    }

    // update display
    updateDisplay();
}

function updateNumber (e) {
    
}

// handle button press on keyboard
document.addEventListener("keydown", log);
function log(event ) {
    console.log(`${event}`);
}

// Handle reset button
const resetButton = document.querySelector("#keyAC");
resetButton.addEventListener("click", resetCalulator);

function resetCalulator(event) {
    displayVal = 0;
    currentVal = 0;
    currentOp = 0;
    previousOp = 0;
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
const operationBtn = document.querySelectorAll(".operation");
operationBtn.forEach(ele => ele.addEventListener("click", handleOperation));

function handleOperation(event) {
    if (previousOp === 0) {
        if (currentOp === 0) {
        // if there is no pervious oerpations to handle, we don't need to operate display

        // step one, store the display value
        currentVal = displayVal;
        displayVal = 0; // clear display next

        // get current operation, can switch
        currentOp = Number(event.target.dataset.op);

       }
        else  {
        // handle just changing opertion
        currentOp = Number(event.target.dataset.op);
        }
    }
    else {
        currentOp = Number(event.target.dataset.op);

        switch (previousOp){
            case 1:
                // handle modlus
                displayVal = currentVal % displayVal;
                updateDisplay();
                break;
            case 2:
                // handle divide
                displayVal = currentVal / displayVal;
                updateDisplay();
                break;
            case 3:
                // handle multiply
                displayVal = currentVal * displayVal;
                updateDisplay();
                break;
            case 4:
                // handle minus
                displayVal = currentVal - displayVal;
                updateDisplay();
                break;
            case 5:
                // handle add
                displayVal = currentVal + displayVal;
                updateDisplay();
                break;
            default :
                console.log("UNKNOWN ERROR IN OPERATION!");
        }
        previousOp = 0;
        currentVal = displayVal;
        displayVal = 0;
    }
    
}

// handle equal button
const equalButton = document.querySelector("#keyEqual");
equalButton.addEventListener("click", handleEqualBtn);

function handleEqualBtn(event) {
    switch (previousOp){
        case 1:
            // handle modlus
            displayVal = currentVal % displayVal;
            updateDisplay();
            break;
        case 2:
            // handle divide
            displayVal = currentVal / displayVal;
            updateDisplay();
            break;
        case 3:
            // handle multiply
            displayVal = currentVal * displayVal;
            updateDisplay();
            break;
        case 4:
            // handle minus
            displayVal = currentVal - displayVal;
            updateDisplay();
            break;
        case 5:
            // handle add
            displayVal = currentVal + displayVal;
            updateDisplay();
            break;
        default :
            console.log("UNKNOWN ERROR IN OPERATION!");
    }
    previousOp = 0;
    currentVal = displayVal;
    displayVal = 0;
}