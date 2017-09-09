const Mock = require('mockjs');
// let baseData = require('./baseData');
const Random = Mock.Random;
const data = {
    "contact": {
      "email": Random.email(),
      "firstName": Random.string(10),
      "lastName": Random.string(10),
      "phoneNo": Random.string(10)
    },
    "createTime": "2017-05-14T07:01:32.471Z",
    "journey": {
      "arrivalDetail": {
        "airportCode": Random.string(5),
        "airportName": Random.string(10),
        "cityCode": Random.string(5),
        "cityName": Random.city(),
        "date": Random.date('yyyy-MM-dd'),
        "terminal": Random.string(10),
        "time": Random.time('HH:mm:ss')
      },
      "departureDetail": {
        "airportCode": Random.string(510),
        "airportName": Random.string(10),
        "cityCode": Random.string(5),
        "cityName": Random.city(),
        "date": Random.date('yyyy-MM-dd'),
        "terminal": Random.string(10),
        "time": Random.time('HH:mm:ss')
      },
      "segments": [
        {
          "baggageWeight": Random.integer(60, 100),
          "flight": {
            "airlineName": Random.string(10),
            "arrivalDetail": {
              "airportCode": Random.string(10),
              "airportName": Random.string(10),
              "cityCode": Random.string(5),
              "cityName": Random.city(),
              "date": Random.date('yyyy-MM-dd'),
              "terminal": Random.string(10),
              "time": Random.time('HH:mm:ss')
            },
            "departureDetail": {
              "airportCode": Random.string(10),
              "airportName": Random.string(10),
              "cityCode": Random.string(5),
              "cityName": Random.city(),
              "date": Random.date('yyyy-MM-dd'),
              "terminal": Random.string(10),
              "time": Random.time('HH:mm:ss')
            },
            "flightDuration": Random.integer(60, 100),
            "flightNo": Random.string(10)
          },
          "hasFood": false,
          "seatType": "ECONOMY"
        }
      ]
    },
    "orderId": Random.integer(60, 100),
    "passengers": [
      {
        "birthday": "2017-05-14T07:01:32.472Z",
        "citizenship": Random.string(10),
        "firstName": Random.string(10),
        "lastName": Random.string(10),
        "luggage": Random.string(10),
        "passport": {
          "expirationDate": "2017-05-14T07:01:32.472Z",
          "passportNo": Random.string(10),
          "publisherCountry": Random.string(10)
        },
        "title": Random.string(10)
      }
    ],
    "payAmount": Random.string(10),
    "quantity": Random.integer(60, 100),
    "refundInput": false,
    "returnJourney": {
      "arrivalDetail": {
        "airportCode": Random.string(10),
        "airportName": Random.string(10),
        "cityCode": Random.string(5),
        "cityName": Random.city(),
        "date": Random.date('yyyy-MM-dd'),
        "terminal": Random.string(10),
        "time": Random.time('HH:mm:ss')
      },
      "departureDetail": {
        "airportCode": Random.string(10),
        "airportName": Random.string(10),
        "cityCode": Random.string(5),
        "cityName": Random.city(),
        "date": Random.date('yyyy-MM-dd'),
        "terminal": Random.string(10),
        "time": Random.time('HH:mm:ss')
      },
      "segments": [
        {
          "baggageWeight": Random.integer(60, 100),
          "flight": {
            "airlineName": Random.string(10),
            "arrivalDetail": {
              "airportCode": Random.string(10),
              "airportName": Random.string(10),
              "cityCode": Random.string(10),
              "cityName": Random.city(),
              "date": Random.date('yyyy-MM-dd'),
              "terminal": Random.string(10),
              "time": Random.time('HH:mm:ss')
            },
            "departureDetail": {
              "airportCode": Random.string(10),
              "airportName": Random.string(10),
              "cityCode": Random.string(10),
              "cityName": Random.city(),
              "date": Random.date('yyyy-MM-dd'),
              "terminal": Random.string(10),
              "time": Random.time('HH:mm:ss')
            },
            "flightDuration": Random.integer(60, 100),
            "flightNo": Random.string(10)
          },
          "hasFood": true,
          "seatType": "ECONOMY"
        }
      ]
    },
    "totalAmount": Random.string(10),
    "venderId": Random.integer(60, 100),
    "venderName": Random.integer(60, 100)
  }

module.exports = {
    code: 200,
    data: data,
    message: 'aaaa'
};