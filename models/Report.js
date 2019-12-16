class Unit {
    constructor(name, rusName, symbol, baseUnits) {
        this.name = name || "noname";
        this.rusName = rusName || "безимени";
        this.symbol = symbol || "";
        this.baseUnits = baseUnits || {"second": 0, "kilogram": 0, "meter": 0};
    }

    toString() {
        return this.name;
    }
}

class Type {
    constructor(name, unit) {
        this.name = name || "noname";
        this.unit = unit || new Unit();
    }
}

const baseUnits = {
    second: new Unit("second", "секунда", "с", {"second": 1, "kilogram": 0, "meter": 0}),
    kilogram: new Unit("kilogram", "килограмм", "кг", {"second": 0, "kilogram": 1, "meter": 0}),
    meter: new Unit("meter", "метр", "м", {"second": 0, "kilogram": 0, "meter": 1}),
};

const derivedUnits = {
    newton: new Unit("newton", "ньютон", "Н", {"second": -2, "kilogram": 1, "meter": 1}),
    pascal: new Unit("pascal", "паскаль", "Па", {"second": -2, "kilogram": 1, "meter": -1}),
    squareMeter: new Unit("squareMeter", "метр квадратный", "м2", {"second": 0, "kilogram": 0, "meter": 2}),
    cubicMeter: new Unit("cubicMeter", "метр кубический", "м3", {"second": 0, "kilogram": 0, "meter": 3}),
};

const baseTypes = {
    time: {
        name: "время",
        unit: baseUnits.second,
    },
    mass: {
        name: "масса",
        unit: baseUnits.kilogram,
    },
    length: {
        name: "длина",
        unit: baseUnits.meter,
    },
    none: {
        name: "noname",
        unit: new Unit(),
    },
};

const derivedTypes = {
    force: {
        name: "сила",
        unit: derivedUnits.newton,
    },
    square: {
        name: "площадь",
        unit: derivedUnits.squareMeter,
    },
    volume: {
        name: "объем",
        unit: derivedUnits.cubicMeter,
    },
    pressure: {
        name: "напряжение",
        unit: derivedUnits.pascal,
    },
};

class PhQuantity {
    constructor(name, type, value, symbol) {
        this.name = name;
        this.type = type;
        this.value = value;
        this.symbol = symbol;
    }

    static add(first, second) {
        if (!isEquivalent(first.type, second.type)) return new Error("Попытка сложить величины разной размерности");
        return new PhQuantity(first.name, first.type, first.value + second.value);
    }

    static subtract(first, second) {
        if (!isEquivalent(first.type, second.type)) return new Error("Попытка сложить величины разной размерности");
        return new PhQuantity(first.name, first.type, first.value - second.value);
    }

    static divide(first, second, name) {
        let nType = new Type(name);
        for (let key in baseUnits) {
            nType.unit.baseUnits[key] = first.type.unit.baseUnits[key] - second.type.unit.baseUnits[key];
        }

        if (this.normalizeType(nType)) nType = this.normalizeType(nType);

        return new PhQuantity("Производная величина", nType, (first.value || first) / (second.value || second));
    }

    static multiply(first, second) {
        let nType = new Type();
        for (let key in baseUnits) {
            nType.unit.baseUnits[key] = first.type.unit.baseUnits[key] + second.type.unit.baseUnits[key];
        }

        if (this.normalizeType(nType)) nType = this.normalizeType(nType);

        return new PhQuantity("Производная величина", nType, (first.value || first) * (second.value || second));
    }

    static pow(base, exponent) { // тип в степени поменять размерность
        let nType = new Type();
        for (let key in baseUnits) {
            nType.unit.baseUnits[key] = base.type.unit.baseUnits[key] * exponent.value;
        }
        return new PhQuantity(base.name, nType, Math.pow(base.value, exponent.value));
    }

    static normalizeType(nType) {
        for (let key in derivedTypes) {
            if (isEquivalent(nType.unit.baseUnits, derivedTypes[key].unit.baseUnits)) {
                return derivedTypes[key];
            }
        }
        return false;
    }

    get valueWithSymbol() {
        return Math.round(this.value * 1000) / 1000 + (this.type.unit.symbol ? (" " + this.type.unit.symbol) : "");
    }

    fullValue(postfix) {
        return this.symbol + " = " + Math.round(this.value * 1000) / 1000 + (this.type.unit.symbol ? (" " + this.type.unit.symbol) : "") + postfix;
    }
}

class CalculatedPhQuantity extends PhQuantity {
    constructor(name, formula, symbol, inputQuantities, calculatedQuantities) {
        super();
        this.name = name;
        this.symbol = symbol;
        this.formula = formula;
        this.value = Report.calc(formula, name, symbol, inputQuantities, calculatedQuantities).value;
        this.type = Report.calc(formula, name, symbol, inputQuantities, calculatedQuantities).type;
        this.substituteValues = Report.substituteValues(formula, inputQuantities, calculatedQuantities);
        this.substituteValuesWithSymbols = Report.substituteValuesWithUnits(formula, inputQuantities, calculatedQuantities);
        this.formulaWithCalc = formula + " = " + this.substituteValues + " = " + this.valueWithSymbol;
        this.formulaWithCalcSymbol = symbol + " = " + formula + " = " + this.substituteValuesWithSymbols + " = " + this.valueWithSymbol;
    }
}

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
        return Report.substituteValues(this.comparison, this.inputQuantities, this.calculatedQuantities);
    }

    get substituteValuesWithUnits() {
        return Report.substituteValuesWithUnits(this.comparison, this.inputQuantities, this.calculatedQuantities);
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
        left  = Report.calc(left,  "", "", inputQuantities, calculatedQuantities);
        right = Report.calc(right, "", "", inputQuantities, calculatedQuantities);

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

const inputQuantities = {
    N: new PhQuantity("Продольная сила", derivedTypes.force, 186326.35, "N"),
    A: new PhQuantity("Площадь сечения брутто", derivedTypes.square, 0.001, "A"),
    A_n: new PhQuantity("Площадь сечения нетто", derivedTypes.square, 0.001, "A_n"),
    i: new PhQuantity("Радиус инерции сечения", baseTypes.length, 0.03, "i"),
    l_ef: new PhQuantity("Расчетная условная длина элемента", baseTypes.length, 1.5, "l_ef"),
    R_y: new PhQuantity("Расчетное сопротивление", derivedTypes.pressure, 240262925, "R_y"),
    γ_c: new PhQuantity("Коэффициент условий работы", new Type(), 1, "γ_c"),
    E: new PhQuantity("Модуль упругости", derivedTypes.pressure, 205939650000, "E"),

    getLegend() {
        let text = "";
        for (let item in this) {
            if (this.hasOwnProperty(item) && this[item].symbol) {
                text += this[item].symbol + " - " + this[item].name + ", "
            }
        }
        return text;
    },
};

Object.defineProperty(inputQuantities, "getLegend", {
    enumerable: false
});

function isEquivalent(unit_1, unit_2) {
    return JSON.stringify(unit_1) === JSON.stringify(unit_2);
}

class Report {

    static calc(expression, name = "", symbol = "", inputQuantities, calculatedQuantities) {
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

    static getCalculatedQuantities(inputQuantities) {
        let calculatedQuantities = {
            getLegend() {
                let text = "";
                for (let item in this) {
                    if (this.hasOwnProperty(item) && this[item].symbol) {
                        text += this[item].symbol + " - " + this[item].name + ", "
                    }
                }
                return text;
            }
        };

        calculatedQuantities.formula_1 = new CalculatedPhQuantity("Напряжение", "N / A_n", "", inputQuantities, calculatedQuantities);
        calculatedQuantities.formula_2 = new CalculatedPhQuantity("Сопротивление", "R_y * γ_c", "", inputQuantities, calculatedQuantities);
        calculatedQuantities.λ = new CalculatedPhQuantity("Гибкость", "l_ef / i", "λ", inputQuantities, calculatedQuantities);
        calculatedQuantities.λ_ = new CalculatedPhQuantity("Условная гибкость", "λ * ( ( R_y / E ) ^ 0.5 )", "λ¯", inputQuantities, calculatedQuantities);
        calculatedQuantities.φ = new CalculatedPhQuantity("Коэффициент продольного изгиба", "1.47 - 13 * R_y / E - ( 0.371 - 27.3 * R_y / E ) * λ_ + ( 0.0275 - 5.53 * R_y / E ) * λ_ ^ 2", "φ", inputQuantities, calculatedQuantities);

        return  calculatedQuantities;
    }

    static getComparisons(inputQuantities) {
        const calculatedQuantities = this.getCalculatedQuantities(inputQuantities);
        return {
            formula_5: new Comparison("N / A_n ≤ R_y * γ_c", inputQuantities, calculatedQuantities),
            formula_7: new Comparison("N / ( φ * A ) ≤ R_y * γ_c", inputQuantities, calculatedQuantities),
        };
    }

    static substituteValues(expression, inputQuantities, calculatedQuantities) {
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

    static substituteValuesWithUnits(expression, inputQuantities, calculatedQuantities) {
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

    static getLegend(inputQuantities) {
        return inputQuantities.getLegend() + ", " + Report.getCalculatedQuantities(inputQuantities).getLegend();
    }

    static initialData(inputQuantities) {
        return Object.values(inputQuantities).map(item => item.fullValue(", "));
    }

    static isEquivalent(unit_1, unit_2) {
        return JSON.stringify(unit_1) === JSON.stringify(unit_2);
    }

}

module.exports = {Report, inputQuantities};