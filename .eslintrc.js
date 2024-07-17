module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: [
      'react',
    ],
    rules: {
      // Add any other rules you want to enforce or disable here
      'react/prop-types': 'off', // Disable prop-types rule if not using PropTypes
    },
    globals: {
      signInWithPopup: 'readonly', // Define signInWithPopup as a global variable
    },
  };
  