// TODO: zero cannot be in the beginning DONE
// TODO2: zero at the start of the program DONE
// TODO2.5: adjust equal behavior DONE
// TODO3: disable forbidden buttons (point, disable all on error?) DONE
// TODO 3.25 anything else on error? DONE

// TODO 3.21 after equal and new operator being pressed, 
// the previous display should show nothing after the operator DONE

// TODO 3.3 backspace behaviour = should return the same number if no operator present
// TODO 3.5: add limit to variables;
// TODO4: line 60 - revise?

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
    "ERROR"
}

// display function:

function display(){
    firstVariable = firstVariable.toString();

    if (firstVariable.length == 0) firstVariable = "0";

    displayCurrent.innerHTML = firstVariable;

    if (firstVariable == "ERROR") {
        equalButton.disabled = true;
        Array.from(operatorButtons).forEach(button => button.disabled = true);
    }
    else {
        equalButton.disabled = false;
        Array.from(operatorButtons).forEach(button => button.disabled = false);
    }

    if (firstVariable.includes(".") == true) pointButton.disabled = true
    else pointButton.disabled = false;

    displayPrevious.innerHTML = `${secondVariable} ${operator} ${tempVariable}`;
    if (equalClicked == true) {
        displayPrevious.innerHTML = `${secondVariable} ${operator} ${tempVariable} =`;
    }
};

display();

// input numbers:

Array.from(numberButtons).forEach((button) => button.addEventListener("click", () => {
    if (equalClicked == true && operatorClicked == false) clear();
    equalClicked = false;
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
    if (equalClicked == true) {
        tempVariable = "";
    }

    equalClicked = false;

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

    if (firstVariable == NaN || firstVariable == undefined || firstVariable == "") firstVariable = secondVariable;
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

equalButton.addEventListener("click", () => equal());

// backspace:

backspaceButton.addEventListener("click", () => {
    if (equalClicked == true && operatorClicked == false) clear();
    equalClicked = false;
    firstVariable = firstVariable.slice(0, -1);
    display();
})

// clear:

function clear() {
    firstVariable = "0";
    secondVariable = "";
    operator = "";
    tempVariable = "";
    tempVariableTwo = "";
    equalClicked = false;
    operatorClicked = false;
    numberClicked = false;
    display();
}

clearButton.addEventListener("click", () => clear());