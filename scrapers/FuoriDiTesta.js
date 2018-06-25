'use strict';

const cheerio = require('cheerio');
const Scraper = require('./Scraper.js');

class FuoriDiTesta extends Scraper {

    get BASE_URL() {
        return "http://www.fuoriditesta.it/barzellette/";
    }

    get PAGES() {
        return [{
            page: "aforismi-{{PAGE}}.html",
            categories: [Scraper.CATEGORIES.AFORISMI]
        }, {
            page: "animali-{{PAGE}}.html",
            categories: [Scraper.CATEGORIES.ANIMALI]
        }, {
            page: "calcio-{{PAGE}}.html",
            categories: [Scraper.CATEGORIES.CALCIO]
        }, {
            page: "carabinieri-{{PAGE}}.html",
            categories: [Scraper.CATEGORIES.CARABINIERI]
        }, {
            page: "colmi-e-freddure-{{PAGE}}.html",
            categories: [Scraper.CATEGORIES.COLMI, Scraper.CATEGORIES.FREDDURE]
        }, {
            page: "dal-dottore-{{PAGE}}.html",
            categories: [Scraper.CATEGORIES.DAL_DOTTORE]
        }, {
            page: "donne-{{PAGE}}.html",
            categories: [Scraper.CATEGORIES.DONNE]
        }, {
            page: "indovinelli-{{PAGE}}.html",
            categories: [Scraper.CATEGORIES.INDOVINELLI]
        }, {
            page: "politica-{{PAGE}}.html",
            categories: [Scraper.CATEGORIES.POLITICA]
        }, {
            page: "professioni-{{PAGE}}.html",
            categories: [Scraper.CATEGORIES.PROFESSIONI]
        }, {
            page: "religione-{{PAGE}}.html",
            categories: [Scraper.CATEGORIES.RELIGIONE]
        }, {
            page: "scuola-{{PAGE}}.html",
            categories: [Scraper.CATEGORIES.SCUOLA]
        }, {
            page: "tecnologia-{{PAGE}}.html",
            categories: [Scraper.CATEGORIES.TECNOLOGIA]
        }, {
            page: "uomini-{{PAGE}}.html",
            categories: [Scraper.CATEGORIES.UOMINI]
        }, {
            page: "varie-{{PAGE}}.html",
            categories: [Scraper.CATEGORIES.VARIE]
        }]
    }

    async getJokesFromPage(page, options) {
        const html = await this._downloadPage(page);
        const $ = await cheerio.load(html);
        const divs = $("div.content > div:nth-child(3) > .end").prev("div");
        if (!divs) throw new Error("No joke found");
        const jokes = Array.from(divs)
            .map(div => div.children
                .filter(c => c.type === 'text')
                .map(c => c.data.replace('\n', ''))
                .join('\n'))
            .map(joke => ({
                text: joke,
                categories: [...page.categories],
                source: 'FuoriDiTesta'
            }));
        return jokes;
    }
}
module.exports = FuoriDiTesta;