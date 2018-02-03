const express = require('express');
const bodyParser = require('body-parser');
const srv = express();

srv.use(express.static('./public/zadanie01/'));
srv.use(bodyParser.urlencoded({ extended: false }));

srv.get('/', (req, res) => {
    res.sendfile('index.html');
});

srv.post('/form', (req, res) => {
    if(!req.body) res.sendStatus(400);

    const {licz1, licz2} = req.body;
    const dziel = parseInt(licz1) / parseInt(licz2);
    
    res.send(`Liczba podzielna (${licz1}/${licz2}): ` + ((Math.ceil(dziel) == dziel)? 'Tak' : 'Nie'));
});

srv.listen(3000, () => {
    console.log('Server start.')
});