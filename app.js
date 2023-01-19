const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

//document.getElementById(`username`).value
//localStorage.setItem(`username`, `amruth`)
app.get('/login', (req, res, next) => {
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/login" method="POST"><input type="text" id="username" name="username"><button type="submit">login</button><form>');
})

app.post('/login', (req, res, next) => {
    res.redirect('/');
})

app.get('/', (req, res, next) => {
    let messages = '';
    fs.readFile('./messages.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        messages += data;
        console.log('messages:-\n' + messages);
        res.send(messages + '<form onsubmit="document.getElementById(`username`).value=localStorage.getItem(`username`)" action="/" method="POST"><input type="text" name="message"><input type="hidden" id="username" name="username"><button type="submit">send</button><form>');
    });
})

app.post('/', (req, res, next) => {
    fs.writeFile('messages.txt', ` ${req.body.username}: ${req.body.message}`, { flag: 'a' }, err => {
        if (err) {
            console.error(err);
        }
    });
    res.redirect('/');
})

app.listen(3000);