let number1, number2, oprt;

const displayBox = document.querySelector("#display-box");
const buttons = document.querySelectorAll(".buttons");
const btnClear = document.querySelector("#clear");
const allowedKeys = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "+", "-", "*", "/", "%",".", "(", ")", "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Enter"
  ];

const operations = ["+", "-", "*", "x", "/", "%", "÷"];

displayBox.addEventListener("keydown", function(e){

    if(!allowedKeys.includes(e.key)){
        e.preventDefault();
        return;
    }

    if (["+", "-", "*", "/", "%"].includes(e.key)) {
        if (hasOperator(displayBox.value)) {
        e.preventDefault();
        return;
        }
    }

    // e.preventDefault(); // always prevent default operator
    if (e.key === "/") {
        e.preventDefault();
      displayBox.value += "÷";
    } else if (e.key === "*") {
        e.preventDefault();
      displayBox.value += "x";
    } else if(["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Enter"].includes(e.key)){
    } 
    else {
        e.preventDefault();
      displayBox.value += e.key;
    }

    return;
});


buttons.forEach(button => {
    button.addEventListener("click", () => {
        const type = button.dataset.type;

        if(type === "digit"){
            displayBox.value += button.textContent;
        } else if(type === "op"){
            if (hasOperator(displayBox.value) || (displayBox.value.trim() === "" && button.textContent != "-")) {
                e.preventDefault();
            }else{
                displayBox.value += button.textContent;
            }
        }else if(type === "clear") {
            displayBox.value  = "";
        } else if(type === "equals"){
            // Equal
            setVariables(displayBox.value);
            displayBox.value = operate(oprt, number1, number2);
        } else if(type === "delete"){

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

