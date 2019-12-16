/*
import getCalcTemplate from "./getCalcTemplate";
import doHtmlBlock from "./doHtmlBlock";

export default function getHtmlReport(inputQuantities) {
    let htmlDoc = "<html lang='ru'><head><title>Расчёт</title><link href=\"../public/calc.css\" rel=\"stylesheet\" type=\"text/css\"><meta charset='utf-8'></head><body>!report!</body>" +

        "</html>";
    let report = "";

    getCalcTemplate(inputQuantities).forEach(function (item) {
        report += doHtmlBlock(item) + "\n";
    });

    htmlDoc = htmlDoc.slice(0, htmlDoc.indexOf("!report!")) + report + htmlDoc.slice(htmlDoc.indexOf("!report!") + 8, htmlDoc.length);

    return htmlDoc;
}

*/
