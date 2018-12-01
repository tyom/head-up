module.exports = {
  collectCoverageFrom: ['src/**/*.{js,vue}', '!src/components/**/index.js'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.*\\.vue$': 'vue-jest',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  setupFiles: ['jest-localstorage-mock'],
};
