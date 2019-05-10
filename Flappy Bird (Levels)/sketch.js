var cvs;
var ctx;

var width;
var height;

var frames = 0;
var score = 0;
var best = 0;
var fgpos = 0;

var currentstate;
var states = {
  Splash: 0, Floating: 1, Game: 2, Score: 3
}

var bird = {

  x: 200,
  y: 50,
  frame: 0,
  velocity: 0,
  animation: [0,1,2,1],
  rotation: 0,
  radius: 18,
  gravity: 0.5,
  _jump: 8.4,

  jump: function() {
    this.velocity = -this._jump;
    audio.play();
  },

  update: function() {
    var n = currentstate === states.Splash ? 10 : 5;
    this.frame += frames % n === 0 ? 1 : 0;
    this.frame %= this.animation.length;

    if (currentstate === states.Floating) {
      this.y = height - 350 + 5*Math.cos(frames/10);
      this.rotation = 0;
    } else {
      this.velocity += this.gravity;
      this.y += this.velocity;

      if(this.y >= height - flappybg.height-20) {
        this.y = height - flappybg.height-20;
        if (currentstate === states.Game) {
          currentstate = states.Score;
        }
        this.velocity = this._jump;
      }

      if (this.velocity >= this._jump) {
        this.frame = 1;
        this.rotation = Math.min(Math.PI/2, this.rotation + 0.3);
      } else {
        this.rotation = -0.3;
      }
    }
  },

  drawmia: function(ctx) {
    if(currentstate !== states.Splash){
      ctx.save();
      ctx.translate(this.x,this.y);
      ctx.rotate(this.rotation);

      ctx.beginPath();
      ctx.arc(0,0,this.radius,0,2*Math.PI);

      var n = this.animation[this.frame];
      s_miabird[n].draw(ctx, -s_miabird[n].width/2, -s_miabird[n].height/2);
      ctx.restore();
    }
  },

  drawbri: function(ctx) {
    if(currentstate !== states.Splash){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.rotation);

        ctx.beginPath();
        ctx.arc(0,0,this.radius,0,2*Math.PI);

        var n = this.animation[this.frame];
        s_bribird[n].draw(ctx, -s_bribird[n].width/2, -s_bribird[n].height/2);
        ctx.restore();
      }
  },

  drawgabby: function(ctx) {
    if(currentstate !== states.Splash){
      ctx.save();
      ctx.translate(this.x,this.y);
      ctx.rotate(this.rotation);

      ctx.beginPath();
      ctx.arc(0,0,this.radius,0,2*Math.PI);

      var n = this.animation[this.frame];
      s_gabbybird[n].draw(ctx, -s_gabbybird[n].width/2, -s_gabbybird[n].height/2);
      ctx.restore();
    }
  },
};

var pipes = {

  _pipes: [],

  reset: function() {
    this._pipes = [];
  },

  update: function() {
    if(frames % 100 === 0) {
      this._pipes.push({
        x: 500,
        y: Math.floor(Math.random() * 300) + 200,
        width: pipeBottom.width,
        height: pipeBottom.height,
      })
    }
    for (var i = 0, len = this._pipes.length; i < len; i++) {
      var p = this._pipes[i];

      if (i === 0) {
        var cx = Math.min(Math.max(bird.x, p.x), p.x + p.width);
        var cy1 = Math.min(Math.max(bird.y, p.y), p.y + p.height);
        var cy2 = Math.min(Math.max(bird.y, (-((1.00 - (p.y/550)) * 550)) + (-70)), (-((1.00 - (p.y/550)) * 550)) + (-70) + p.height);

        var dx = bird.x - cx;
        var dy1 = bird.y -cy1;
        var dy2 = bird.y - cy2;
        var d1 = dx*dx + dy1*dy1;
        var d2 = dx*dx + dy2*dy2;

        var r = bird.radius * bird.radius;

        if (r > d1 || r > d2) {
          currentstate = states.Score;
        }
      }

      p.x -= 3;
      if (p.x < -100) {
        this._pipes.splice(i,1);
        i--;
        len--;
      }

      if (p.x == 200) {
        score++;
      }
    }
  },

  draw: function() {
    for (var i = 0, len = this._pipes.length; i < len; i++) {
      var p = this._pipes[i];
      ctx.drawImage(pipeBottom,p.x,p.y);
      ctx.drawImage(pipeTop,p.x,(-((1.00 - (p.y/550)) * 550)) + (-70));
    }
  },
};

function onpress(evt) {

  switch (currentstate) {

    case states.Splash:
      currentstate = states.Floating;
      break;

    case states.Floating:
      if (evt.keyCode == "32") {
        currentstate = states.Game;
        bird.jump();
      }
      break;

    case states.Game:
      if (evt.keyCode == "32") {
      bird.jump();
      }
      break;

    case states.Score:
      currentstate = states.Splash;
      if (evt.keyCode == "32") {
            score = 0;
            pipes.reset();
          }
  }
}

function drawthebird (launch) {
  var repeat = function() {
  if (launch.keyCode == "69") {
    if (currentstate === states.Game || states.Score){
      bird.drawmia(ctx);
    }
  }
  if (launch.keyCode == "77") {
    if (currentstate === states.Game || states.Score){
      bird.drawbri(ctx);
    }
  }
  if (launch.keyCode == "72") {
    if (currentstate === states.Game || states.Score){
      bird.drawgabby(ctx);
    }
  }
  window.requestAnimationFrame(repeat,cvs);
}
  window.requestAnimationFrame(repeat,cvs);
}

var bg = new Image();
var pipeTop = new Image();
var pipeBottom = new Image();
var flappybg = new Image();
var scoremenu = new Image();
var title = new Image();
var gameover = new Image();
var bronze = new Image();
var silver = new Image();
var lightsilver = new Image();
var gold = new Image();

bg.src = "img/bg.png";
flappybg.src = "img/flappybg.png";
pipeTop.src = "img/pipeTop.png";
pipeBottom.src = "img/pipeBottom.png";
scoremenu.src = "img/score.png";
title.src = "img/title.png";
gameover.src = "img/gameover.png";
bronze.src = "img/bronze.png";
silver.src = "img/silver.png";
lightsilver.src = "img/lightsilver.png";
gold.src = "img/gold.png";

function main() {
  cvs = document.getElementById("canvas");

  width = window.innerWidth;
  height = window.innerHeight;

  var evt = "touchstart";
  if(width >= 500) {
    width = 500;
    height = 657;
    cvs.style.border = "1px solid #000";
    evt = "keydown";
  }
  var launch = "keyup";

  document.addEventListener(evt,onpress);
  document.addEventListener(launch,drawthebird);

  canvas.width = width;
  canvas.height = height;
  ctx = cvs.getContext("2d");

  currentstate = states.Splash;

  var img = new Image();
  img.onload = function() {
    initSprites(this);
    run();
  }
  img.src = "img/fullbirdsheet.png";
}

function run() {
  var loop = function() {
    update();
    render();
    window.requestAnimationFrame(loop,cvs);
  }
  window.requestAnimationFrame(loop,cvs);
}

function update() {
  frames++;

  if(currentstate !== states.Score){
    fgpos = (fgpos - 3) % 1000;
  } else {
    best = Math.max(best, score);
  }
  if (currentstate === states.Game) {
    pipes.update();
  }
  bird.update();
}

function render() {
  ctx.drawImage(bg,0,0);

  if (currentstate !== states.Splash) {
    pipes.draw();
    drawthebird();
  }

  ctx.drawImage(flappybg,fgpos,551);
  ctx.drawImage(flappybg,fgpos,551);

  if (currentstate === states.Splash) {
    ctx.drawImage(title,60,50);

    ctx.fillStyle = "orange";
    ctx.font = "60px flappyFont";
    ctx.fillText("Sociopath(E)",70,250);

    ctx.fillStyle = "black";
    ctx.font = "60px flappyFont";
    ctx.lineWidth = 3;
    ctx.strokeText("Sociopath(E)",70,250);

    ctx.fillStyle = "orange";
    ctx.font = "60px flappyFont";
    ctx.fillText("Littol Russion",45,350);

    ctx.fillStyle = "black";
    ctx.font = "60px flappyFont";
    ctx.lineWidth = 3;
    ctx.strokeText("Littol Russion",45,350);

    ctx.fillStyle = "orange";
    ctx.font = "60px flappyFont";
    ctx.fillText("Ladee(M)",120,398);

    ctx.fillStyle = "black";
    ctx.font = "60px flappyFont";
    ctx.lineWidth = 3;
    ctx.strokeText("Ladee(M)",120,398);

    ctx.fillStyle = "orange";
    ctx.font = "60px flappyFont";
    ctx.fillText("Retarted Veggie",8,498);

    ctx.fillStyle = "black";
    ctx.font = "60px flappyFont";
    ctx.lineWidth = 3;
    ctx.strokeText("Retarted Veggie",8,498);

    ctx.fillStyle = "orange";
    ctx.font = "60px flappyFont";
    ctx.fillText("Tale(H)",140,546);

    ctx.fillStyle = "black";
    ctx.font = "60px flappyFont";
    ctx.lineWidth = 3;
    ctx.strokeText("Tale(H)",140,546);
  }

  if (currentstate === states.Score) {
    ctx.drawImage(gameover,70,20);
    ctx.drawImage(scoremenu, 25,120);

    ctx.fillStyle = "white";
    ctx.font = "40px flappyFont";
    ctx.fillText(score,390,235);

    ctx.fillStyle = "black";
    ctx.font = "40px flappyFont";
    ctx.lineWidth = 3;
    ctx.strokeText(score,390,235);

    ctx.fillStyle = "white";
    ctx.font = "40px flappyFont";
    ctx.fillText(best,390,320);

    ctx.fillStyle = "black";
    ctx.font = "40px flappyFont";
    ctx.lineWidth = 3;
    ctx.strokeText(best,390,320);

    if (10 <= score && 19 >= score) {
      ctx.drawImage(bronze,70,215);
    }

    if (20 <= score && 29 >= score) {
      ctx.drawImage(silver,70,215);
    }

    if (30 <= score && 39 >= score) {
      ctx.drawImage(lightsilver,70,215);
    }

    if (40 <= score)
    ctx.drawImage(gold,70,215);
  }

  if (currentstate === states.Game) {
    ctx.fillStyle = "white";
    ctx.font = "55px flappyFont";
    ctx.fillText(score,cvs.width/2-10,cvs.height-550);

    ctx.fillStyle = "black";
    ctx.font = "55px flappyFont";
    ctx.lineWidth = 3;
    ctx.strokeText(score,cvs.width/2-10,cvs.height-550);
  }
}

function initNeat() {
  
}

main();
