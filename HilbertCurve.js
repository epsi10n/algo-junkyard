const cnvs = document.getElementById('cnvs');
const sky = cnvs.getContext('2d');

const deg = Math.PI / 180;

let x = 0;
let y = 0;

function drawRelative(ctx, dx, dy) {
    ctx.moveTo(x, y);
    x += dx;
    y += dy;
    ctx.lineTo(x, y);
}

function hilbert(ctx, depth, dx, dy) {
    if (depth > 0) hilbert(ctx, depth - 1, dy, dx);
    drawRelative(ctx, dx, dy);
    if (depth > 0) hilbert(ctx, depth - 1, dx, dy);
    drawRelative(ctx, dy, dx);
    if (depth > 0) hilbert(ctx, depth - 1, dx, dy);
    drawRelative(ctx, -dx, -dy);
    if (depth > 0) hilbert(ctx, depth - 1, -dy, -dx);
}

sky.beginPath();
hilbert(sky, 3, 20.0, 0.0);
sky.stroke();
