const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const srv = express();

srv.use(express.static('./public/zadanie02/'));
srv.use(cookieParser());
srv.use(bodyParser.urlencoded({ extended: false }));

srv.get('/', (req, res) => {
    res.render('index.html');
});

srv.post('/cookie/set', (req, res) => {
    if(!req.body || !req.body.imie) res.sendStatus(400);

    res.cookie("imie", req.body.imie, { maxAge: 2678400000 });
    res.send("Zapisano imię.");
});

srv.get('/cookie/show', (req, res) => {
    const cookie = req.cookies.imie;
    res.send(`Ciastko: ${cookie}`);
});

srv.get('/cookie/check', (req, res) => {
    res.send("Ciastko jest?: "+ (req.cookies.imie === undefined ? 'Nie' : 'Tak'));
});

srv.listen(3000, () => {
    console.log('Server start.')
});