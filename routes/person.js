var express = require('express');
var router = express.Router();
//引入数据库包
var db = require("./db.js");

/* GET  listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/**
 * 查询列表页
 */
router.get('/', function (req, res, next) {
    db.query('select * from book', function (err, rows) {
        console.log(rows);
        if (err) {
            res.render('persons', {title: '人员管理', datas: []});  // this renders "views/persons.html"
        } else {

            res.render('persons', {title: '人员管理', datas: rows});

        }
    })
});


/**
 * 新增页面跳转
 */

router.get('/add', function (req, res) {
    res.render('add');
});
router.post('/add', function (req, res) {
    var type = req.body.type;
    var name = req.body.name;
    var unitPrice = req.body.unitPrice;
    var dafaultnm = req.body.dafaultnm;
    var allnm = req.body.allnm;
    var img = req.body.img;
    var title = req.body.title;
    var det = req.body.det;
    db.query("insert into book(type,name,unitPrice,dafaultnm,allnm,img,title,det) values('" + type + "','" + name + "','" + unitPrice + "','" + dafaultnm + "','" + allnm + "','" + img + "'," + title + ",'" + det + "')", function (err, rows) {
        if (err) {
            res.end('新增失败：' + err);
        } else {
            res.redirect('/persons');
        }
    })
});

/**
 * 删
 */
router.get('/del/:id', function (req, res) {
    var id = req.params.id;
    db.query("delete from book where id=" + id, function (err, rows) {
        if (err) {
            res.end('删除失败：' + err)
        } else {
            res.redirect('/persons')
        }
    });
});
/**
 * 修改
 */
router.get('/toUpdate/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.query("select * from book where id=" + id, function (err, rows) {
        if (err) {
            res.end('修改页面跳转失败：' + err);
        } else {
            res.render("update", {datas: rows});       //直接跳转
        }
    });
});
router.post('/persons/update', function (req, res) {
     var type = req.body.type;
    var name = req.body.name;
    var unitPrice = req.body.unitPrice;
    var dafaultnm = req.body.dafaultnm;
    var allnm = req.body.allnm;
    var img = req.body.img;
    var title = req.body.title;
    var det = req.body.det;
    db.query("update book set  type='" + type + "', name='" + name + "', unitPrice='" + unitPrice + "', dafaultnm='" + dafaultnm + "',allnm='" + allnm + "',img='" + img + "',title= '" + title + "', det='" + det + "'where id=" + id, function (err, rows) {
        if (err) {
            //res.end('修改失败：' + err);
            console.log(err);
        } else {
            res.redirect('/persons');
        }
    });
});
/**
 * 查询
 */
router.post('/search', function (req, res) {
    var type = req.body.s_type;
    var name = req.body.s_name;
    var allnm = req.body.s_allnm;
    var title = req.body.s_title;
    var det = req.body.s_det;

    var sql = "select * from book";

    if (type) {
        sql += " and type like '%" + type + "%' ";
    }
     if (name) {
        sql += " and name like '%" + name + "%' ";
    }
    if (title) {

       sql += " and title like '%" + title + "%' ";
    }
    if (allnm) {
        sql += " and allnm like '%" + allnm + "%' ";
    }
    sql = sql.replace("and","where");
    db.query(sql, function (err, rows) {
        if (err) {
            res.end("查询失败：", err)
        } else {
            res.render("persons", {title: '人员管理', datas: rows, s_name: name, s_type: type,s_title: title,s_allnm: allnm});
        }
    });
});


module.exports = router;