'use strict';

async function routes(fastify, options) {
    fastify.get('/jokes', async (request, reply) => {
        //get categories from request
        const categories = request.query.categories;
        if (!categories) return { status: "get a random joke (all categories)" };

        return { status: `get a random joke from ${categories}` };

    });

    fastify.post('/jokes', async (request, reply) => {
        return { responseFrom: "post /jokes" };
    });
}

module.exports = routes;