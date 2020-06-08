var canvas = document.getElementById("honeycomb");
var padding = 10;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

if (canvas.getContext)
{
    var ctx = canvas.getContext("2d");
}
else
{
    // Canvas not supported :(
}

let hexMap = new Map();

function animate({duration, draw, timing})
{

  let start = performance.now();

  requestAnimationFrame(function animate(time)
  {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1)
    {
      requestAnimationFrame(animate);
    }

  });
}

// Animates hexagon
animate(
{
    duration: 3000,
    timing(timeFraction)
    {
        return timeFraction;
    },
    draw(progress)
    {
        drawHexagon(progress, canvas.width/2, 220, 5);
    }
});

function startHexagon(x, y, side)
{
    animate(
    {
        duration: 3000,
        timing(timeFraction)
        {
            return timeFraction;
        },
        draw(progress)
        {
            drawHexagon(progress, x, y, side);
        }
    });
}

function drawHexagon(progress, x, y, side)
{

    var length = 28;

    if (!hexMap.has(keyOf(x, y, length, side % 6)) && progress <= 0.005)
    {
        hexMap.set(keyOf(x, y, length, 0), "occupied");
    }

    ctx.beginPath();
    ctx.strokeStyle = "rgb(188,144,64)";
    ctx.lineWidth = 0.5;
    ctx.moveTo(x + length * Math.sin(side), y + length * Math.cos(side));

    for (var i = 0; i < progress * 7; i++)
    {
        x = x + length * Math.sin((side + i) * 2 * Math.PI / 6);
        y = y + length * Math.cos((side + i) * 2 * Math.PI / 6);
        ctx.lineTo(x, y);

        if (i == Math.floor(progress * 7) - 1 &&
            Math.floor(Date.now() / 1000) & 10 > 3 &&
            withinCanvas(x, y, length) &&
            !hexMap.has(keyOf(x, y, length, (side + i + 3) % 6)))
        {
            hexMap.set(keyOf(x, y, length, (side + i + 3) % 6), keyOf(x, y, length, (side + i + 3) % 6));
            startHexagon(x, y, (side + i + 3) % 6);
        }
    }

    ctx.stroke();
}

function withinCanvas(x, y, length)
{
    return x > 0 + length*2 && x < canvas.width - length*2 && y > 0 + length*2 && y < canvas.height - length*2;
}

function keyOf(x, y, length, side)
{
    var midX = getMidpoint(x + length * Math.sin(side % 6), x + length * Math.sin((side + 3) % 6));
    var midY = getMidpoint(y + length * Math.sin(side % 6), y + length * Math.sin((side + 3) % 6));
    return Math.floor(midX) + ", " + Math.floor(midY);
}

function getMidpoint(a, b)
{
    return (a + b) / 2;
}