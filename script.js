console.log('hello');

const canvas = document.getElementById('canvas');
canvas.height = 550;
canvas.width = 1200;
const ctx = canvas.getContext('2d');

let painting = false;

const startPosition = (e) => {
  painting = true;
  draw(e);
}

const endPosition = () => {
  painting = false;
  ctx.beginPath();
}

const draw = (e) => {
  if (!painting) return;
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mouseleave', endPosition);
canvas.addEventListener('mousemove', draw);