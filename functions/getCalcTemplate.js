/*
const getCalculatedQuantities = require("./getCalculatedQuantities");
const getComparisons = require("./getComparisons");

// import getCalculatedQuantities from "./getCalculatedQuantities";
// import getComparisons from "./getComparisons";

/!*export default*!/ function getCalcTemplate(inputQuantities) {
    const calculatedQuantities = getCalculatedQuantities(inputQuantities);
    const comparisons = getComparisons(inputQuantities);

    const calcTemplate = [
        {
            tag: "h1", class: "calc-header",
            text: "Проверка стального центрально-сжатого элемента",
        },
        {
            tag: "h2", class: "par-header",
            text: "Допущения и предпосылки.",
        },
        {
            tag: "p", class: "paragraph",
            text: "Методика расчета принята согласно СНиП II-23-81*. Расчет выполнен для случая сплошностенчатых элементов не П-образного сечения при отсутствии планок. Предполагается, что R_u / γ_u > R_y",
        },
        {
            tag: "h2", class: "par-header",
            text: "Условные обозначения.",
        },
        {
            tag: "p", class: "paragraph",
            text: inputQuantities.getLegend(),
        },
        {
            tag: "p", class: "paragraph",
            text: calculatedQuantities.getLegend(),
        },
        {
            tag: "h2", class: "par-header",
            text: "Исходные данные.",
        },
        ...Object.values(inputQuantities).map((item) => {
            return {
                tag: "p", class: "paragraph",
                text: item.fullValue(", "),
            }
        }),
        {
            tag: "h2", class: "par-header",
            text: "Расчет.",
        },
        {
            tag: "p", class: "paragraph",
            text: "1. Проверка прочности по формуле (5):",
        },
        {
            tag: "p", class: "paragraph-center",
            text: comparisons.formula_5.comparison,
        },
        {
            tag: "p", class: "paragraph-center",
            text: comparisons.formula_5.substituteValuesWithUnits,
        },
        {
            tag: "p", class: "paragraph-center",
            text: comparisons.formula_5.compare,
        },
        {
            tag: "p", class: "paragraph",
            text: (comparisons.formula_5.isTrue ? "Прочность обеспечена." : "Прочность НЕ обеспечена."),
        },
        {
            tag: "p", class: "paragraph",
            text: "2. Определение гибкости.",
        },
        {
            tag: "p", class: "paragraph-center",
            text: calculatedQuantities.λ.formulaWithCalcSymbol + ",",
        },
        {
            tag: "p", class: "paragraph-center",
            text: calculatedQuantities.λ_.formulaWithCalcSymbol,
        },
        {
            tag: "p", class: "paragraph",
            text: "3. Поскольку 2.5 < λ¯ ≤ 4.5, то φ определяется по формуле (9)",
        },
        {
            tag: "p", class: "paragraph-center",
            text: calculatedQuantities.φ.formulaWithCalcSymbol,
        },
        {
            tag: "p", class: "paragraph",
            text: "4. Проверка устойчивости по формуле (7)",
        },
        {
            tag: "p", class: "paragraph-center",
            text: comparisons.formula_7.comparison,
        },
        {
            tag: "p", class: "paragraph-center",
            text: comparisons.formula_7.substituteValuesWithUnits,
        },
        {
            tag: "p", class: "paragraph-center",
            text: comparisons.formula_7.compare,
        },
        {
            tag: "p", class: "paragraph",
            text: (comparisons.formula_7.isTrue ? "Устойчивость обеспечена." : "Устойчивость НЕ обеспечена."),
        },

    ];

    for (let i = 0; i < calcTemplate.length; i++) {
        calcTemplate[i].children = calcTemplate[i].text.split(" ");

        for (let j = 0; j < calcTemplate[i].children.length; j++) {
            const temp = (calcTemplate[i].children[j]).split("_");
            if (temp.length > 1) {
                calcTemplate[i].children.splice(j, 1, [temp[0], temp[1] + " "]);
                j += 1;
            } else {
                calcTemplate[i].children[j] += " ";
            }
        }
    }

    return calcTemplate;
}

module.exports = getCalcTemplate;*/
