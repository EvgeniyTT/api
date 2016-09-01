const glob = require('glob');

module.exports = (app) => {
  glob.sync('../src/controllers/*.js', { cwd: __dirname })
  .map(require)
  .forEach((router) => { app.use('/', router); });
};
