'use strict';

const cheerio = require('cheerio');

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
            page: 'chuck-norris-facts.php?PA={{PAGE}}',
            categories: [Scraper.CATEGORIES.CHUCK_NORRIS]
        }, {
            page: 'chuck-norris-facts.php?PA={{PAGE}}',
            categories: [Scraper.CATEGORIES.FREDDURE]
        }, {
            page: 'battute-divertenti.php?PA={{PAGE}}&genere=1&label=colmi',
            categories: Scraper.CATEGORIES.COLMI
        }, {
            page: '/battute-divertenti.php?PA={{PAGE}}&genere=3&label=differenze',
            categories: Scraper.CATEGORIES.DIFFERENZE
        }];
    }

    async getJokesFromPage(page, options) {
        const html = await this._downloadPage(page);
        const $ = cheerio.load(html);
        const divs = $('.panel-body > div')
        const jokes = Array.from(divs)
            .map(div => div.children[0].data)
            .map(joke => ({
                text: joke,
                categories: [...page.categories],
                source: 'LaPecoraSclera'
            }));
        return jokes;
    }

}

module.exports = LaPecoraSclera;