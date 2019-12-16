const {Router} = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.status(200);
    res.render("calculations", {
        title: "Список расчетов",
        isCalculations: true,
    });
});

module.exports = router;