//This is the Server
const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs');

app.listen(port, () => {
  console.log(`Listening on port: ${port}!`);
});
