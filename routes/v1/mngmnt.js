'use strict';

async function routes(fastify, options) {
    fastify.get('/mngmnt', async (request, reply) => {
        return { test: 1 };
    });
}

module.exports = routes;