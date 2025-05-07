let number1, number2, oprt;

const displayBox = document.querySelector("#display-box");
const buttons = document.querySelectorAll(".buttons");

const allowedKeys = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "+", "-", "*", "/", "%",".", "(", ")", "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Enter"
  ];

const operations = ["+", "-", "*", "x", "/", "%", "÷"];

document.addEventListener("keydown", function(e){
    if (!allowedKeys.includes(e.key)) {
        e.preventDefault();
        return;
    }

    const key = e.key;

    // Handle digits
    if (!isNaN(key)) {
        if (number1 && number2 && !hasOperator(displayBox.value)) {
            displayBox.value = "";
            number1 = null;
            number2 = null;
            displayBox.value += key;
        } else {
            displayBox.value += key;
        }
        e.preventDefault();
        return;
    }

    // Handle operators
    if (["+", "-", "*", "/", "%"].includes(key)) {
        if (displayBox.value.trim() === "" && key !== "-") {
            e.preventDefault();
            return;
        }

        if (displayBox.value === "-" && displayBox.value.length === 1) {
            e.preventDefault();
            return;
        }

        if (hasOperator(displayBox.value)) {
            if (setVariables(displayBox.value)) {
                displayBox.value = operate(oprt, number1, number2);
                displayBox.value += key === "*" ? "x" : key === "/" ? "÷" : key;
            } else {
                displayBox.value = displayBox.value.slice(0, -1);
                displayBox.value += key === "*" ? "x" : key === "/" ? "÷" : key;
            }
        } else {
            displayBox.value += key === "*" ? "x" : key === "/" ? "÷" : key;
        }

        e.preventDefault();
        return;
    }

    // Handle Enter (Equals)
    if (key === "Enter") {
        if (setVariables(displayBox.value)) {
            displayBox.value = operate(oprt, number1, number2);
        }
        e.preventDefault();
        return;
    }

    // Handle Backspace
    if (key === "Backspace") {
        displayBox.value = displayBox.value.slice(0, -1);
        e.preventDefault();
        return;
    }

    // Allow navigation keys
    if (["ArrowLeft", "ArrowRight", "Delete"].includes(key)) {
        return;
    }
});


buttons.forEach(button => {
    button.addEventListener("click", () => {
        const type = button.dataset.type;

        if(type === "digit"){
            if(number1 && number2 && !hasOperator(displayBox.value))
            {
                displayBox.value  = "";
                number1 = null;
                number2 = null;
                displayBox.value += button.textContent;
            }else{
                displayBox.value += button.textContent;
            }
        } else if(type === "op"){
            if(displayBox.value.trim() === "" && button.textContent != "-" || (displayBox.value === "-" && displayBox.value.length === 1)){
                e.preventDefault();
            } else if (hasOperator(displayBox.value)) {
                if(setVariables(displayBox.value))
                {
                    displayBox.value = operate(oprt, number1, number2);
                    displayBox.value += button.textContent;
                } else{
                    displayBox.value = displayBox.value.slice(0, -1);
                    displayBox.value += button.textContent;
                }

            }else{
                displayBox.value += button.textContent;
            }
        }else if(type === "clear") {
            displayBox.value  = "";
            number1 = null;
            number2 = null;
            oprt = null;
        } else if(type === "equals"){
            // Equal
            if(setVariables(displayBox.value))
            {
                displayBox.value = operate(oprt, number1, number2);
            }
        } else if(type === "delete"){
            displayBox.value = displayBox.value.slice(0, -1);
        }
    });
});

function setVariables(str){
    let finalStr = str;
    let isNegative = false;
    if(str.startsWith("-")){
        finalStr = finalStr.slice(1);
        isNegative = true;
    }
    const matchedOp = operations.find(op => finalStr.includes(op));
    let variables = finalStr.split(matchedOp);
    
    if(isNegative){
        number1 = parseInt("-" + variables[0]);
    }else{
        number1 = parseInt(variables[0]);
    }
    number2 = parseInt(variables[1]);
    oprt = matchedOp;

    if(number1 && number2 && oprt != null)
    {
        return true;
    }else{
        return false;
    }
}

function hasOperator(value) {
    if (value === "-") {
        return true; // Treat as "already has an operator"
      }
    
      // If there's a leading "-", remove it before checking for other operators
      if (value.startsWith("-")) {
        value = value.slice(1);
      }
    
      return operations.some(op => value.includes(op));
}

function operate(op, num1, num2){
    if (op === "÷") {
        op = "/";
    }

    switch(op){
        case "+":
            return add(num1, num2);

        case "-":
            return subtract(num1, num2);
        
        case "x":
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

