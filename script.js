let number1, number2, oprt;


function operate(op, num1, num2){
    if (op === "÷") {
        op = "/";
    }

    switch(op){
        case "+":
            return add(num1, num2);

        case "-":
            return subtract(num1, num2);
        
        case "X":
            return multiply(num1, num2);
        
        case "/":
            return divide(num1, num2);

        case "%":
            return percentage(num1, num2);
    }
}

function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function percentage(num1, num2){
    return num1 * num2 / 100;
}

