const routes = require('next-routes')();

routes
    .add('/coin-clicker', '/coin-clicker')
    .add('/coin-capture', '/coin-capture')
    .add('/swap', '/swap');

module.exports = routes;