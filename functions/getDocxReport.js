import getCalcTemplate from "./getCalcTemplate";
import {inputQuantities} from "../data/inputQuantities";
import {AlignmentType, Document, Packer, Paragraph, TextRun, UnderlineType} from "docx";

function getDocXReport() {
    const textDocX = getCalcTemplate(inputQuantities).map(function (item) {
        let par = {
            [(item.tag[0] === 'h') ? "heading" : "style"]: item.class,
            children: [],
        };
        item.children.forEach(function (item) {
            if (item instanceof Array) {
                par.children.push(new TextRun(item[0]));
                par.children.push(new TextRun({text: item[1] + " ", subScript: true}));
            } else {
                par.children.push(new TextRun(item));
            }
        });

        return new Paragraph(par);
    });

    const doc = new Document({
        creator: "Constantin.P",
        title: "Calculation",
        description: "Calculation",
        styles: {
            paragraphStyles: [
                {
                    id: "calc-header",
                    name: "calc-header",
                    basedOn: "Normal",
                    next: "Normal",
                    quickFormat: true,
                    run: {
                        font: "Calibri",
                        size: 28,
                        bold: true,
                        italics: false,
                        color: "auto",
                    },
                    paragraph: {
                        spacing: {
                            after: 160,
                        },
                        alignment: AlignmentType.CENTER,
                    },
                },
                {
                    id: "par-header",
                    name: "par-header",
                    basedOn: "Normal",
                    next: "Normal",
                    quickFormat: true,
                    run: {
                        font: "Calibri",
                        size: 22,
                        bold: true,
                        underline: {
                            type: UnderlineType.SINGLE,
                            color: "auto",
                        },
                    },
                    paragraph: {
                        spacing: {
                            before: 240,
                            after: 160,
                        },
                    },
                },
                {
                    id: "paragraph",
                    name: "paragraph",
                    basedOn: "Normal",
                    next: "Normal",
                    quickFormat: true,
                    run: {
                        font: "Calibri",
                        size: 20,
                        bold: false,
                        italics: false,
                        color: "auto",
                    },
                    paragraph: {
                        spacing: {
                            //before: 240,
                            after: 160,
                        },

                        alignment: AlignmentType.LEFT,
                    },
                },
                {
                    id: "paragraph-center",
                    name: "paragraph-center",
                    basedOn: "Normal",
                    next: "Normal",
                    quickFormat: true,
                    run: {
                        font: "Calibri",
                        size: 20,
                        bold: false,
                        italics: false,
                        color: "auto",
                    },
                    paragraph: {
                        spacing: {
                            //before: 240,
                            after: 160,
                        },
                        alignment: AlignmentType.CENTER,
                    },
                },
            ],
        },
    });

    doc.addSection({
        children: textDocX,
    });

    // const writeDoc = () => {
    //     Packer.toBuffer(doc).then((buffer) => {
    //         fs.writeFileSync("results/calc.docx", buffer);
    //     });
    // };

    return doc;
}
