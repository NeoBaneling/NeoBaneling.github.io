var canvas = document.getElementById("honeycomb");
var padding = 10;

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
    duration: 6000,
    timing(timeFraction)
    {
        return timeFraction;
    },
    draw(progress)
    {
        var length = 10;
        var interval = (progress/ 1000) % 1;

        ctx.beginPath();
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.lineWidth = 5;
        if (progress >= 0)
        {
            ctx.moveTo(50, 50);
            ctx.lineTo(50 + 12.5 * interval * 6, 50 - 5 * interval * 6);
        }
        if (progress >= 1000)
        {
            ctx.lineTo(62.5, 45 - 15 * interval * 6);
        }
        if (progress >= 2000)
        {
            ctx.lineTo(62.5 - 12.5 * interval * 6, 30 - 5 * interval * 6);
        }
        if (progress >= 3000)
        {
            ctx.lineTo(50 - 12.5 * interval * 6, 25 + 5 * interval * 6);
        }
        if (progress >= 4000)
        {
            ctx.lineTo(37.5, 30 + 15 * interval * 6);
        }
        if (progress >= 5000)
        {
            ctx.lineTo(37.5 + 12.5 * interval * 6, 45 + 5 * interval * 6);
        }
        ctx.stroke();
    }
})