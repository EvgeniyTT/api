module.exports = {
  "extends": "airbnb-base",
  "ecmaFeatures": {
    "modules": true,
    "es6": true
  },
  "rules": {
    "comma-dangle": 0,
    "object-curly-spacing": 2,
    "max-len": ["error", 120],
    "no-param-reassign": ["error", { "props": false }],
    "id-length": [2, {"min": 2, "properties": "never", "exceptions": ["x", "n", "i", "e", "$", "_", "g"]}]
  },
  "settings": {
    "import/ignore": ["node_modules"]
  }
};
