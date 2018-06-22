'use strict';

/**
 * @typedef Page
 * @property {String} page URL without the BASE_URL, using {{PAGE}} as a placeholder for the page number
 * @property {String[]} categories Categories of the jokes collected from this page
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

}

module.exports = Scraper;