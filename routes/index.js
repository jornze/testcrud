var express = require('express');
var router = express.Router();
//引入数据库包
var db = require("./db.js");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('ddd');
});
//person数据接口 供前台调用



var result={
    "status":'200',
    "message":'success',
}
 
router.get('/123', function (req, res, next) {
	db.query('select * from person', function (err, rows) {
        if (err){
        	 throw err;
        	}else{
        		 result.data=rows; 
        		
   				res.json(result)
        	}
              
        
    })
   
   
});
module.exports = router;
