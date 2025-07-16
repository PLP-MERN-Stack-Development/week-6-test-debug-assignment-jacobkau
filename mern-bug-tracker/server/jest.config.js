module.exports = {
  testEnvironment: 'node',
  testTimeout: 30000,
   testEnvironmentOptions: {
    mongodbMemoryServer: {
      version: '6.0.5',
      downloadDir: './.mongodb-binaries'
    }
  }
};