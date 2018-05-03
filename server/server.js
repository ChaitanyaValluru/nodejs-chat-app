const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
console.log(publicPath);
const PORT = process.env.PORT || 3000

var app = express();

app.use(express.static(publicPath));
// app.set('view engine', 'html');

// app.get('/', (req, res) => {
//     res.render('index.html');
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
