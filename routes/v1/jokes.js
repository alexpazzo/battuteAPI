'use strict';

const db = require('../../database.js');

async function routes(fastify, options) {
    fastify.get('/', async (request, reply) => {
        const category = request.query.category;
        const joke = await db.getJoke({
            categories: category ? [category] : [],
            source: request.query.source,
            length: request.query.length
        });
        return { status: true, data: joke };
    });

    fastify.post('/', async (request, reply) => {
        return { responseFrom: "post /jokes" };
    });
}

module.exports = routes;