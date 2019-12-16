/*
const calc = require("../functions/calc");
const substituteValues = require("../functions/substituteValues");
const substituteValuesWithUnits = require("../functions/substituteValuesWithUnits");

class Comparison {
    constructor(comparison, inputQuantities, calculatedQuantities) {
        this.comparison = comparison;
        this.inputQuantities = inputQuantities;
        this.calculatedQuantities = calculatedQuantities;
    }

    get left() {
        return this.calcComparison(this.comparison, this.inputQuantities, this.calculatedQuantities).left;
    }

    get right() {
        return this.calcComparison(this.comparison, this.inputQuantities, this.calculatedQuantities).right;
    }

    get isTrue() {
        return this.calcComparison(this.comparison, this.inputQuantities, this.calculatedQuantities).isTrue;
    }

    get symbol() {
        return this.calcComparison(this.comparison, this.inputQuantities, this.calculatedQuantities).symbol;
    }

    get substituteValues() {
        return substituteValues(this.comparison, this.inputQuantities, this.calculatedQuantities);
    }
    
    get substituteValuesWithUnits() {
        return substituteValuesWithUnits(this.comparison, this.inputQuantities, this.calculatedQuantities);
    }
    
    get compare() {
        return this.calcComparison().left.valueWithSymbol + " " + this.calcComparison().symbol + " " + this.calcComparison().right.valueWithSymbol;
    }

    calcComparison(comparison = this.comparison, inputQuantities = this.inputQuantities, calculatedQuantities = this.calculatedQuantities) {
        const symbols = ["<", ">", "≤", "≥"];
        let [left, right, symbol] = [0, 0, 0];

        symbols.forEach(function (sym) {
            if (comparison.split(" ").includes(sym)) {
                symbol = sym;
                [left, right] = comparison.split(" " + symbol + " ");
            }
        });
        left  = calc(left,  "", "", inputQuantities, calculatedQuantities);
        right = calc(right, "", "", inputQuantities, calculatedQuantities);

        const isTrue = (left.value < right.value && symbol === "<")
            || (left.value > right.value && symbol === ">")
            || (left.value >= right.value && symbol === "≥")
            || (left.value <= right.value && symbol === "≤")
            || (left.value === right.value && symbol === "=");

        if (left.value < right.value) {
            symbol = "<";
        } else if (left.value > right.value) {
            symbol = ">";
        } else {
            symbol = "=";
        }

        return {left, right, isTrue, symbol};
    }
}

module.exports = Comparison;*/
