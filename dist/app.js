const express = require('express');
const path = require('path');

const app = express();
app.listen(3000, () => console.log('Listening to 3000'));

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, './index.html'));
});
app.get('/style.css', (req, res) => {
   res.sendFile(path.join(__dirname, './style.css'));
});
app.get('/main.js', (req, res) => {
   res.sendFile(path.join(__dirname, './main.js'));
});
app.get('/assets/image.png', (req, res) => {
   res.sendFile(path.join(__dirname, '../assets/image.png'));
});

