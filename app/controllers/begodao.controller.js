const TotalDeposited = require("../models/totaldeposited.model.js");
const TreasuryValue = require("../models/treasuryvalue.model.js");
const web3Config = require("../config/web3.config.js");
const Web3Util = require("../utils/web3.utils.js")
exports.getTotalDeposited = (req, res) => {
    TotalDeposited.check((err, data) => {
        if (data.cnt) {
            sendTotalDeposited(res);
        } else {
            Web3Util.getTotalDeposited().then((deposited) => {
                Web3Util.getTokenPrice(web3Config.begoAddress).then((price) => {
                    const newRec = new TotalDeposited({
                        amount: deposited * price
                    });
                    TotalDeposited.create(newRec, (err, data) => {
                        sendTotalDeposited(res);
                    });
                });
            })
        }
    });
};

function sendTotalDeposited(res) {
    TotalDeposited.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving totaldeposited."
            });
        else res.send(data);
    });
}

exports.getTreasuryValue = (req, res) => {
    TreasuryValue.check((err, data) => {
        if (data.cnt) {
            sendTresuryValue(res);
        } else {
            TreasuryValue.getTokens(async(err, tokens) => {
                let rec = { value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, value6: 0, value7: 0, value8: 0, value9: 0, value10: 0 };
                const values = await Web3Util.getTreasuryValue(tokens);
                for (let i = 0; i < values.length; i++) {
                    rec["value" + (i + 1)] = values[i];
                }
                const newRec = new TreasuryValue(rec);
                TreasuryValue.create(newRec, (err, data) => {
                    sendTresuryValue(res);
                });
            })
        }
    });
};

function sendTresuryValue(res) {
    TreasuryValue.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving treasuryvalues."
            });
        else res.send(data);
    });
}