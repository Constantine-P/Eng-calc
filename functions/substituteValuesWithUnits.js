/*
/!*export default *!/function substituteValuesWithUnits(expression, inputQuantities, calculatedQuantities) {
    let arr = expression.split(" ");
    for (let i = 0; i < arr.length; i++) {
        if (inputQuantities[arr[i]]) {
            arr[i] = Math.round(inputQuantities[arr[i]].value * 1000) / 1000 + " " + inputQuantities[arr[i]].type.unit.symbol;
        } else if (calculatedQuantities[arr[i]]) {
            arr[i] = Math.round(calculatedQuantities[arr[i]].value * 1000) / 1000 + " " + calculatedQuantities[arr[i]].type.unit.symbol;
        }
    }
    return arr.join(" ");
}

module.exports = substituteValuesWithUnits;
*/
