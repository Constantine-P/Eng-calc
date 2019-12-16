const $report = document.querySelector(".report");
const $reportForm = document.querySelector("#report-form");
const $btnSave = document.querySelector("#save");

if ($btnSave) {
    $btnSave.addEventListener("click", saveHandler);
}

/*function saveHandler(event) {
    event.preventDefault();
    const obj = {};
    Array.from($reportForm.querySelectorAll("input")).forEach(item => {
        obj[item.name] = item.value;
    });
    fetch(
        "/steel-01/save",
        {
            method: "get",
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            //body: JSON.stringify(obj)
        })
        .then(data => data)
        .then(data => {
            console.log(data);
            const $content = document.querySelector("#content");
            //.const text = JSON.stringify(data);
            const text = data;
            $content.innerHTML = text;
            const a = document.createElement("a");
            a.setAttribute("href", "data:'application/json; charset=utf-8'," + $content.innerHTML);
            a.setAttribute("download", "report.docx");
            a.click();

        });
}*/

if ($reportForm) {
    submitHandler(new Event("click"));
    $reportForm.addEventListener("submit", submitHandler);
}

function submitHandler(event) {
    event.preventDefault();
    const obj = {};
    Array.from($reportForm.querySelectorAll("input")).forEach(item => {
        obj[item.name] = item.value;
    });
    fetch(
        "/steel-01/recalculate",
        {
            method: "post",
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify(obj)
        })
        .then(data => data.json())
        .then(data => {
            $report.innerHTML = data
        });
}


async function saveHandler(event) {
    event.preventDefault();
    try {
        const response = await fetch("/steel-01/save");

        if (response.status === 200) {
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `report.docx`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            return true;
        }
    } catch (error) {
    }

    return false;
}

