module.exports = app => {
    const begodao = require("../controllers/begodao.controller.js");

    var router = require("express").Router();
    router.get("/getTotalDeposited", begodao.getTotalDeposited);
    router.get("/getTreasuryValue", begodao.getTreasuryValue);

    app.use('/', router);
};