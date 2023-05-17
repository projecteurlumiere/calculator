// variables:

let firstVariable = "0";
let secondVariable = "";
let operator = "";
let tempVariable = "";
let tempVariableTwo = "";
let tempVariableThree = "";
let operatorClicked = false;
let equalClicked = false;
let numberClicked = false;
const numberButtons = document.getElementsByClassName("number");
const operatorButtons = document.getElementsByClassName("operator");
const displayPrevious = document.getElementsByClassName("previous")[0];
const displayCurrent = document.getElementsByClassName("current")[0];
const equalButton = document.getElementById("equal");
const clearButton = document.getElementById("clear");
const pointButton = document.getElementById("point");
const backspaceButton = document.getElementById("backspace");

// operate function:

function operate(a, operator, b){
    a = parseFloat(a, 10);
    b = parseFloat(b, 10);
    return operator === "+" ? a + b :
    operator === "-" ? a - b :
    operator === "*" ? a * b :
    operator === "/" && b === 0 ? "ERROR" :
    operator === "/" ? a / b :
    operator === "" ? b :
    "ERROR"
}

// display function:

function display(){
    firstVariable = firstVariable.toString();
    if (firstVariable.length == 0) firstVariable = "0";

    if (firstVariable == ".") firstVariable = "0.";

    displayCurrent.innerHTML = firstVariable;

    disableButtons();

    displayPrevious.innerHTML = `${secondVariable} ${operator} ${tempVariable}`;
    if (equalClicked == true) {
        displayPrevious.innerHTML = `${secondVariable} ${operator} ${tempVariable} =`;
    }
    if (operator == "" && firstVariable == secondVariable) {
        displayPrevious.innerHTML = `${secondVariable} =`
    }
};

display();

// input numbers:

Array.from(numberButtons).forEach((button) => button.addEventListener("click", () => inputNumbers(button)))
Array.from(numberButtons).forEach((button) => document.addEventListener("keydown", (event) => {
    if (event.key == "." && pointButton.disabled == true) return;
    else if (event.key == button.textContent) inputNumbers(button);
}))

function inputNumbers(button){
    if (equalClicked == true && operatorClicked == false) clear();

    equalClicked = false;

    if (firstVariable == "0" && button.textContent !=".") {
        cutLast();
    }

    firstVariable += button.textContent;
    display();
    numberClicked = true;
}

// input operator:

Array.from(operatorButtons).forEach((button) => button.addEventListener("click", () => inputOperator(button)));
Array.from(operatorButtons).forEach((button) => document.addEventListener("keydown", (event) => {
    if (event.key == button.textContent) {
        event.preventDefault();
        inputOperator(button)
    }
}))

function inputOperator(button) {
    cutPoint();

    if (equalClicked == true) {
        tempVariable = "";
    }

    equalClicked = false;

    if (operatorClicked == true && numberClicked == true) {
        equal();
        inputOperatorMisc(false, button);
        return
    }

    else if (operatorClicked == true) firstVariable = tempVariableTwo;

    inputOperatorMisc(true, button);
}

// equal function:

equalButton.addEventListener("click", () => equal());
document.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        event.preventDefault(); // prevents: as soon as you click button, subsequent enter clicks this button too
        equal();
    }
});

function equal(){
    if (firstVariable == NaN || firstVariable == undefined || firstVariable == "") firstVariable = secondVariable;
    
    cutPoint();

    if (equalClicked == true) {
        tempVariable = tempVariableThree;
        secondVariable = firstVariable;
        firstVariable = tempVariableThree;
        firstVariable = operate(secondVariable, operator, firstVariable);
        display();
    }
    else {
        tempVariable = firstVariable;
        firstVariable = operate(secondVariable, operator, firstVariable);
        equalClicked = true;
        display();
        operatorClicked = false;
        numberClicked = false;
        tempVariableThree = tempVariable;
        tempVariable = "";
        secondVariable = firstVariable;
    }
};

// backspace:

backspaceButton.addEventListener("click", () => backspace());
document.addEventListener("keydown", (event) => {
    if (event.key == "Backspace") backspace();
});

function backspace() {
    if (firstVariable == "ERROR") clear()

    else if (equalClicked == true && operatorClicked == false) {
        display();
        displayPrevious.innerHTML = ``;
    }

    else {
        equalClicked = false;
        cutLast()
        display();
    }
}

// cutLast function:

function cutLast() {
    firstVariable = firstVariable.slice(0, -1);

}

// cutPoint function: 

function cutPoint(){
    if (firstVariable.slice(-1) == ".") cutLast();
    if (firstVariable == 0 && firstVariable.includes("0")) firstVariable = 0;
}

// clear function:

clearButton.addEventListener("click", () => clear());
document.addEventListener("keydown", (event) => {
    if (event.key == "Escape" || event.key == "Delete") {
        event.preventDefault();
        clear();
    }
});

function clear() {
    firstVariable = "0";
    secondVariable = "";
    operator = "";
    tempVariable = "";
    tempVariableTwo = "";
    tempVariableThree = "";
    equalClicked = false;
    operatorClicked = false;
    numberClicked = false;
    display();
}

// disableButtons function:

function disableButtons() {
    if (firstVariable == "ERROR") {
        equalButton.disabled = true;
        Array.from(operatorButtons).forEach(button => button.disabled = true);
    }
    else {
        equalButton.disabled = false;
        Array.from(operatorButtons).forEach(button => button.disabled = false);
    }

    if (firstVariable.includes(".") == true) pointButton.disabled = true;
    else pointButton.disabled = false;
}

// inputMisc function (see input):

function inputOperatorMisc(displayBoolean, btn){
    operator = btn.textContent;
    secondVariable = firstVariable;
    if (displayBoolean == true) display();
    tempVariableTwo = firstVariable;
    firstVariable = "";
    operatorClicked = true;
}