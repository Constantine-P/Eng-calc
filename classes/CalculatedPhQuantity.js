/*
const calc = require("../functions/calc");
const substituteValues = require("../functions/substituteValues");
const PhQuantity = require("./PhQuantity");
const substituteValuesWithUnits = require("../functions/substituteValuesWithUnits");
const Report = require("../models/report-2");


class CalculatedPhQuantity extends PhQuantity {
    constructor(name, formula, symbol, inputQuantities, calculatedQuantities) {
        super();
        this.name = name;
        this.symbol = symbol;
        this.formula = formula;
        this.value = Report.calc(formula, name, symbol, inputQuantities, calculatedQuantities).value;
        this.type = calc(formula, name, symbol, inputQuantities, calculatedQuantities).type;
        this.substituteValues = substituteValues(formula, inputQuantities, calculatedQuantities);
        this.substituteValuesWithSymbols = substituteValuesWithUnits(formula, inputQuantities, calculatedQuantities);
        this.formulaWithCalc = formula + " = " + this.substituteValues + " = " + this.valueWithSymbol;
        this.formulaWithCalcSymbol = symbol + " = " + formula + " = " + this.substituteValuesWithSymbols + " = " + this.valueWithSymbol;
    }
}

module.exports = CalculatedPhQuantity;
*/
