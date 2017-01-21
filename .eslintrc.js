module.exports = {
  "extends": "eslint:recommended",
  "env": {
    "node": true,
    "browser": true
  },
  "globals": {
    "atom": true,
    "Promise": true,
  },
  "parser": "babel-eslint",
  "settings": {
    "import/core-modules": ["atom"]
  }
};
