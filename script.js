// TODO: zero cannot be in the beginning DONE
// TODO2: zero at the start of the program DONE
// TODO2.5: adjust equal behaviour
// TODO3: disable forbidden buttons (point, disableall on error?)
// TODO4: line 60 - revise?

// variables:

let firstVariable = "0";
let secondVariable = "";
let operator = "";
let tempVariable = "";
let tempVariableTwo = "";
let = operatorClicked = false;
let = equalClicked = false;
let = numberClicked = false;
const numberButtons = document.getElementsByClassName("number");
const operatorButtons = document.getElementsByClassName("operator");
const displayPrevious = document.getElementsByClassName("previous")[0];
const displayCurrent = document.getElementsByClassName("current")[0];
const equalButton = document.getElementById("equal");
const clearButton = document.getElementById("clear");
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
    "ERROR"
}

// display function:

function display(){
    displayCurrent.innerHTML = firstVariable;
    displayPrevious.innerHTML = `${secondVariable} ${operator} ${tempVariable}`;
    if (equalClicked == true) {
        displayPrevious.innerHTML += " =";
    }
};

display();

// input numbers:

Array.from(numberButtons).forEach((button) => button.addEventListener("click", () => {
    if (firstVariable == "0" && button.textContent !=".") {
        firstVariable = firstVariable.slice(0, -1);
    }
    firstVariable += button.textContent;
    console.log(button.textContent);
    display();
    numberClicked = true;
}))


// input operator:

Array.from(operatorButtons).forEach((button) => button.addEventListener("click", () => {
    if (operatorClicked == true && numberClicked == true) {
        equal();
        operator = button.textContent;
        secondVariable = firstVariable;
        tempVariableTwo = firstVariable;
        firstVariable = "";
        operatorClicked = true;
        return
    }
    else if (operatorClicked == true) firstVariable = tempVariableTwo;
    operator = button.textContent;
    secondVariable = firstVariable;
    display();
    tempVariableTwo = firstVariable;
    firstVariable = "";
    operatorClicked = true;
}))

// equal:

function equal(){
    tempVariable = firstVariable;
    firstVariable = operate(secondVariable, operator, firstVariable);
    equalClicked = true;
    display();
    equalClicked = false;
    operatorClicked = false;
    numberClicked = false;
    tempVariable = "";
    secondVariable = firstVariable;
};

equalButton.addEventListener("click", () => equal());

// backspace:

backspaceButton.addEventListener("click", () => {
    firstVariable = firstVariable.slice(0, -1);
    display();
})

// clear:

clearButton.addEventListener("click", () => {
    firstVariable = "0";
    secondVariable = "";
    operator = "";
    tempVariable = "";
    tempVariableTwo = "";
    equalClicked = false;
    operatorClicked = false;
    numberClicked = false;
    display();
});