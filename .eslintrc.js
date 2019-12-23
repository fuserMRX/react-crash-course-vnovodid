module.exports = {
    "extends": ["eslint:recommended",
                "plugin:react/recommended",
                "plugin:cypress/recommended",
                "plugin:jest/recommended"
                ],
    "parser": "babel-eslint",
    "env":{
        "browser": true,
        "node": true,
        "jest": true,
        'cypress/globals': true,
        "jest/globals": true,
        "es6": true,
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "rules": {
        "quotes": ["error", "double"],
        "cypress/no-unnecessary-waiting": "warn",
        "react/prop-types": 0,
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "max-len": ["error", 120, 4],
        "no-trailing-spaces": [2, { "skipBlankLines": true }],
    }
};