let height = 320;
let width = 480;

Crafty.init(width, height, document.getElementById("game"));

var blip = Crafty.e("2D, DOM, Color, Fourway, Bind")
    .attr({x: width / 4, y: height / 2, w: 16, h: 16})
    .color("#0FF")
    .fourway(200)
    .bind("Move", function(oldPosition) {

        if (oldPosition._y < 0) {
            console.log("Top Border");
            this.y = 0;
        }
        if (oldPosition._y > height - this.h) {
            console.log("Bottom Border");
            this.y = 320 - this.h;
        }
        if (oldPosition._x < 0) {
            console.log("Left Border");
            this.x = 0;
        }
        if (oldPosition._x > width - this.w) {
            console.log("RightBorder");
            this.x = 480 - this.w;
        }
    });

var blarp = Crafty.e("2D, DOM, Color, Bind")
    .attr({x: width * 2 / 3, y: height / 2, w: 32, h: 32})
    .color("#F00")
    .bind("UpdateFrame", function() {

        if (this.y + this.h/2 > blip.y + blip.h/2) {
            this.y -= 2;
        }
        if (this.x + this.w/2 > blip.x + blip.w/2) {
            this.x -= 2;
        }
        if (this.y + this.h/2 < blip.y + blip.h/2) {
            this.y -= 2;
        }
        if (this.x + this.w/2 < blip.x + blip.w/2) {
            this.x -= 2;
        }
    })
    .bind("Move", function(oldPosition) {

        if (oldPosition._y < 0) {
            console.log("Top Border");
            this.y = 0;
        }
        if (oldPosition._y > height - this.h) {
            console.log("Bottom Border");
            this.y = 320 - this.h;
        }
        if (oldPosition._x < 0) {
            console.log("Left Border");
            this.x = 0;
        }
        if (oldPosition._x > width - this.w) {
            console.log("RightBorder");
            this.x = 480 - this.w;
        }
    });

var blop = Crafty.e("2D, DOM, Color, Bind")
    .attr({x: width/2, y: height*2/3, w: 24, h: 24, dx: 150, dy: 150})
    .color("#F0F")
    .bind("UpdateFrame", function() {
        this.x += this.dx;
        this.y += this.dy;
    })
    .bind("Move", function(oldPosition) {
        if (oldPosition._y < 0) {
            console.log("Top Border");
            this.y = 0;
            this.dy *= -1;
        }
        if (oldPosition._y > height - this.h) {
            console.log("Bottom Border");
            this.y = 320 - this.h;
            this.dy *= -1;
        }
        if (oldPosition._x < 0) {
            console.log("Left Border");
            this.x = 0;
            this.dx *= -1;
        }
        if (oldPosition._x > width - this.w) {
            console.log("RightBorder");
            this.x = 480 - this.w;
            this.dx *= -1;
        }
    });