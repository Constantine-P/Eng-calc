const {AlignmentType, Document, Paragraph, TextRun, UnderlineType, HeadingLevel} = require("docx");

module.exports = function jsonToDocx(str) {
    const arr = Array.from(str);
    const docChildren = [];

    arr.forEach(obj => {
        const children = [];

        if (obj.children) {
            obj.children.forEach(text => {
                const symbols = [{from: "&#x3D;", to: "="}, {from: "&lt;", to: "<"}, {from: "&gt;", to: ">"}];
                let content = text.content;

                symbols.forEach(sym => {
                    let idx = content.indexOf(sym.from);
                    while (idx !== -1) {
                        content = content.slice(0, idx) + sym.to + content.slice(idx + sym.from.length, content.length);
                        idx = content.indexOf(sym.from);
                    }
                });

                children.push(new TextRun({
                    text: content,
                    bold: (obj.tagName[0] === "h"),
                }));
            });

            const paragraph = new Paragraph({
                children,
                style: (obj.tagName === "p")
                    ? "basic"
                    : undefined,
                heading: (obj.tagName === "h5")
                    ? HeadingLevel.HEADING_1
                    : (obj.tagName === "h6")
                        ? HeadingLevel.HEADING_2
                        : undefined,
                alignment: (((obj.attributes.length && obj.attributes[0].value === "compare") || (obj.tagName === "h5"))
                        ? AlignmentType.CENTER
                        : AlignmentType.LEFT
                )
            });
            docChildren.push(paragraph);
        }
    });

    const doc = new Document({
        creator: "Constantin.P",
        title: "Report",
        description: "Report of calculation",
        styles: {
            paragraphStyles: [
                {
                    id: "Heading1",
                    name: "Heading 1",
                    basedOn: "Normal",
                    next: "Normal",
                    quickFormat: true,
                    run: {
                        size: 28,
                        bold: true,
                        italics: false,
                        color: "auto",
                        font: "Calibri",
                    },
                    paragraph: {
                        spacing: {
                            after: 120,
                        },
                    },
                },
                {
                    id: "Heading2",
                    name: "Heading 2",
                    basedOn: "Normal",
                    next: "Normal",
                    quickFormat: true,
                    run: {
                        size: 24,
                        bold: true,
                        font: "Calibri",
                        underline: {
                            type: UnderlineType.SINGLE,
                            color: "auto",
                        },
                    },
                    paragraph: {
                        spacing: {
                            before: 240,
                            after: 120,
                        },
                        indent: {
                            left: 720,
                        },
                    },
                },
                {
                    id: "basic",
                    name: "Basic",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        color: "auto",
                        italics: false,
                        font: "Calibri",
                    },
                    paragraph: {

                        spacing: {
                            line: 276,
                        },
                    },
                },
            ],
        },
    });

    doc.addSection({
        children: docChildren
    });

    return doc;
};