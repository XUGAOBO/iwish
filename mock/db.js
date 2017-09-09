const journey = require('./journey');
const flight =require('./flight');
const hotel =require('./hotel');
const order = require('./order');

module.exports = function () {
    return {
        order
    }
}