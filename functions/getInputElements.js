/*
export default function getInputElements(inputQuantities) {
    let htmlDoc =
        `<html lang='ru'>
            <head>
                <title>Расчёт</title>
                <link href=\"../public/calc.css\" rel=\"stylesheet\" type=\"text/css\">
                <meta charset='utf-8'>
            </head>
            <body style='display: grid'>
                <form name='form' id="formElem">
                    !report!
                    <input id='butt' type='submit' value="button">
                </form>
  <!--form-- id="formElem">
    <input type="text" name="name" value="John">
    <input type="text" name="surname" value="Smith">
    <input type="submit">
  </form-->
  <script>
  const formElem = document.getElementById("formElem");
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('NAVUHODONOSR', {
      method: 'POST',
      body: new FormData(formElem),
      
    });

    let result = await response.json();

    alert(result.message);
  };
</script>
                
                
                <!--script>
                    const form = document.getElementById("form");
                    const butt = document.getElementById("butt");
                    butt.addEventListener("click", async function () {
                        e.preventDefault();
                        let response = await fetch("", { method: "POST", body: new FormData(form) });
                        let result = await response.json();
                    });
                    }
                </script-->
            </body>
            


        </html>`;

    let report = "";

    for (let item in inputQuantities) {
        report +=
            `<label style="display: flex; justify-content:space-between; margin: 10px; width: 600px; ">
                <em style="width: 400px">${inputQuantities[item].symbol} - ${inputQuantities[item].name}</em>
                <input type=\"text\" value=${inputQuantities[item].value} name=${inputQuantities[item].name}>
                ${inputQuantities[item].type.unit.symbol}
            </label>`;
    }
    htmlDoc = htmlDoc.slice(0, htmlDoc.indexOf("!report!")) + report + htmlDoc.slice(htmlDoc.indexOf("!report!") + 8, htmlDoc.length);

    return htmlDoc;
}*/
