import 'fabric';

const canvas = new fabric.Canvas('c');

function save() {
   console.log('saving');
   const myEl = document.createElement('a');
   document.body.appendChild(myEl);
   myEl.download = 'data';
   myEl.href = canvas.toDataURL("image/png");
   myEl.click();
}


const rect = new fabric.Rect({ left: 100, top: 100, fill: 'red', width: 20, height: 20 });

canvas.add(rect);

const imgBlob = new Image;
imgBlob.src = '../assets/node-logo.png';

imgBlob.onload = () => {
   const imgInstance = new fabric.Image(imgBlob, { left: 1, top: 1 });
   canvas.add(imgInstance);
   // canvas.renderAll();
}

document.getElementById('download').addEventListener('click', save);

