'use strict';

const cheerio = require('cheerio');
const Scraper = require('./Scraper.js');

class FuoriDiTesta extends Scraper {

    static get BASE_URL() {
        return "http://www.fuoriditesta.it/barzellette/";
    }

    static get PAGES() {
        return [{
            "AFORISMI": {
                page: "aforismi-{{PAGE}}.html",
                categories: [Scraper.CATEGORIES.AFORISMI]
            },
            "ANIMALI": {
                page: "animali-{{PAGE}}.html",
                categories: [Scraper.CATEGORIES.ANIMALI]
            },
            "CALCIO": {
                page: "calcio-{{PAGE}}.html",
                categories: [Scraper.CATEGORIES.CALCIO]
            },
            "CARABINIERI": {
                page: "carabinieri-{{PAGE}}.html",
                categories: [Scraper.CATEGORIES.CARABINIERI]
            },
            "COLMI_E_FREDDURE": {
                page: "colmi-e-freddure-{{PAGE}}.html",
                categories: [Scraper.CATEGORIES.COLMI, Scraper.CATEGORIES.FREDDURE]
            },
            "DAL_DOTTORE": {
                page: "dal-dottore-{{PAGE}}.html",
                categories: [Scraper.CATEGORIES.DAL_DOTTORE]
            },
            "DONNE": {
                page: "donne-{{PAGE}}.html",
                categories: [Scraper.CATEGORIES.DONNE]
            },
            "INDOVINELLI": {
                page: "indovinelli-{{PAGE}}.html",
                categories: [Scraper.CATEGORIES.INDOVINELLI]
            },
            "POLITICA": {
                page: "politica-{{PAGE}}.html",
                categories: [Scraper.CATEGORIES.POLITICA]
            },
            "PROFESSIONI": {
                page: "professioni-{{PAGE}}.html",
                categories: [Scraper.CATEGORIES.PROFESSIONI]
            },
            "RELIGIONE": {
                page: "religione-{{PAGE}}.html",
                categories: [Scraper.CATEGORIES.RELIGIONE]
            },
            "SCUOLA": {
                page: "scuola-{{PAGE}}.html",
                categories: [Scraper.CATEGORIES.SCUOLA]
            },
            "TECNOLOGIA": {
                page: "tecnologia-{{PAGE}}.html",
                categories: [Scraper.CATEGORIES.TECNOLOGIA]
            },
            "UOMINI": {
                page: "uomini-{{PAGE}}.html",
                categories: [Scraper.CATEGORIES.UOMINI]
            },
            "VARIE": {
                page: "varie-{{PAGE}}.html",
                categories: [Scraper.CATEGORIES.VARIE]
            }
        }]
    }

    async getJokesFromPage(page, options) {
        const html = await this._downloadPage(page);
        const $ = cheerio.load(html);
        const divs = $("body > form > div.container > div.content > div:nth-child(3) > .end").prev("div");
        const jokes = Array.from(divs)
            .map(div => div.children[0].data)
            .map(joke => ({
                text: joke,
                categories: [...page.categories],
                source: 'FuoriDiTesta'
            }));
        return jokes;
    }

}
module.exports = FuoriDiTesta;