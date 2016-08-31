const glob = require('glob');

module.exports = app => {
  console.log("ROUTER");
  
  glob
    .sync('../src/controllers/*.js', { cwd: __dirname })
    .map(require)
    .forEach(app.use.bind(app));
};
