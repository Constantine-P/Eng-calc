/*
/!*export default *!/function substituteValues(expression, inputQuantities, calculatedQuantities) {
    let arr = expression.split(" ");
    for (let i = 0; i < arr.length; i++) {
        if (inputQuantities[arr[i]]) {
            arr[i] = Math.round(inputQuantities[arr[i]].value * 1000) / 1000;
        } else if (calculatedQuantities[arr[i]]) {
            arr[i] = Math.round(calculatedQuantities[arr[i]].value * 1000) / 1000;
        }
    }
    return arr.join(" ");
}

module.exports = substituteValues;
*/
