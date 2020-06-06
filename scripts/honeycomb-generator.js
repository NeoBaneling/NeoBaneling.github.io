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
        drawHexagon(progress, canvas.width-60, 90, 3);
        drawHexagon(progress, canvas.width/2, 220, 5);
        //drawHexagon(progress, 260, 300, 1);
        //drawHexagon(progress, canvas.width - 300, canvas.height - 120, 2);
        drawHexagon(progress, 70, canvas.height - 80, 0);
        //drawHexagon(progress, 120, 200, 4);
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

    ctx.beginPath();
    ctx.strokeStyle = "rgba(188,144,64,"+(1 - (canvas.width/2 - (x % canvas.width/2)))+")";
    ctx.lineWidth = 0.5;
    ctx.moveTo(x + length * Math.sin(side), y + length * Math.cos(side));

    var z = progress * 7;

    /*
    var diff = (progress * 6) % 1;
    var interval = length - diff;
    */

    for (var i = 0; i < z; i++)
    {
        x = x + length * Math.sin((side + i) * 2 * Math.PI / 6);
        y = y + length * Math.cos((side + i) * 2 * Math.PI / 6);
        ctx.lineTo(x, y);
    }

    if (Math.floor(Date.now() / 1000) % 10 > 3 && progress >= 1/6 - 0.002 && progress <= 1/6 + 0.002 && withinCanvas(x, y, length))
    {
        startHexagon(x, y, side % 6);
    }
    if (Math.floor(Date.now() / 1000) % 10 > 2 && progress >= 2/6 - 0.002 && progress <= 2/6 + 0.002 && withinCanvas(x, y, length))
    {
        startHexagon(x, y, (1 + side) % 6)
    }
    if (Math.floor(Date.now() / 1000) % 10 > 5 && progress >= 3/6 - 0.002 && progress <= 3/6 + 0.002 && withinCanvas(x, y, length))
    {
        startHexagon(x, y, (2 + side) % 6);
    }
    if (Math.floor(Date.now() / 1000) % 10 > 3 && progress >= 4/6 - 0.002 && progress <= 4/6 + 0.002 && withinCanvas(x, y, length))
    {
        startHexagon(x, y, (3 + side) % 6);
    }
    if (Math.floor(Date.now() / 1000) % 10 > 2 && progress >= 5/6 - 0.002 && progress <= 5/6 + 0.002 && withinCanvas(x, y, length))
    {
        startHexagon(x, y, (4 + side) % 6);
    }
    if (Math.floor(Date.now() / 1000) % 10 > 7 && progress >= 6/6 - 0.002 && progress <= 6/6 + 0.002 && withinCanvas(x, y, length))
    {
        startHexagon(x, y, (5 + side) % 6);
    }

    /*
    var length = 2;
    var interval = length;

    var modProgress = progress + side;

    ctx.beginPath();
    ctx.strokeStyle = "rgb(188,144,64)";
    ctx.lineWidth = 0.4;
    ctx.moveTo(x + length * Math.cos(side), y + length * Math.sin(side));

    var diff = (modProgress * 6) % 1;
    interval = length * diff;

    ctx.lineTo(x + length * Math.cos(side * 2 * Math.PI / 6), y + length * Math.sin(side * 2 * Math.PI / 6));
    */

    /*
    if (modProgress >= 0 && modProgress < 1/6)
    {
        ctx.lineTo(x += 12.5 * interval, y -= 5 * interval);
    }
    if (modProgress >= 1/6 && modProgress < 2/6)
    {
        ctx.lineTo(x += 12.5 * length, y -= 5 * length);
        ctx.lineTo(x, y -= 15 * interval);
    }
    if (modProgress >= 2/6 && modProgress < 3/6)
    {
        ctx.lineTo(x += 12.5 * length, y -= 5 * length);
        ctx.lineTo(x, y -= 15 * length);
        ctx.lineTo(x -= 12.5 * interval, y -= 5 * interval);
    }
    if (modProgress >= 3/6 && modProgress < 4/6)
    {
        ctx.lineTo(x += 12.5 * length, y -= 5 * length);
        ctx.lineTo(x, y -= 15 * length);
        ctx.lineTo(x -= 12.5 * length, y -= 5 * length);
        ctx.lineTo(x -= 12.5 * interval, y += 5 * interval);
    }
    if (modProgress >= 4/6 && modProgress < 5/6)
    {
        ctx.lineTo(x += 12.5 * length, y -= 5 * length);
        ctx.lineTo(x, y -= 15 * length);
        ctx.lineTo(x -= 12.5 * length, y -= 5 * length);
        ctx.lineTo(x -= 12.5 * length, y += 5 * length);
        ctx.lineTo(x, y += 15 * interval);
    }
    if (modProgress >= 5/6)
    {
        ctx.lineTo(x += 12.5 * length, y -= 5 * length);
        ctx.lineTo(x, y -= 15 * length);
        ctx.lineTo(x -= 12.5 * length, y -= 5 * length);
        ctx.lineTo(x -= 12.5 * length, y += 5 * length);
        ctx.lineTo(x, y += 15 * length);
        ctx.lineTo(x += 12.5 * interval, y += 5 * interval);
    }

    if (progress >= 2/6 - 0.002 && progress <= 2/6 + 0.002)
    {
        animate(
        {
            duration: 6000,
            timing(timeFraction)
            {
                return timeFraction;
            },
            draw(progress)
            {
                drawHexagon(progress, x, y, 0);
            }
        });
    }
    */

    ctx.stroke();
}

function withinCanvas(x, y, length)
{
    return x > 0 + length*2 && x < canvas.width - length*2 && y > 0 + length*2 && y < canvas.height - length*2;
}