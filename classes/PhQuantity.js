/*
const derivedTypes = require("../data/types").derivedTypes;
const Type = require("./Type");
const isEquivalent = require("../functions/isEquivalent");
const units = require("../data/units");
const baseUnits = units.baseUnits;

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

module.exports = PhQuantity;
*/
