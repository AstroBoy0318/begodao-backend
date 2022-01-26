const sql = require("./db.js");

// constructor
const TreasuryValue = function(rec) {
    this.value1 = rec.value1;
    this.value2 = rec.value2;
    this.value3 = rec.value3;
    this.value4 = rec.value4;
    this.value5 = rec.value5;
    this.value6 = rec.value6;
    this.value7 = rec.value7;
    this.value8 = rec.value8;
    this.value9 = rec.value9;
    this.value10 = rec.value10;
    this.gtime = (new Date().getTime()) / 1000;
};

TreasuryValue.check = (result) => {
    sql.query(`SELECT count(id) as cnt FROM treasuryvalue WHERE FROM_UNIXTIME(gtime,'%Y-%m-%d')=FROM_UNIXTIME(UNIX_TIMESTAMP(),'%Y-%m-%d')`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found treasuryvalue: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

TreasuryValue.create = (newRec, result) => {
    sql.query("INSERT INTO treasuryvalue SET ?", newRec, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created TreasuryValue: ", { id: res.insertId, ...newRec });
        result(null, { id: res.insertId, ...newRec });
    });
};

TreasuryValue.getAll = (result) => {
    let query = "SELECT treasuryvalue.*, (value1+value2+value3+value4+value5+value6+value7+value8+value9+value10) as totalvalue, (gtime-86400) as `timestamp` FROM treasuryvalue order by id desc";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("TreasuryValue: ", res);
        result(null, res);
    });
};

TreasuryValue.getTokens = (result) => {
    let query = "SELECT * FROM tokens";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Tokens: ", res);
        result(null, res);
    });
};

module.exports = TreasuryValue;