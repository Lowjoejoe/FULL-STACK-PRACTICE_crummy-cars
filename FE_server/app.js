const express = require('express');
const app = express();
const PORT = 5001;

app.use(express.static('public'));

app.listen(PORT,()=>{
    console.log(`front end server that servers up static express on PORT: ${PORT}`)
});