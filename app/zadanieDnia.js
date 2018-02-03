const express = require('express');
const srv = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

srv.use(cookieParser());
srv.use(bodyParser.urlencoded({ extended: false }));

srv.use(express.static('./public/zadanieDnia/'));
srv.set('views', __dirname + '/public/zadanieDnia');
srv.engine('html', require('ejs').renderFile);

srv.get('/', (req, res) => {
    res.render('index.html');
});

srv.get('/add', (req, res) => {
    res.render('add.html');
});

srv.post('/save', (req, res) => {
    if(!req.body) res.sendStatus(400);

    const comment = req.body.comment;

    if(comment == ""){
        setTimeout(() => {
            res.redirect('/add');
        }, 3000);

        res.write("Pusty komentarz");
        res.send();
    }

    let commentList = req.cookies.comment || "[]";
    commentList = JSON.parse(commentList);
    commentList.push(comment);

    res.cookie('comment', JSON.stringify(commentList), { maxAge: 31536000000 });

    res.send("Dodano komentarz!<br><a href='/'>Strona główna</a>");
});

srv.listen(3000, () => {
    console.log('Server start');
});