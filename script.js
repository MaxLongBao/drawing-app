console.log('hello');

const canvas = document.getElementById('canvas');
const pencil = document.getElementById('pencil');
const brush = document.getElementById('brush');
const eraser = document.getElementById('eraser');
const nuke = document.getElementById('nuke');

canvas.height = 500;
canvas.width = 1100;
// canvas.height = 55;
// canvas.width = 120;
const ctx = canvas.getContext('2d');

let toolSelected = {
  shape: 'square',
  size: 10,
  color: '#000000',
}
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
  ctx.lineWidth = toolSelected.size;
  ctx.lineCap = toolSelected.shape;
  ctx.strokeStyle = toolSelected.color;

  // for touchscreens
  if (e.touches) {
    ctx.lineTo((e.touches[0].clientX - e.target.offsetLeft), (e.touches[0].clientY - e.target.offsetTop));
  
    // for mouse devices
  } else {
    ctx.lineTo(e.offsetX, e.offsetY);
  }
  ctx.stroke();
  e.preventDefault();
}

const selectPencil = () => {
  toolSelected.shape = 'square';
  toolSelected.color = 'black';
  pencil.className = 'selected';
  brush.classList.remove('selected');
  brush.className = 'tool';
  eraser.classList.remove('selected');
  eraser.className = 'tool';
  nuke.classList.remove('selected');
  nuke.className = 'tool';
}

const selectBrush = () => {
  toolSelected.shape = 'round';
  toolSelected.color = 'black';
  brush.className = 'selected';
  pencil.classList.remove('selected');
  pencil.className = 'tool';
  eraser.classList.remove('selected');
  eraser.className = 'tool';
  nuke.classList.remove('selected');
  nuke.className = 'tool';
}

const selectEraser = () => {
  toolSelected.shape = 'round';
  toolSelected.color = 'white';
  eraser.className = 'selected';
  pencil.classList.remove('selected');
  pencil.className = 'tool';
  brush.classList.remove('selected');
  brush.className = 'tool';
  nuke.classList.remove('selected');
  nuke.className = 'tool';
}

const selectNuke = () => {
  
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mouseleave', endPosition);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchstart', startPosition);
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', draw);

pencil.addEventListener('click', selectPencil);
brush.addEventListener('click', selectBrush);
eraser.addEventListener('click', selectEraser);
nuke.addEventListener('click', selectNuke);