function eval() {
    // Do not use eval!!!
    return;
}

const getTopItem = (arr) => arr[arr.length-1];

const calculate = (operation, a, b) => {
    switch (operation) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        default: return;
    }
};

const expressionCalculator = (expr) => {
    if (Array.from(expr.matchAll(/\(/g)).length !== Array.from(expr.matchAll(/\)/g)).length) throw new Error('ExpressionError: Brackets must be paired');
    
    if (expr.includes("/ 0")) throw new Error("TypeError: Division by zero.");
    
    const priority = { '+': 1, '-': 1, '*': 2, '/': 2, '(': 0, ')': 0 };
    let numStack = [], operationStack = [];
    let exprArray = expr.trim().split(/\s+/g);
    if (!expr.includes(" ")) { exprArray = expr.split('') };
    for (let i=0; i < exprArray.length; i++) {
        if ( !isNaN( Number(exprArray[i]) ) ) {     
            numStack.push(Number(exprArray[i]));
            continue;
        }
        let currentOperation = exprArray[i];
        if ( operationStack.length == 0 || currentOperation == '(') {   
            operationStack.push(currentOperation);
            continue;
        }
        if ( priority[getTopItem(operationStack)] < priority[currentOperation] ) {  
            operationStack.push(currentOperation);
            continue;
        }
        while ( true ) {
            let topOperationStack = getTopItem(operationStack);
            if ( currentOperation == ')' && topOperationStack == '(' ) {
                operationStack.pop();
                break;
            }
            if ( topOperationStack == '(' ) {
                operationStack.push(currentOperation);
                break;
            }
            if ( priority[currentOperation] <= priority[topOperationStack] ) {
                let b = numStack.pop();
                let a = numStack.pop();
                numStack.push(calculate(operationStack.pop(), a, b));
            } else {
                operationStack.push(currentOperation);
                break;
            }
        }
    }
    for (let i=0; i<=operationStack.length; i++) {
        let b = numStack.pop();
        let a = numStack.pop();
        numStack.push(calculate(operationStack.pop(), a, b));
    }
    return numStack[0];
}

module.exports = {
    expressionCalculator
}
