let height = 320;
let width = 480;
let dx = 3;
let dy = 3;

Crafty.init(width, height, document.getElementById("game"));

var blip = Crafty.e("2D, DOM, Color, Fourway, Bind")
    .attr({x: width / 4, y: height / 2, w: 24, h: 24})
    .color("#0FF")
    .fourway(200)
    .bind("Move", function(oldPosition) {

        if (oldPosition._y < 0) {
            this.y = 0;
        }
        if (oldPosition._y > height - this.h) {
            this.y = 320 - this.h;
        }
        if (oldPosition._x < 0) {
            this.x = 0;
        }
        if (oldPosition._x > width - this.w) {
            this.x = 480 - this.w;
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
            this.y = 320 - this.h;
        }
        if (oldPosition._x < 0) {
            this.x = 0;
        }
        if (oldPosition._x > width - this.w) {
            this.x = 480 - this.w;
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
            dy *= -1;
        }
        if (oldPosition._y > height - this.h) {
            this.y = 320 - this.h;
            dy *= -1;
        }
        if (oldPosition._x < 0) {
            this.x = 0;
            dx *= -1;
        }
        if (oldPosition._x > width - this.w) {
            this.x = 480 - this.w;
            dx *= -1;
        }

        console.log(dx, dy);
    });