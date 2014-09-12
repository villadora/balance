var x = 0,
  y = 0,
  vx = 0,
  vy = 0,
  ax = 0,
  ay = 0;

var hr = 50,
  wr = 50;

var timer;


var socket = io();

var labels = ['x', 'y', 'z'].map(function(p) {
  return document.getElementById("val" + p);
});


var lvx = document.getElementById('valvx');
var lvy = document.getElementById('valvy');


var ts = Date.now();

if (window.DeviceMotionEvent != undefined) {
  window.ondevicemotion = function(e) {
    ax = Math.round(event.accelerationIncludingGravity.x);
    ay = Math.round(event.accelerationIncludingGravity.y);

    labels[0].innerText = Math.round(e.accelerationIncludingGravity.x);
    labels[1].innerText = Math.round(e.accelerationIncludingGravity.y);
    labels[2].innerText = Math.round(e.accelerationIncludingGravity.z);

    // console.log("accelerationY", e.accelerationIncludingGravity.y);
    // console.log("accelerationZ", e.accelerationIncludingGravity.z);

    if (!timer) {
      timer = setTimeout(function() {
        var delta = Date.now() - ts;
        ts = Date.now();

        vx = vx + ax * 1 * delta / 10;
        vy = vy + ay * 1 * delta / 10;

        vx = vx * 0.7 - 0.05;
        vy = vy * 0.7 - 0.05;

        
        
        lvx.innerText = vx;
        lvy.innerText = vy;
        socket.emit('v', [vx, vy]);

        timer = null;
      }, 25);
    }


    if (false && e.rotationRate) {
      console.log("rotationAlpha", e.rotationRate.alpha);
      console.log("rotationBeta", e.rotationRate.beta);
      console.log("rotationGamma", e.rotationRate.gamma);
    }
  }

}
