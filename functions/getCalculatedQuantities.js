/*
const CalculatedPhQuantity = require("../classes/CalculatedPhQuantity");

function getCalculatedQuantities(inputQuantities) {
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

module.exports = getCalculatedQuantities;*/
