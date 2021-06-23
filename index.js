const express = require('express')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const app =express();

const route = require('./route/main')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use('/',route)
app.listen({port : 5001} , () => {console.log(`running on port ${5001}`)})
