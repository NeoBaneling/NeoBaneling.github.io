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
        drawHexagon(progress, 60, 90, 0);
        drawHexagon(progress, canvas.width - 60, canvas.height - 90, 0);
        // drawHexagon(progress, 140, 300, 0);
        drawHexagon(progress, canvas.width - 300, canvas.height - 90, 0);
        drawHexagon(progress, 120, canvas.height - 70, 0);
        drawHexagon(progress, 120, 240, 0);
    }
});

function drawHexagon(progress, x, y, offset)
{
    var length = 2;
    var interval = length;

    var modProgress = progress + offset;

    ctx.beginPath();
    ctx.strokeStyle = "rgb(188,144,64)";
    ctx.lineWidth = 0.4;
    ctx.moveTo(x, y);

    var diff = (modProgress * 6) % 1;
    interval = length * diff;

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

    ctx.stroke();
}