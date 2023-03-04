const express = require('express');
const path = require('path');

const app = express();
app.use('/', express.static(__dirname));

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});
