'use strict';

async function routes(fastify, options) {
    fastify.get('/jokes', async (request, reply) => {
        return { responseFrom: "get /jokes" };
    });

    fastify.post('/jokes', async (request, reply) => {
        return { responseFrom: "post /jokes" };
    });
}

module.exports = routes;