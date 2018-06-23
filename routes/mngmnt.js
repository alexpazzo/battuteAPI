'use strict';

async function routes(fastify, options) {
    fastify.get('/', async (request, reply) => {
        return { test: 1 };
    });
}

module.exports = routes;