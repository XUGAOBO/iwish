const Mock = require('mockjs');
// let baseData = require('./baseData');
const Random = Mock.Random;
const flight = {
    "flight": {
        "airlineName": Random.ctitle(3, 5),
        "arrivalAirport": Random.cword(5),
        "arrivalCity": Random.city(),
        "arrivalDate": Random.date('yyyy-MM-dd'),
        "arrivalFlightFloor": Random.cword(5, 7),
        "arrivalTime": Random.date('HH:mm'),
        "departureAirport": Random.cword(5),
        "departureCity": Random.city(),
        "departureDate": Random.date('yyyy-MM-dd'),
        "departureFlightFloor": Random.cword(5, 7),
        "departureTime": "string",
        "departurePosition": {
            "latitude": 39.916527,
            "longitude": 116.397128
        },
        "flightDynamics": {
            "arrivalGate": Random.string('upper', 5),
            "boardingGate": Random.string('upper', 5),
            "counter": Random.string('upper', 5),
            "luggageCarousel": Random.string('upper', 5)
        },
        "flightId": Random.increment(1),
        "flightNo": '',
        "flightStatus": 0
    }
}
module.exports = {
    code:200,
    data:flight,
    message:'aaaa'
};