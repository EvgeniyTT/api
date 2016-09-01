require('dotenv').config();
const mongoose = require('mongoose');
const glob = require('glob');

module.exports = app => {
  mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
  app.db = mongoose.connection;
  glob.sync('../src/models/**.js', { cwd: __dirname }).forEach(require);
};
