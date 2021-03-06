const canvas = document.getElementById('canvas');
const pencil = document.getElementById('pencil');
const brush = document.getElementById('brush');
const eraser = document.getElementById('eraser');
const nuke = document.getElementById('nuke');
const size = document.getElementById('range');
const color = document.getElementById('color-picker');

// canvas.height = 550;
// canvas.width = 1200;
canvas.height = window.innerHeight - 100;
canvas.width = window.innerWidth - 100;

const ctx = canvas.getContext('2d');

// give canvas a white background
ctx.fillStyle = '#ffffff'
ctx.fillRect(0, 0, canvas.width, canvas.height);

let toolSelected = {
  shape: 'square',
  size: 1,
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
  toolSelected.size = 1;
  toolSelected.color = color.value;
  pencil.className = 'selected';
  brush.classList.remove('selected');
  brush.className = 'tool';
  eraser.classList.remove('selected');
  eraser.className = 'tool';
}

const selectBrush = () => {
  toolSelected.shape = 'round';
  toolSelected.size = size.value;
  toolSelected.color = color.value;
  brush.className = 'selected';
  pencil.classList.remove('selected');
  pencil.className = 'tool';
  eraser.classList.remove('selected');
  eraser.className = 'tool';
}

const selectEraser = () => {
  toolSelected.shape = 'round';
  toolSelected.size = size.value;
  toolSelected.color = 'white';
  eraser.className = 'selected';
  pencil.classList.remove('selected');
  pencil.className = 'tool';
  brush.classList.remove('selected');
  brush.className = 'tool';
}

const selectNuke = () => {
  if(confirm('Do you really want to delete your drawing?') === true) {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

download_img = function(el) {
  const image = canvas.toDataURL("image/jpg");
  el.href = image;
};

const setSize = (e) => {
  toolSelected.size = e.target.value;
  e.preventDefault();
}

const setColor = (e) => {
  toolSelected.color = e.target.value;
}


// drawing events
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mouseleave', endPosition);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchstart', startPosition);
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', draw);

// tools events
pencil.addEventListener('click', selectPencil);
brush.addEventListener('click', selectBrush);
eraser.addEventListener('click', selectEraser);
nuke.addEventListener('click', selectNuke);

// size and color events
size.addEventListener('change', setSize)
color.addEventListener('change', setColor);