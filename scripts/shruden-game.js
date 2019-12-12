let height = 320;
let width = 480;

Crafty.init(width, height, document.getElementById("game"));

var blip = Crafty.e("2D, DOM, Color, Fourway, Bind")
    .attr({x: width / 3, y: height / 2, w: 32, h: 32})
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
    .attr({x: width * 2 / 3, y: height / 2, w: 64, h: 64})
    .color("")
    .bind("UpdateFrame", function() {

        if (this.y + this.h/2 > blip.y + blip.h/2) {
            this.y = this.y - 2;
        }
        if (this.x + this.w/2 > blip.x + blip.w/2) {
            this.x = this.x - 2;
        }
        if (this.y + this.h/2 < blip.y + blip.h/2) {
            this.y = this.y + 2;
        }
        if (this.x + this.w/2 < blip.x + blip.w/2) {
            this.x = this.x + 2;
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