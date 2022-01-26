const sql = require("./db.js");

// constructor
const TotalDeposited = function(rec) {
    this.amount = rec.amount;
};

TotalDeposited.check = (result) => {
    sql.query(`SELECT count(id) as cnt FROM totaldeposited WHERE FROM_UNIXTIME(gtime,'%Y-%m-%d')=FROM_UNIXTIME(UNIX_TIMESTAMP(),'%Y-%m-%d')`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found tutorial: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

TotalDeposited.create = (newRec, result) => {
    sql.query("INSERT INTO totaldeposited (amount, gtime) values (?, UNIX_TIMESTAMP())", newRec.amount, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created TotalDeposited: ", { id: res.insertId, ...newRec });
        result(null, { id: res.insertId, ...newRec });
    });
};

TotalDeposited.getAll = (result) => {
    let query = "SELECT amount, (gtime-86400) as `timestamp` FROM totaldeposited order by id desc";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("TotalDeposited: ", res);
        result(null, res);
    });
};

module.exports = TotalDeposited;