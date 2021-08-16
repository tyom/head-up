if (import.meta.env.PROD) {
  import('../dist/head-up.es');
} else {
  import('../src/main');
}
console.log('hello');
