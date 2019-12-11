Crafty.init(480, 320, document.getElementById('game'));

Crafty.e('2D, DOM, Color, Fourway')
    .attr({x: 0, y: 0, w: 16, h: 16})
    .color('#00F')
    .fourway(200);