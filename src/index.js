import 'fabric';

let textContent;

const canvas = new fabric.Canvas('c');
document.getElementById('download').addEventListener('click', save);
document.getElementById('apply').addEventListener('click', apply);

const imgBlob = new Image;
imgBlob.src = '../assets/image.png';
imgBlob.crossorigin = "anonymous";

imgBlob.onload = () => {
   const imgInstance = new fabric.Image(imgBlob);
   canvas.add(imgInstance);
}

function apply(){
if (textContent !== undefined) canvas.remove(textContent);
   const content = document.getElementById('content').value;
   const fontSize = Number(document.getElementById('font-size').value);
   const color = document.getElementById('color').value;
   let top = Number(document.getElementById('top').value);
   let left = Number(document.getElementById('left').value);
   if (top == 0 ) top = 400 - fontSize;
   if (left == 0 ) left = (400 - fontSize*5.5/2)/2

   textContent = new fabric.Text(content, { top, left, fontSize, fill: color });
   canvas.add(textContent);
   canvas.renderAll();
}

function save() {
   console.log('saving');
   const myEl = document.createElement('a');
   document.body.appendChild(myEl);
   myEl.download = 'data';
   myEl.href = canvas.toDataURL();
   myEl.click();
}
