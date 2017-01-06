module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "extends": [
    "airbnb"
  ],
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "globals": {
    "expect": true,
    "spy": true
  },
  "plugins": [
    "babel",
    "react",
  ],
  "settings": {
    "import/resolver": {
        "babel-module-alias": {}
    }
  },
  "rules": {
    "max-len": [1, 100, 2, {"ignoreComments": true}],
    "arrow-parens": ["error", "as-needed"]
  }
};