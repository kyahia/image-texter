import 'fabric';

const contentEl = document.getElementById('content')
const fontSizeEl = document.getElementById('font-size')
const colorEl = document.getElementById('color')
const topEl = document.getElementById('top')
const leftEl = document.getElementById('left')
const separatorEl = document.getElementById('separator');

contentEl.addEventListener('change', apply)
fontSizeEl.addEventListener('change', apply)
colorEl.addEventListener('change', apply)
topEl.addEventListener('change', apply)
leftEl.addEventListener('change', apply)

let textContent;
let checked;
let contentIndex = 0;
let filename;

const canvas = new fabric.Canvas('c');
document.getElementById('download').addEventListener('click', save);
document.getElementById('apply').addEventListener('click', apply);

const fileInput = document.querySelector('.image-input>input');
fileInput.addEventListener('change', e => {
   contentIndex = 0;
   const reader = new FileReader();
   reader.onload = () => {
      filename = e.target.files[0].name;
      const uploadedImg = reader.result;

      const imgBlob = new Image;
      imgBlob.src = uploadedImg;
      imgBlob.crossorigin = "anonymous";

      imgBlob.onload = () => {
         const imgInstance = new fabric.Image(imgBlob);
         canvas.add(imgInstance);
         canvas.renderAll();
      }
   }
   reader.readAsDataURL(e.target.files[0]);
});


const fillsList = document.querySelector('form');
fillsList.addEventListener('submit', e => {
   e.preventDefault();
   contentIndex = 0;
   submitForm()
});

function submitForm() {
   fillsList['values-list'].forEach(element => {
      if (element.checked) checked = element
   });
   let textareaFill;
   if (separatorEl.value == '') textareaFill = checked.parentElement.querySelector('textarea').value.split('\n');
   else textareaFill = checked.parentElement.querySelector('textarea').value.split(separatorEl.value);
   console.log(textareaFill)
   contentEl.value = textareaFill[contentIndex].trim();
   apply();
}

function apply() {
   if (textContent !== undefined) canvas.remove(textContent);
   const content = contentEl.value;
   const fontSize = Number(fontSizeEl.value);
   const color = colorEl.value;
   let top = Number(topEl.value);
   let left = Number(leftEl.value);
   if (top == 0) top = 400 - fontSize;
   if (left == 0) left = (400 - fontSize * 5.5 / 2) / 2

   textContent = new fabric.Text(content, { top, left, fontSize, fill: color });
   canvas.add(textContent);
   canvas.renderAll();
}

function save(i = '') {
   const myEl = document.createElement('a');
   document.body.appendChild(myEl);
   myEl.download = filename + i;
   myEl.href = canvas.toDataURL();
   myEl.click();
}

document.getElementById('download-all').addEventListener('click', () => {
   const contentList = checked.parentElement.querySelector('label').textContent.split('$');
   for (let i = 0; i < contentList.length; i++) {
      setTimeout(() => {
         submitForm();
         save(contentList[i].trim());
         contentIndex += 1;
      }, i * 100)
   }
});

