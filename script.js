// variables:

let firstVariable = "";
let secondVariable = "";
let operator = "";
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
    displayCurrent.innerHTML += ` ${operator}`;
    displayPrevious.innerHTML = secondVariable;
    displayPrevious.innerHTML += ` ${operator}`;  
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
    firstVariable = operate(secondVariable, operator, firstVariable);
    display();
})


// clear:

clearButton.addEventListener("click", () => {
    firstVariable = "";
    secondVariable = "";
    operator = "";
    display()
});