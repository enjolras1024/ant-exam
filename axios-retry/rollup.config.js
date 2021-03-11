export default {
  input: 'src/main.js',
  output: {
    file: 'dist/axios-retry.js',
    name: 'axios_retry',
    format: 'umd',
    globals: {
      axios: 'axios'
    }
  }
};