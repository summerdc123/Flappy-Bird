var s_bird;
var s_miabird;
var s_bribird;
var s_gabbybird;

function Sprite(img,x,y,width,height) {
  this.img = img;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
};
Sprite.prototype.draw = function(ctx,x,y) {
  ctx.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
};

function initSprites(img) {
  s_bird = [
    new Sprite(img,0,0,52,37),
    new Sprite(img,52,0,52,37),
    new Sprite(img,104,0,52,37),
  ],

  s_miabird = [
    new Sprite(img,0,37,52,37),
    new Sprite(img,52,37,52,37),
    new Sprite(img,104,37,52,37),
  ],

  s_bribird = [
    new Sprite(img,0,74,52,37),
    new Sprite(img,52,74,52,37),
    new Sprite(img,104,74,52,37),
  ],

  s_gabbybird = [
    new Sprite(img,0,111,52,37),
    new Sprite(img,52,111,52,37),
    new Sprite(img,104,111,52,37),
  ]
}
