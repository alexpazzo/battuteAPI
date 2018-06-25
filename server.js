'use strict';

const fastify = require('fastify')({
    logger: true
});


fastify.get('/', function (request, reply) {
    reply.send({ status: true });
});

fastify.register(require('./routes/v1/jokes.js'), { prefix: '/v1/jokes' });
//TODO add auth to mngmnt route
fastify.register(require('./routes/v1/mngmnt.js'), { prefix: '/v1/mngmnt' });


fastify.listen(3000, '0.0.0.0', function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
});
