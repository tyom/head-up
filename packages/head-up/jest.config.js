module.exports = {
  collectCoverageFrom: ['src/**/*.{js,vue}'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.*\\.vue$': 'vue-jest',
  },
  snapshotSerializers: ['jest-serializer-vue'],
};