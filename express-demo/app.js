const express = require('express')
const bodyParser = require("body-parser") //  中间件 前台发送请求得请求参数 进行处理 给到request 
const multer = require("multer")
const path = require('path')

const app = express()
const port = 3000
// 通过这个插件 post方法才能 获取到传过来得参数 it,s important 
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// 上传文件 
var fs = require('fs')   // 读取文件 

var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};
var uploadFolder = path.join(__dirname, './upload/');
createFolder(uploadFolder);

// 通过 filename 属性定制
// multer 提供了 storage 这个参数来对资源保存的路径、文件名进行个性化设置。
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, file.originalname);
    }
});

// 通过 storage 选项来对 上传行为 进行定制化
var uploadFile = multer({ storage: storage })
// 单图上传
// 多图上传: https://www.cnblogs.com/chyingp/p/express-multer-file-upload.html
app.post('/upload', uploadFile.single('logo'), function (req, res) {
    var fileMsg = req.file;
    console.dir(fileMsg)
    res.send({
        status: 200,
        msg: '单图上传成功'
    })
})
app.get('/form', urlencodedParser, function (req, res) {
    // 通过fs 读取Html 发送给页面 不需要fs 也行
    // var form = fs.readFileSync('./client/form.html', { encoding: 'utf8' });
    // res.send(form);
    // var person 
    res.sendFile(__dirname + '/client/form.html')
})



// 测试路由得基本使用
app.get('/api?abc', (req, res) => {
    res.send({
        msg: '路由参数得',
        data: "api?abc"
    })
})

app.get('/user', (req, res) => {
    res.send({
        msg: '接受请求成功',
        data: "user"
    })
})
// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
    res.send('welcome, ' + req.body.username)
})

app.post('/user', jsonParser, function (req, res) {
    console.dir(req.body)
    res.send('请求成功  suceess on [port] at /user')
})
app.listen(port, () => {
    console.log(`正在监听端口号${port}`)
})

