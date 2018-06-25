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
        let numberTotal = 0;
        let numberDone = 0;
        if (false === (service in Core.SERVICE)) throw new Error("Please provide a valid service");
        const jokes = await Core.SERVICE[service].downloadAllJokes();
        numberTotal = jokes.length;
        for (const joke of jokes) {
            try {
                await db.addJoke(joke);
                numberDone++
            } catch (error) {
                console.error(error, error.stack);
            }
        }
        return { numberTotal, numberDone };
    }
}

module.exports = Core;