'use strict';

const Scraper = require('./Scraper.js');

/**
 * @class LaPecoraSclera
 * @extends Scraper
 */
class LaPecoraSclera extends Scraper {

    get BASE_URL() {
        return "http://www.lapecorasclera.it/";
    }

    get PAGES() {
        return [{
            page: 'chuck-norris-facts.php?',
            categories: [Scraper.CATEGORIES.CHUCK_NORRIS]
        }, {
            page: 'chuck-norris-facts.php?',
            categories: [Scraper.CATEGORIES.FREDDURE]
        }, {
            page: 'battute-divertenti.php?genere=1&label=colmi',
            categories: Scraper.CATEGORIES.COLMI
        }, {
            page: '/battute-divertenti.php?genere=3&label=differenze',
            categories: Scraper.CATEGORIES.DIFFERENZE
        }];
    }

}

module.exports = LaPecoraSclera;