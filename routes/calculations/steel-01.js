const {Router} = require("express");
const router = Router();
const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const jsonToDocx = require("../../models/json-to-docx");
const docx = require("docx");
const {Packer} = docx;
const parseToJson = require('himalaya').parse;
const {Report} = require("../../models/Report");
const {inputQuantities} = require("../../models/Report");

let legend = Report.getLegend(inputQuantities);
let initialData = Report.initialData(inputQuantities);
let calculatedQuantities = Report.getCalculatedQuantities(inputQuantities);
let comparisons = Report.getComparisons(inputQuantities);

router.get("", (req, res) => {
    res.render("calculations/steel/steel-01", {
        title: "Проверка прочности стального центрально-сжатого сечения",
        inputQuantities, calculatedQuantities, comparisons, legend, initialData
    });
});

router.post("/recalculate", jsonParser, async (req, res) => {
    await Object.keys(inputQuantities).forEach(param => {
        inputQuantities[param].value = +req.body[param];
    });

    legend = Report.getLegend(inputQuantities);
    initialData = Report.initialData(inputQuantities);
    calculatedQuantities = Report.getCalculatedQuantities(inputQuantities);
    comparisons = Report.getComparisons(inputQuantities);

    fs.readFile(path.join(__dirname, "..", "..", "views", "calculations", "steel", "steel-01-report.hbs"), "utf8",
        (error, data) => {
            const params = {
                title: "Проверка прочности стального центрально-сжатого сечения",
                inputQuantities, calculatedQuantities, comparisons, legend, initialData
            };
            const template = Handlebars.compile(data)(params);
            res.end(JSON.stringify(template));
        });
});

router.get("/save", jsonParser, async (req, res) => {
    const reportPath = path.join(__dirname, "..", "..", "report", "report.docx");
    const templatePath = path.join(__dirname, "..", "..", "views", "calculations", "steel", "steel-01-report.hbs");

    fs.readFile(templatePath, "utf8",
        async (error, data) => {
            const params = {
                title: "Проверка прочности стального центрально-сжатого сечения",
                inputQuantities, calculatedQuantities, comparisons, legend, initialData
            };
            const template = await Handlebars.compile(data)(params);
            const json = await parseToJson(template);
            const doc = jsonToDocx(json);

            Packer.toBuffer(doc).then((buffer) => {
                fs.writeFileSync(reportPath, buffer);
            }).then(() => {
                fs.readFile(reportPath, function (error, data) {
                    if (error) {
                        res.statusCode = 404;
                        res.end("Resourse not found!");
                    } else {
                        res.end(data);
                    }
                });
            });
        });
});


module.exports = router;