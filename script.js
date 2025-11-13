const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");

let operand1 = null;
let operand2 = null;
let currOperator = null;
let toClearDisplay = false;

const maxLength = 16;
const operators = ["+", "-", "*", "/"];

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator, operand1, operand2) => {
    let a = +operand1;
    let b = +operand2;

    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

const appendNum = num => {
    if(toClearDisplay) {
        clearDisplay();
    }

    if(num === "." && display.value.includes(".")) {
        return;
    }

    if(display.value.length >= maxLength) {
        return;
    }

    if(display.value === "0" && num !== ".") {
        display.value = num;
    } else {
        display.value += num;
    }
}

const setOperator = operator => {
    if(currOperator !== null) {
        evaluate();
    }
    operand1 = display.value;
    currOperator = operator;
    toClearDisplay = true;
}

const evaluate = () =>{
    operand2 = display.value;
    const total = operate(currOperator, operand1, operand2);

    if(isNaN(total)){
        return;
    }

    if(!Number.isInteger(total)){
        display.value = total.toFixed(2);
    } else {
        display.value = total;
    }
}

const clear = () => {
    operand1 = null;
    operand2 = null;
    currOperator = null;
    display.value = 0;
}

const deleteNum = () => {
    if(display.value === "Infinity") {
        clearDisplay();
        display.value = 0;
    }
    if(display.value.length <= 1) {
        display.value = 0;
    } else {
        let currentVal = display.value;
        let newVal = currentVal.slice(0, -1);
        display.value = newVal;
    }
}

const clearDisplay = () => {
    display.value = null;
    toClearDisplay = false;
}

const handleButtonClick = value => {
    if(!isNaN(value) || value === ".") {
        appendNum(value);
    } else if (operators.includes(value)) {
        setOperator(value);
    } else if (value === "=") {
        evaluate();
    } else if (value === "clear") {
        clear();
    } else if (value === "delete") {
        deleteNum();
    }
}

const handleKeyboadInput = e => {
    let key = e.key;

    if(key >= 0 && key <= 9) {
        appendNum(key);
    } else if (key === ".") {
        appendNum(".");
    } else if (operators.includes(key)) {
        setOperator(key);
    } else if (key === "Enter") {
        e.preventDefault();
        evaluate();
    } else if (key === "Backspace") {
        deleteNum();
    } else if (key.toLowerCase() === "c" || key === "Escape" || key === "Delete") {
        clear();
    }
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        handleButtonClick(button.value);
    })
});

window.addEventListener("keydown", handleKeyboadInput);