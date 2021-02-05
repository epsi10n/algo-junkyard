const cnvs = document.getElementById('cnvs');
const sky = cnvs.getContext('2d');

const deg = Math.PI / 180;

const leg = (n, len) => {
    sky.save();       // Сохраняем текущую трансформацию
    if (n == 0) {      // Нерекурсивный случай - отрисовываем линию
      sky.lineTo(len, 0);
    } else {
        sky.scale(1 / 3, 1 / 3);  // Уменьшаем масштаб в 3 раза
        leg(n - 1, len);
        sky.rotate(60 * deg);
        leg(n - 1, len);
        sky.rotate(-120 * deg);
        leg(n - 1, len);
        sky.rotate(60 * deg);
        leg(n - 1, len);
    }
    sky.restore();      // Восстанавливаем трансформацию
    sky.translate(len, 0); // переходим в конец ребра
  }

const drawFlake = (x, y, angle, len, n, stroke = "white", fill = "black") => {
    sky.save();      sky.strokeStyle = stroke;
    sky.fillStyle = fill;
    sky.beginPath();
    sky.translate(x, y);
    sky.moveTo(0, 0);
    sky.rotate(angle);
    leg(n, len);
    sky.rotate(-120 * deg);
    leg(n, len);
    sky.rotate(-120 * deg);
    leg(n, len);
    sky.closePath();
    sky.fill();
    sky.stroke();
    sky.restore();
  }

drawFlake(100, 100, 0, 100, 6, "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)");
