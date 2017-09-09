/**
 * Created by BO on 2017/3/6.
 */
module.exports = function(){
  var faker =require("faker");
  var  _ = require("lodash");
  return {
    homeCoursesTypes: _.times(10,function (n) {
      return {
        id: n,
        name: faker.lorem.word()
      }
    })
  }
}

