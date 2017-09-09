const Mock = require('mockjs');
// let baseData = require('./baseData');
const Random = Mock.Random;
const hotel = {
    "checkInDate": Random.date('yyyy-MM-hh'),
    "checkOutDate": Random.date('yyyy-MM-hh'),
    "hotel": {
        "address": Random.county(true),
        "hotelId": 0,
        "hotelName": Random.cword(10, 15),
        "imageUrl": Random.image('200x100'),
        "phoneNo": Random.string('number', 11),
        "position": {
            "latitude": 39.916527,
            "longitude": 116.397128
        }
    }
}
module.exports = {
    code: 200,
    data: hotel,
    message: 'aaaa'
};