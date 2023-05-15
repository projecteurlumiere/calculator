// variables:

let firstVariable = "";
let secondVariable = "";
let operator = "";
let tempVariable = "";
let = operatorClicked = false;
let = equalClicked = false;
const numberButtons = document.getElementsByClassName("number");
const operatorButtons = document.getElementsByClassName("operator");
const displayPrevious = document.getElementsByClassName("previous")[0];
const displayCurrent = document.getElementsByClassName("current")[0];
const equalButton = document.getElementById("equal");
const clearButton = document.getElementById("clear");


// operate function:

function operate(a, operator, b){
    a = parseInt(a, 10);
    b = parseInt(b, 10);
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
}

// input numbers:

Array.from(numberButtons).forEach((button) => button.addEventListener("click", () => {
    firstVariable += button.textContent;
    console.log(button.textContent);
    display();
}))


// input operator:

Array.from(operatorButtons).forEach((button) => button.addEventListener("click", () => {
    console.log(button.textContent);
    operator = button.textContent;
    secondVariable = firstVariable;
    display();
    firstVariable = "";
}))

// equal:

equalButton.addEventListener("click", () =>{
    tempVariable = firstVariable;
    firstVariable = operate(secondVariable, operator, firstVariable);
    equalClicked = true;
    display();
    equalClicked = false;
    tempVariable = "";
})


// clear:

clearButton.addEventListener("click", () => {
    firstVariable = "";
    secondVariable = "";
    operator = "";
    display()
});