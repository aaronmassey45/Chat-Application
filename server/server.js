const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3000;
const clientPath = path.join(__dirname, '../client');
let app = express();

app.use(express.static(clientPath));

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
})
