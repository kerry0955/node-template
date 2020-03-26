// 模板引擎得使用  ejs pug
const express = require('express')
const app = express()
const bodyParser = require("body-parser") //  中间件 前台发送请求得请求参数 进行处理 给到request 
// const ejs = require('ejs')
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs')
// 链接数据库 接下来就是处理数据了 美滋滋
app.get('/form', (req, res) => {
    // const name = req.params.name
    // console.dir(req.query)
    const data = { name: 'Alice', interst: ['code', 'cook', 'swimming'], id: 43 }
    res.render('demo', { data: data })
})

app.listen('3000', () => {
    console.dir('listen on port 3000')
})
