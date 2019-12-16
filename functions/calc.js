/*
const PhQuantity = require("../classes/PhQuantity");
const baseTypes = require("../data/types").baseTypes;

function calc(expression, name = "", symbol = "", inputQuantities, calculatedQuantities) {
    let arr = expression.split(' ');

    for (let i = 0; i < arr.length; i++) {
        if (Number.isFinite(+arr[i])) {
            arr[i] = new PhQuantity("noname", baseTypes.none, +arr[i], "");
        }
    }

    let mass = [];
    let curr = mass;
    let tree = [curr];

    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];

        if (item === '(') {
            curr.push([]);
            curr = curr[curr.length - 1];
            tree.push(curr);
        }

        if (item === ')') {
            curr = tree[tree.length - 2];
            tree.pop();
        }

        if (item !== ')' && item !== '(') curr.push(item);
    }

    while (mass.length === 1 && typeof mass[0] === 'object') mass = mass[0];

    while (mass.length > 1) {
        curr = calcDeepestElem(mass);

        for (let i = 0; i < curr.length; i++) {
            if (curr[i].length === 1 && (curr[i] instanceof Array)) {
                curr[i] = curr[i][0];
            }
        }

        for (let i = 0; i < curr.length; i++) {
            if (curr[i] === '^') {
                curr = operate(curr, curr[i]);
                i = -1;
            }
        }

        for (let i = 0; i < curr.length; i++) {
            if (curr[i] === '*' || curr[i] === '/') {
                curr = operate(curr, curr[i]);
                i = -1;
            }
        }

        for (let i = 0; i < curr.length; i++) {
            if (curr[i] === '+' || curr[i] === '-') {
                curr = operate(curr, curr[i]);
                i = -1;
            }
        }

    }

    const result = mass[0];
    result.name = name;
    result.symbol = symbol;

    return result;

    function operate(arr, operator) {
        let result = 0;
        let pos = arr.indexOf(operator);
        let first = arr[pos - 1];
        let second = arr[pos + 1];

        if (pos === -1) return arr;

        switch (operator) {
            case '*':
                result = PhQuantity.multiply(inputQuantities[first] || calculatedQuantities[first] || first, inputQuantities[second] || calculatedQuantities[second] || second);
                break;

            case '/':
                result = PhQuantity.divide(inputQuantities[first] || calculatedQuantities[first] || first, inputQuantities[second] || calculatedQuantities[second] || second);
                break;

            case '+':
                result = PhQuantity.add(inputQuantities[first] || calculatedQuantities[first] || first, inputQuantities[second] || calculatedQuantities[second] || second);
                break;

            case '-':
                result = PhQuantity.subtract(inputQuantities[first] || calculatedQuantities[first] || first, inputQuantities[second] || calculatedQuantities[second] || second);
                break;

            case '^':
                result = PhQuantity.pow(inputQuantities[first] || calculatedQuantities[first] || first, inputQuantities[second] || calculatedQuantities[second] || second);
                break;
        }

        arr.splice(pos - 1, 3, result);

        arr = operate(arr, operator);

        return arr;
    }

    function calcDeepestElem(mass) {
        let curr = mass;
        while (curr instanceof Array) {
            for (let i = 0; i < curr.length; i++) {
                if ((curr[i] instanceof Array) && (curr[i].length > 1 || (curr[i][0] instanceof Array))) {
                    curr = curr[i];
                    i = -1;
                } else if (i === curr.length - 1) {
                    return curr;
                }
            }
        }

        return curr;
    }

}

module.exports = calc;

*/
