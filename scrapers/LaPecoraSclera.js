'use strict';

const request = require('request-promise-native');
const cheerio = require('cheerio');

class LaPecoraSclera {

    constructor() {
        this.categories = LaPecoraSclera._CATEGORIES;
    }

    static get BASE_URL() {
        return "http://www.lapecorasclera.it/";
    }

    static get _CATEGORIES() {
        return {
            'CHUCK_NORRIS': {
                page: 'chuck-norris-facts.php?',
                pages: 5,
            },
            'FREDDURE': {
                page: 'chuck-norris-facts.php?',
                pages: 25,
            },
            'COLMI': {
                page: 'battute-divertenti.php?genere=1&label=colmi',
                pages: 2,
            },
            'DIFFERENZE': {
                page: '/battute-divertenti.php?genere=3&label=differenze',
                pages: 1,
            },
        }
    }


    getJokes(category) {
        if (false === (category in this.categories))
            throw new Error(`Invalid category "${category}"`);

        debugger;
    }
}

module.exports = LaPecoraSclera;