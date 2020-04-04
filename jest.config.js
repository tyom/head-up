module.exports = {
  collectCoverageFrom: ['src/**/*.{js,vue}', '!src/**/index.js'],
  moduleFileExtensions: ['js', 'json', 'vue'],

  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.*\\.vue$': 'vue-jest',
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  snapshotSerializers: ['jest-serializer-vue'],
  setupFiles: ['jest-localstorage-mock'],
  preset: '@vue/cli-plugin-unit-jest',
};
