const StatsD = require('hot-shots'), client = new StatsD({
    port: 8767,
    tagSeparator: "#"
    
})

const sendGauge = (gauge, amount, tags, callback) => {
  try {
    if(sanitizeData(gauge, amount, tags)) {
      console.log(tags)
      client.gauge(gauge, amount, tags);
    } 
  } catch(err) {
    callback(err)
  }
}

const incrementCounter = (counter, tags, callback) => {
  try {
    if(sanitizeData(counter, 0, tags)) {
      console.log(tags)
      client.increment(counter, tags)
    }
  } catch(err) {
    callback(err)
  }
}

const sanitizeData = (gauge, amount, tags) => {
  checkName(gauge)
  checkValue(amount)
  checkTags(tags)
  return true
}

const checkTags = tags => {
  console.log(tags)
  tags.forEach(tag => {
    if(tag.includes("#")) {
      throw `Illegal character # in tag ${tag}`
    }
    if(tag.includes("|")) {
      throw `Illegal character | in tag ${tag}`
    }
  })
  return true
}

const checkName = name => {
  if(name.includes("#")) {
    throw `Illegal character # in metric name ${name}`
  }
  if(name.includes("|")) {
    throw `Illegal character | in metric name ${name}`
  }
  return true
}

const checkValue = number => {
  if(typeof number != 'number') {
    throw 'Metric value is not a number'
  } 
  return true
}


// // Timer: Returns a function that you call to record how long the first
//   // parameter takes to execute (in milliseconds) and then sends that value
//   // using 'client.timing'.
//   // The parameters after the first one (in this case 'fn')
//   // match those in 'client.timing'.
//   var fn = function(a, b) { return a + b };
//   client.timer(fn, 'fn_execution_time')(2, 2);

// // Async timer: Similar to timer above, but you instead pass in a funtion
// // that returns a Promise.  And then it returns a Promise that will record the timing.
// // var fn = function () { return new Promise(function (resolve, reject) { setTimeout(resolve, n); }); };
// // var instrumented = client.asyncTimer(fn, 'fn_execution_time');
// // instrumented().then(function() {
// //     console.log('Code run and metric sent');
// // });

// // Increment: Increments a stat by a value (default is 1)
// client.increment('my_counter');
 
// // Decrement: Decrements a stat by a value (default is -1)
// client.decrement('my_counter');

// // Gauge: Gauge a stat by a specified amount
// client.gauge('my_gauge', 123.45);
 
// // Set: Counts unique occurrences of a stat (alias of unique)
// client.set('my_unique', 'foobar');
// client.unique('my_unique', 'foobarbaz');
 
// // Incrementing multiple items
// client.increment(['these', 'are', 'different', 'stats']);
 
// // Incrementing with tags
// client.increment('my_counter', ['foo', 'bar']);
 
// // Sampling, this will sample 25% of the time the StatsD Daemon will compensate for sampling
// client.increment('my_counter', 1, 0.25);

// // Using the callback.  This is the same format for the callback
// // with all non-close calls
// client.set(['foo', 'bar'], 42, function(error, bytes){
//     //this only gets called once after all messages have been sent
//     if(error){
//       console.error('Oh noes! There was an error:', error);
//     } else {
//       console.log('Successfully sent', bytes, 'bytes');
//     }
// });

// Close statsd. This will ensure all stats are sent and stop statsd from doing anything more
client.close(function(err) {
    console.log('The close did not work quite right: ', err);
  });


  module.exports = {
    sendGauge,
    incrementCounter
  }