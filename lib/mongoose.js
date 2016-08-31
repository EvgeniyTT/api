require('dotenv').config();
const mongoose = require('mongoose');
const glob = require('glob');

// mongoose.Promise = global.Promise;

// module.exports = app => {

  console.log('MONGO');
  // app.db = mongoose;
  mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
  const db = mongoose.connection;

  // app.db = mongoose.connection;
  glob.sync('../src/models/**.js', { cwd: __dirname }).forEach(require);
  // console.log(image);

  // return function* (next) {
  //   this.db = mongoose;
  //   yield next;
  // };

// };

exports.db = db;
