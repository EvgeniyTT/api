const app = module.exports = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

require('dotenv').config();
require('./lib/mongoose')(app);
require('./lib/router')(app);

if (!module.parent) {
  app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`app listening on host ${process.env.SERVER_HOST} port ${process.env.SERVER_PORT}!`);
  });
}
