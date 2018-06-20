var fs = require("fs");
var express = require('express');
var router = express.Router();
//引入数据库包
var db = require("./db.js");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('ddd');
});
router.get('/upload', function(req, res, next) {
  res.render('upload');
});
var multer = require('multer');
var upload=multer({
  dest:'./public/images'
});


/*router.post('/upload', upload.array('imageFile', 5), function(req, res, next) {
    // req.files 是 前端表单name=="imageFile" 的多个文件信息（数组）,限制数量5，应该打印看一下
    for (var i = 0; i < req.files.length; i++) {
        // 图片会放在uploads目录并且没有后缀，需要自己转存，用到fs模块
        // 对临时文件转存，fs.rename(oldPath, newPath,callback);
        fs.rename(req.files[i].path, "upload/" + req.files[i].originalname, function(err) {
            if (err) {
                throw err;
            }
            console.log('done!');
        })
    }

    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*"//允许跨域。。。
    });
      // req.body 将具有文本域数据, 如果存在的话
    res.end(JSON.stringify(req.files)+JSON.stringify(req.body));
})*/

// 单域单文件上传：input[file]的 multiple != "multiple"
router.post('/upload', upload.single('imageFile'), function(req, res, next) {
    // req.file 是 前端表单name=="imageFile" 的文件信息（不是数组）
    
    fs.rename(req.file.path, "./public/images/" + req.file.originalname, function(err) {
        if (err) {
            throw err;
        }
        console.log('上传成功!');
    })
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*"
    });
    res.end(JSON.stringify(req.file)+JSON.stringify(req.body));
})







//person数据接口 供前台调用

var result={
    "status":'200',
    "message":'success',
}
 
router.get('/123', function (req, res, next) {
	db.query('select * from book', function (err, rows) {
        if (err){
        	 throw err;
        	}else{
        		 result.data=rows; 
        		
   				res.json(result)
        	}
              
        
    })
   
   
});
module.exports = router;
