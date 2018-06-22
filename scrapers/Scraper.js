'use strict';

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
        };
    }

    /** @returns {String} Base url of the website to be scraped (ex: https://example.com) */
    get BASE_URL() {
        throw new Error(`Pages not defined`);
    }

    /** @returns {Page[]} List of pages supported by this scraper */
    get PAGES() {
        throw new Error(`Pages not defined`);
    }

    /**
     * Download the jokes from the specified page
     * @param {Page} page 
     * @param {Object} [options={}] Additional options
     * @returns {Joke[]}
     */
    getJokesFromPage(page, options) {
        throw new Error(`getJokesFromPage not implemented`);
    }

}

module.exports = Scraper;