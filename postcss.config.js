module.exports = {
  plugins: {
    'postcss-preset-env': {
      stage: 1,
      features: {
        'nesting-rules': true,
        'custom-properties': { preserve: false },
      },
    },
    'rucksack-css': {},
    tailwindcss: {},
  },
};
