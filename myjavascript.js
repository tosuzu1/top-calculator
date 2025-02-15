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
    // handle button clicks
    updateNumber(Number(event.target.dataset.number));
}

function updateNumber (num) {
    // update numbers on display
    if (previousOp === 6) {
        // if previous op was equal, if we write a number, overwrite that value
        currentVal = 0;
        displayVal = 0;
        previousOp = 0;
    }

    digitsAmount += 1;
    if (isDecimal) {
        let tempVal = num / (decimalPlaces);
        displayVal += tempVal;
        console.log(displayVal, tempVal);
        decimalPlaces *= 10;
    }
    else {
        displayVal *= 10;
        displayVal += num;
    }

    if (currentOp != 0) {
        // if we are currently performing a op, store it and clear our current op
        previousOp = currentOp;
        currentOp = 0;
    }

    // update display
    updateDisplay();
}

// handle button press on keyboard
document.addEventListener("keydown", handleKeypress);
function  handleKeypress(event ) {
    // console.log(`${event.code}`)
    switch (event.code){
        case "Digit0" :
            updateNumber(0);
            break;
        case "Numpad0" :
            updateNumber(0);
            break;
        case "Digit1" :
            updateNumber(1);
            break;
        case "Numpad1" :
            updateNumber(1);
            break;
        case "Digit2" :
            updateNumber(2);
            break;
        case "Numpad2" :
            updateNumber(2);
            break;
        case "Digit3" :
            updateNumber(3);
            break;
        case "Numpad3" :
            updateNumber(3);
            break;
        case "Digit4" :
            updateNumber(4);
            break;
        case "Numpad4" :
            updateNumber(4);
            break;
        case "Digit5" :
            updateNumber(5);
            break;
        case "Numpad5" :
            updateNumber(5);
            break;
        case "Digit6" :
            updateNumber(6);
            break;
        case "Numpad6" :
            updateNumber(6);
            break;
        case "Digit7" :
            updateNumber(7);
            break;
        case "Numpad7" :
            updateNumber(7);
            break;
        case "Digit8" :
            updateNumber(8);
            break;
        case "Numpad8" :
            updateNumber(8);
            break;
        case "Digit9" :
            updateNumber(9);
            break;
        case "Numpad9" :
            updateNumber(9);
            break;
        case "NumpadDecimal" :
            handleDecimalBtn();
            break;
        case "Period" :
            handleDecimalBtn();
            break;
        case "Equal" :
            handleOperation(5);
            break;
        case "Minus" :
            handleOperation(4);
            break;
        case "NumpadDivide" :
            handleOperation(2);
            break;
        case "NumpadMultiply" :
            handleOperation(3);
            break;
        case "NumpadSubtract" :
            handleOperation(4);
            break;
        case "NumpadAdd" :
            handleOperation(5);
            break;
        case "Enter" :
            handleEqualBtn();
            break;
        case "NumpadEnter" :
            handleEqualBtn();
            break;
        default :
            console.log("Can't handle switch for keypress");
            break;
    }
}

// Handle reset button
const resetButton = document.querySelector("#keyAC");
resetButton.addEventListener("click", resetCalulator);

function resetCalulator(event ) {
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
operationBtn.forEach(ele => ele.addEventListener("click", clickOperation));

function clickOperation(event) {
    tempOp = Number(event.target.dataset.op);
    handleOperation(tempOp);
}

function handleOperation(op) {
    isDecimal = false;
    digitsAmount = 0;
    //0 = no operation, 1 = modulus, 2 = divide, 3 = mul, 4 = subtract,5 = add
    decimalPlaces = 10;

    if (previousOp === 0) {
        if (currentOp === 0) {
        // if there is no pervious oerpations to handle, we don't need to operate display

        // step one, store the display value
        currentVal = displayVal;
        displayVal = 0; // clear display next
      

        // get current operation, can switch
        currentOp = op

       }
        else  {
        // handle just changing opertion
        currentOp = op
        }
    }
    else {
        currentOp = op;

        switch (previousOp){
            case 0:
                // do nothing
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
            case 6:
                // handle pressing op after equal
                // currentVal = displayVal;
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
    previousOp = 6;
    currentVal = 0;
}