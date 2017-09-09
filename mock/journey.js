const Mock = require('mockjs');
const Random = Mock.Random;

let journeys = [];
//航班
for (let i = 0; i < 5; i++) {
    journeys.push({
        "cityName": Random.city(),
        "flightJourney": {
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
                "departureFlightFloor": Random.date('HH:mm'),
                "departureTime": Random.date('HH:mm'),
                "flightId": Random.increment(1),
                "flightNo": Random.string(6),
                "flightStatus": 0
            }
        },
        "journeyDate": Random.now('yyyy-MM-dd'),
        "journeyId": Random.increment(1),
        "journeyType": "FLIGHT",
        "suitcaseId": 0
    });
}

//酒店
for (let i = 0; i < 5; i++) {
    journeys.push({
        "cityName": Random.city(),
        "hotelJourney": {
            "checkInDate": Random.date('yyyy-MM-hh'),
            "checkOutDate": Random.date('yyyy-MM-hh'),
            "hotel": {
                "address": Random.county(true),
                "hotelId": 0,
                "hotelName": Random.cword(10, 15),
                "imageUrl": Random.image('200x100')
            }
        },
        "journeyDate": Random.date('yyyy-MM-dd'),
        "journeyId": Random.increment(),
        "journeyType": "HOTEL",
        "suitcaseId": 0
    });
}
module.exports = {
    code: 200,
    data: journeys,
    message: 'aaaaaa'
};