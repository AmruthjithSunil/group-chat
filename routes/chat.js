const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res, next) => {
    let messages = '';
    fs.readFile('./messages.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        messages += data;
        console.log('messages:-\n' + messages);
        res.send(messages + '<form onsubmit="document.getElementById(`username`).value=localStorage.getItem(`username`)" action="/chat" method="POST"><input type="text" name="message"><input type="hidden" id="username" name="username"><button type="submit">send</button><form>');
    });
})

router.post('/', (req, res, next) => {
    fs.writeFile('./messages.txt', `${req.body.username}: ${req.body.message}<br>`, { flag: 'a' }, err => {
        if (err) {
            console.error(err);
        }
    });
    res.redirect('/chat');
})

module.exports = router;