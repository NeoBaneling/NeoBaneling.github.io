let height = 320;
let width = 480;

Crafty.init(width, height, document.getElementById("game"));

Crafty.defineScene("start", function(attributes) {
    Crafty.background("#7820A8");

    var keyBinding = Crafty.e("Bind")
        .bind("KeyDown", function(e) {

            if (e.key == Crafty.keys.ENTER) {
                Crafty.enterScene("game");
            }
        });
});

Crafty.defineScene("game", function(attributes) {
    var dx = 3;
    var dy = 3;
    let MAXCOINS = 8;
    var coinsRemaining = MAXCOINS;
    let coins = [MAXCOINS];
    Crafty.background("#FFF");

    let bWidth = 4;
    var borderTop = Crafty.e("2D, DOM, Color")
        .attr({x: 0, y: 0, z: 1, w: width, h: bWidth})
        .color("#7820A8");
    var borderLeft = Crafty.e("2D, DOM, Color")
        .attr({x: 0, y: 0, z: 1, w: bWidth, h: height})
        .color("#7820A8");
    var borderRight = Crafty.e("2D, DOM, Color")
        .attr({x: width - bWidth, y: 0, z: 1, w: bWidth, h: height})
        .color("#7820A8");
    var borderBottom = Crafty.e("2D, DOM, Color")
        .attr({x: 0, y: height - bWidth, z: 1, w: width, h: bWidth})
        .color("#7820A8");

    for (var i = 0; i < MAXCOINS; i++) {
        coins[i] = Crafty.e("2D, DOM, Color, Bind, Collision, Coin")
            .attr({x: Math.random() * width*3/5 + width/5, y: Math.random() * height*4/6 + height/6, w: 8, h: 16})
            .color("#0F0")
            .bind("UpdateFrame", function(eventData) {

                if ((hitData = this.hit("Blip"))) {
                    this.destroy();
                    coinsRemaining--;
                }

                if (!coinsRemaining) {
                    Crafty.enterScene("win", blip);
                }
            });
    }

    var blip = Crafty.e("2D, DOM, Color, Fourway, Bind, Collision, Blip")
        .attr({x: width / 4, y: height / 2, z: 0, w: 24, h: 24})
        .color("#0FF")
        .fourway(200)
        .bind("UpdateFrame", function() {

            var hitData;

            if ((hitData = this.hit("Blarp")) || (hitData = this.hit("Blop"))) {

                Crafty.enterScene("lose", blip);
            }
        })
        .bind("Move", function(oldPosition) {

            if (oldPosition._y < bWidth) {
                this.y = bWidth;
            }
            if (oldPosition._y > height - this.h - bWidth) {
                this.y = height - this.h - bWidth;
            }
            if (oldPosition._x < bWidth) {
                this.x = bWidth;
            }
            if (oldPosition._x > width - this.w - bWidth) {
                this.x = width - this.w - bWidth;
            }
        });

    var blarp = Crafty.e("2D, DOM, Color, Bind, Collision, Blarp")
        .attr({x: width * 2 / 3, y: height / 2, z: 0, w: 48, h: 48})
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

            if (oldPosition._y < bWidth) {
                this.y = bWidth;
            }
            if (oldPosition._y > height - this.h - bWidth) {
                this.y = height - this.h - bWidth;
            }
            if (oldPosition._x < bWidth) {
                this.x = bWidth;
            }
            if (oldPosition._x > width - this.w - bWidth) {
                this.x = width - this.w - bWidth;
            }
        });

    var blop = Crafty.e("2D, DOM, Color, Bind, Collision, Blop")
        .attr({x: width/2, y: height*2/3, z: 0, w: 32, h: 32})
        .color("#F0F")
        .bind("UpdateFrame", function() {
            this.x += dx;
            this.y += dy;

            var hitData;

            if (hitData = this.hit("Blarp")) {

                if (this.y + this.h > blarp.y) {
                    // this.y = blarp.y - this.h;
                    dy = -3;
                }
                if (this.y < blarp.y + blarp.h) {
                    // this.y = blarp.y + blarp.h;
                    dy = 3;
                }
                if (this.x + this.w > blarp.x) {
                    // this.x = blarp.x - this.w;
                    dx = -3;
                }
                if (this.x < blarp.x + blarp.w) {
                    // this.x = blarp.x + blarp.w;
                    dx = 3;
                }
            }
        })
        .bind("Move", function(oldPosition) {

            if (oldPosition._y < bWidth) {
                this.y = bWidth;
                dy = 3;
            }
            if (oldPosition._y > height - this.h - bWidth) {
                this.y = height - this.h - bWidth;
                dy = -3;
            }
            if (oldPosition._x < bWidth) {
                this.x = bWidth;
                dx = 3;
            }
            if (oldPosition._x > width - this.w - bWidth) {
                this.x = width - this.w - bWidth;
                dx = -3;
            }
        });
});

Crafty.defineScene("win", function (attributes) {
    Crafty.background("#0F0");

    var oldBlip = attributes;

    var blip = Crafty.e("2D, DOM, Color")
        .attr({x: oldBlip.x, y: oldBlip.y, w: oldBlip.w, h: oldBlip.h})
        .color("#FFF");

    var keyBinding = Crafty.e("Bind")
        .bind("KeyDown", function(e) {

            if (e.key == Crafty.keys.ENTER) {
                Crafty.enterScene("start");
            }
        });
});

Crafty.defineScene("lose", function (attributes) {
    Crafty.background("#000");

    var oldBlip = attributes;

    var blip = Crafty.e("2D, DOM, Color")
        .attr({x: oldBlip.x, y: oldBlip.y, w: oldBlip.w, h: oldBlip.h})
        .color("#FFF");


    var keyBinding = Crafty.e("Bind")
        .bind("KeyDown", function(e) {

            if (e.key == Crafty.keys.ENTER) {
                Crafty.enterScene("start");
            }
        });
});

Crafty.enterScene("start");