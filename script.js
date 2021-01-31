console.log('hello');

const canvas = document.getElementById('canvas');
// canvas.height = 550;
// canvas.width = 1200;
canvas.height = 55;
canvas.width = 120;
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
  ctx.lineTo((e.touches[0].clientX - e.target.offsetLeft), (e.touches[0].clientY - e.target.offsetTop));
  ctx.stroke();
  e.preventDefault();
}

const hello = () => {
  console.log('hello');
}

// canvas.addEventListener('mousedown', startPosition);
// canvas.addEventListener('mouseup', endPosition);
// canvas.addEventListener('mouseleave', endPosition);
// canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchstart', startPosition);
canvas.addEventListener('touchstart', hello);
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', draw);