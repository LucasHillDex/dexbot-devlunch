// Description:
//   Pugme is the most important thing in life
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot pug me - Receive a pug
//   hubot pug bomb N - get N pugs


module.exports = function(robot) {
  robot.respond(/pug me/i, function(msg) {
    return msg.http("http://pugme.herokuapp.com/random").get()(function(err, res, body) {
      return msg.send("http://" + JSON.parse(body).pug.split(".").slice(1).join("."));
    });
  });
  robot.respond(/pug bomb( (\d+))?/i, function(msg) {
    var count;
    count = msg.match[2] || 5;
    return msg.http("http://pugme.herokuapp.com/bomb?count=" + count).get()(function(err, res, body) {
      var i, len, pug, ref, results;
      ref = JSON.parse(body).pugs;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        pug = ref[i];
        results.push(msg.send("http://" + pug.split(".").slice(1).join(".")));
      }
      return results;
    });
  });
  robot.respond(/how many pugs are there/i, function(msg) {
    return msg.http("http://pugme.herokuapp.com/count").get()(function(err, res, body) {
      return msg.send("There are " + (JSON.parse(body).pug_count) + " pugs.");
    });
  });
};