'use strict';

const rp = require('request-promise');

/**
 * @typedef {Object} Page
 * @property {String} page URL without the BASE_URL, using {{PAGE}} as a placeholder for the page number.
 * @property {String[]} categories Categories of the jokes collected from this page.
 */


/**
 * @typedef {Object} Joke
 * @property {String} text Text of the joke.
 * @property {String[]} categories Categories of the joke. Must be the ones of Scraper.CATEGORIES
 * @property {String} source From where the joke was scraped.
 */


/**
 * @class Scraper
 * Base class that provides all common methods for the scrapers
 */
class Scraper {

    /** @returns {Object} Enum with all supported categories */
    static get CATEGORIES() {
        return {
            CHUCK_NORRIS: 'CHUCK_NORRIS',
            FREDDURE: 'FREDDURE',
            COLMI: 'COLMI',
            DIFFERENZE: 'DIFFERENZE',
            COLMI: "COLMI",
            AFORISMI: "AFORISMI",
            ANIMALI: "ANIMALI",
            CALCIO: "CALCIO",
            CARABINIERI: "CARABINIERI",
            DAL_DOTTORE: "DAL_DOTTORE",
            DONNE: "DONNE",
            INDOVINELLI: "INDOVINELLI",
            POLITICA: "POLITICA",
            PROFESSIONI: "PROFESSIONI",
            RELIGIONE: "RELIGIONE",
            SCUOLA: "SCUOLA",
            TECNOLOGIA: "TECNOLOGIA",
            UOMINI: "UOMINI",
            VARIE: "VARIE"
        };
    }

    /** @returns {String} Base url of the website to be scraped (ex: https://example.com) */
    static get BASE_URL() {
        throw new Error(`BASE_URL not defined`);
    }

    /** @returns {Page[]} List of pages supported by this scraper */
    static get PAGES() {
        throw new Error(`PAGES not defined`);
    }

    /**
     * Download the jokes from the specified page
     * @param {Page} page 
     * @param {Object} [options={}] Additional options
     * @returns {Joke[]}
     */
    async getJokesFromPage(page, options) {
        throw new Error(`getJokesFromPage not implemented`);
    }


    /**
     * Download the jokes from all the pages of the scraper
     * @returns {Joke[]}
     */
    async downloadAllJokes() {
        const downloadPromises = this.PAGES.map(page => this.getJokesFromPage(page));
        const jokesFromPages = await Promise.all(downloadPromises);
        const jokes = jokesFromPages
            .reduce((all, jokes) => {
                all.push(...jokes);
                return all;
            });
        return jokes;
    }


    /**
     * Download a page
     * @param {Page} pageConfig
     * @param {Object} options
     * @param {Number} [options.pageNum=1]
     * @returns {String} html
     */
    async _downloadPage(pageConfig, options = {}) {
        const { pageNum = 1 } = options;
        const url = this.BASE_URL + pageConfig.page.replace('{{PAGE}}', pageNum);
        return await rp(url);
    }

}

module.exports = Scraper;