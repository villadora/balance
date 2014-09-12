var bubble = document.getElementById(('bubble'));

var hr = 50,
  wr = 50;

var timer;

var x = bubble.offsetLeft || 0;
var y = bubble.offsetTop || 0;

var ts = Date.now();

var socket = io();
var timer;

socket.on('newv', function(data) {
  console.log(data);
  var vx = data.vx;
  var vy = data.vy;
  if (!timer) {
    timer = setTimeout(function() {
      var delta = Date.now() - ts;
      ts = Date.now();

      x = parseInt(x + vx / 2);
      y = parseInt(y + vy / 2);

      boundingBoxCheck(vx, vy);
      // console.log(x, y);
      bubble.style.bottom = y + "px";
      bubble.style.left = x + "px";

      timer = null;
    }, 25);
  }
});

setInterval(function() {
  bubble.style.width = ((Math.random() * 10 - 20) + wr * 2) + "px";
  bubble.style.height = ((Math.random() * 10 - 20) + hr * 2) + "px";
}, 500);


var container = document.getElementById("container");

function boundingBoxCheck(vx, vy) {
  if (x < 0) {
    x = 0;
    vx = -vx;
  }
  if (y < 0) {
    y = 0;
    vy = -vy;
  }
  if (x + vx > container.clientWidth - 50) {
    x = container.clientWidth - 50;
    vx = -vx;
  }
  if (y + vy > container.clientHeight - 50) {
    y = container.clientHeight - 50;
    vy = -vy;
  }
}

