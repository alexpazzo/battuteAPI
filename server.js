'use strict';

const express = require('express');
const app = express();

const LaPecoraSclera = require('./scrapers/LaPecoraSclera.js');


app.get('/', async function (req, res) {
    res.send({ status: "OK", listServices: [] });
});


app.get('/update_jokes', async function (req, res) {

    const lps = new LaPecoraSclera();
    const jokes = lps.getJokes(LaPecoraSclera._CATEGORIES.CHUCK_NORRIS);

    res.send({ status: "OK", listServices: [] });

});


app.get('/chuck', async function (req, res) {

});

app.listen(3000);