var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var db = require('../public/javascripts/db.js');
var pool = mysql.createPool(db);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    // next();
  // console.log(req, res, next)
    var sql = 'SELECT * FROM user';
    pool.getConnection((err, conn) => {
        let q = conn.query(sql, (err, rows) => {
            conn.release();
            res.json(rows);
        })
    });
    // let obj = {
    //   name: '杨家成'
    // };
    // res.json(obj);
});

router.post('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    // next();
    console.log(req.body)

    var sql = 'INSERT INTO user(name, age, gender, address) VALUES(?, ?, ?, ?)';
    var data = [req.body.name, req.body.age, req.body.gender, req.body.address];
    pool.getConnection((err, conn) => {
        let q = conn.query(sql, data, (err, rows) => {
            conn.release();
            res.json(rows);
        })
    })

    // res.json(req.body);
});

module.exports = router;
