'use strict';
const Core = require('../../Core.js');

async function routes(fastify, options) {
    fastify.get('/mngmnt/clear', async (request, reply) => {

        return { test: 1 };
    });

    fastify.get('/mngmnt/scrape', async (request, reply) => {
        const scraperType = request.query.scraper;
        let number = 0;
        if (scraperType) {
            if (false === (scraperType in Core.SERVICE))
                throw new Error("Please provide a valid service");
            number = await Core.scrape(scraperType);
        } else {
            for (const key of Object.keys(Core.SERVICE)) {
                number = await Core.scrape(key);
            }
        }
        return { status: 'OK', ...number };
    });
}

module.exports = routes;