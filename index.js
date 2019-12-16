const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");


const homeRoutes = require("./routes/home");
const calculationsRoutes = require("./routes/calculations");
const steel01Routes = require("./routes/calculations/steel-01");

const app  = express();

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}));

app.use("/", homeRoutes);
app.use("/calculations", calculationsRoutes);
app.use("/steel-01", steel01Routes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});