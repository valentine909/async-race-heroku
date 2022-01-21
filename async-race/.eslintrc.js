module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        'airbnb-base',
        'airbnb-typescript/base'
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module",
        "project": './tsconfig.json'
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "no-console": ["error", { allow: ["warn", "error"] }],
        "no-alert": "off",
    }
};
