Crafty.init(480, 320, document.getElementById('game'));

Crafty.e('2D, DOM, Color, Fourway, Bind')
    .attr({x: 0, y: 0, w: 32, h: 32})
    .color('#0FF')
    .fourway(200)
    .bind("KeyDown", function(e) {

        /*
        if (e.key == Crafty.keys.W && this.y > 0) {
            this.y = this.y - 1;
        }
        if (e.key == Crafty.keys.S && this.y < 320 - this.attr.h) {
            this.y = this.y + 1;
        }
        if (e.key == Crafty.keys.A && this.x > 0) {
            this.x = this.x - 1;
        }
        if (e.key == Crafty.keys.D && this.x < 480 - this.attr.w) {
            this.x = this.x + 1;
        }
        */

        /*
        if (e.key == Crafty.keys.W) {
            console.log("W");
        }
        if (e.key == Crafty.keys.S) {
            console.log("S");
        }
        if (e.key == Crafty.keys.A) {
            console.log("A");
        }
        if (e.key == Crafty.keys.D) {
            console.log("D");
        }
        */

        if (this.y > 0) {
            console.log("Y is greater than 0");
        }
        if (this.y < 320 - this.attr.h) {
            console.log("Y is less than 320");
        }
        if (this.x > 0) {
            console.log("X is greater than 0");
        }
        if (this.x < 480 - this.attr.w) {
            console.log("X is less than 480");
        }

        // console.log(this.x, this.y, e.key);
    });