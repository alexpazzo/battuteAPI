'use strict'

const LPS = require('./scrapers/LaPecoraSclera.js');
const FDT = require('./scrapers/FuoriDiTesta.js');
const db = require('./database.js');

class Core {

    static get SERVICE() {
        return {
            LAPECORASCLERA: new LPS(),
            FUORIDITESTA: new FDT()
        };
    }

    /**
     * Scrape a service
     */
    static async scrape(service) {
        if (false === (service in Core.SERVICE)) throw new Error("Please provide a valid service");
        const jokes = await Core.SERVICE[service].downloadAllJokes();
        for (const joke of jokes) {
            await db.addJoke(joke).catch(console.error);
        }
    }

}

module.exports = Core;