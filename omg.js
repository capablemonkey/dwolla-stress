var t = require("exectimer");

var tick = new t.tick("myFunction");
tick.start();
// do some processing and end this tick
tick.stop();


// Display the results
console.log(t.timers.myFunction.duration()); // total duration of all ticks
console.log(t.timers.myFunction.min()); // minimal tick duration
console.log(t.timers.myFunction.max()); // maximal tick duration
console.log(t.timers.myFunction.mean()); // mean tick duration
console.log(t.timers.myFunction.median()); // median tick duration
console.log(t.timers.myFunction.start()); // timestamp of the start of the first tick
console.log(t.timers.myFunction.end()); // timestamp of the end of the last tick