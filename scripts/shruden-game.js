let height = 320;
let width = 480;
var dx = 3;
var dy = 3;
let MAXCOINS = 8;
var coinsRemaining = MAXCOINS;
let coins = [MAXCOINS];

Crafty.init(width, height, document.getElementById("game"));

for (var i = 0; i < MAXCOINS; i++) {
    coins[i] = Crafty.e("2D, DOM, Color, Bind")
        .attr({x: Math.random() * width*4/5 + width/5, y: Math.random() * height*5/6 + height/6, w: 12, h: 24})
        .color("#0F0")
        .bind("UpdateFrame", function(eventData) {
            //this.x += Math.cos(eventData.dt);
        });
}

var blip = Crafty.e("2D, DOM, Color, Fourway, Bind")
    .attr({x: width / 4, y: height / 2, w: 24, h: 24})
    .color("#0FF")
    .fourway(200)
    .bind("Move", function(oldPosition) {

        if (oldPosition._y < 0) {
            this.y = 0;
        }
        if (oldPosition._y > height - this.h) {
            this.y = height - this.h;
        }
        if (oldPosition._x < 0) {
            this.x = 0;
        }
        if (oldPosition._x > width - this.w) {
            this.x = width - this.w;
        }
    });

var blarp = Crafty.e("2D, DOM, Color, Bind")
    .attr({x: width * 2 / 3, y: height / 2, w: 48, h: 48})
    .color("#F00")
    .bind("UpdateFrame", function() {

        if (this.y + this.h/2 > blip.y + blip.h/2) {
            this.y -= 2;
        }
        if (this.x + this.w/2 > blip.x + blip.w/2) {
            this.x -= 2;
        }
        if (this.y + this.h/2 < blip.y + blip.h/2) {
            this.y += 2;
        }
        if (this.x + this.w/2 < blip.x + blip.w/2) {
            this.x += 2;
        }
    })
    .bind("Move", function(oldPosition) {

        if (oldPosition._y < 0) {
            this.y = 0;
        }
        if (oldPosition._y > height - this.h) {
            this.y = height - this.h;
        }
        if (oldPosition._x < 0) {
            this.x = 0;
        }
        if (oldPosition._x > width - this.w) {
            this.x = width - this.w;
        }
    });

var blop = Crafty.e("2D, DOM, Color, Bind")
    .attr({x: width/2, y: height*2/3, w: 32, h: 32})
    .color("#F0F")
    .bind("UpdateFrame", function() {
        this.x += dx;
        this.y += dy;
    })
    .bind("Move", function(oldPosition) {

        if (oldPosition._y < 0) {
            this.y = 0;
            dy = 3;
        }
        if (oldPosition._y > height - this.h) {
            this.y = height - this.h;
            dy = -3;
        }
        if (oldPosition._x < 0) {
            this.x = 0;
            dx = 3;
        }
        if (oldPosition._x > width - this.w) {
            this.x = width - this.w;
            dx = -3;
        }
    });