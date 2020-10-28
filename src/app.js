const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');

// define correct path
const viewPath = path.join(__dirname, '../views');
const dir = path.join(__dirname, '../public');

// static public directory set
app.use(express.static(dir));

// views define
app.set('view engine','hbs')
app.set('views',viewPath)

app.get('/', (req, res) => {
    res.render('index',)
})
app.get('/start', (req, res) => {
    res.render('quiz',)
})
app.get('/score', (req, res) => {
    res.render('score',)
})
app.get('/end', (req, res) => {
    res.render('end')
})

app.listen(9000, () => {
    console.log('Server has been start on port : 9000')
})