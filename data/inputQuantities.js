/*
const PhQuantity = require("../classes/PhQuantity");
const types = require("./types");
const baseTypes = types.baseTypes;
const derivedTypes = types.derivedTypes;
const Type = require("../classes/Type");

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

module.exports = inputQuantities;*/
