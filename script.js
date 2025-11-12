let operand1 = 0;
let operand2 = 0;
let operator = "";

const add = (num1, num2) => {
    return num1 + num2;
}

const subtract = (num1, num2) => {
    return num1 - num2;
}

const multiply = (num1, num2) => {
    return num1 * num2;
}

const divide = (num1, num2) => {
    return num1 / num2;
}

const operate = (operator, operand1, operand2) => {
    let total = 0;

    switch (operator) {
        case "+":
            total = add(operand1, operand2);;
            break;
        case "-":
            total = subtract(operand1, operand2);
            break;
        case "*":
            total = multiply(operand1, operand2);
            break;
        case "/":
            total = divide(operand1, operand2);
            break;
        default:
            alert("No operator was entered.");
            break;
    }

    return total;
}